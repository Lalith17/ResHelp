from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobDescription(BaseModel):
    text: str
class MatchingRequest(BaseModel):
    text: str
    certificates: List[Dict]
    projects: List[Dict]
    experiences: List[Dict]

nlp = spacy.load("en_core_web_sm")

def extract_keywords(text: str, top_n=10) -> List[str]:
    doc = nlp(text.lower())
    tokens = [token.lemma_ for token in doc if token.is_alpha and not token.is_stop]
    joined_text = " ".join(tokens)

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([joined_text])
    scores = zip(vectorizer.get_feature_names_out(), tfidf_matrix.toarray()[0])
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
    keywords = [word for word, _ in sorted_scores[:top_n]]
    return keywords

def get_top_matches(jd_text: str, entries: List[Dict], top_n: int = 3):
    # Preprocess job description
    jd_doc = nlp(jd_text.lower())
    jd_tokens = [token.lemma_ for token in jd_doc if token.is_alpha and not token.is_stop]
    jd_clean = " ".join(jd_tokens)

    # Prepare entry texts from keywords list
    entry_texts = []
    for entry in entries:
        if "keywords" in entry and entry["keywords"]:
            entry_texts.append(" ".join(entry["keywords"]))
        else:
            entry_texts.append("")  # handle empty keywords gracefully

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([jd_clean] + entry_texts)

    jd_vector = tfidf_matrix[0]
    entry_vectors = tfidf_matrix[1:]

    sims = cosine_similarity(jd_vector, entry_vectors)[0]

    scored = [
        {**entries[i], "score": round(float(sims[i]), 4)}
        for i in range(len(entries))
    ]
    return sorted(scored, key=lambda x: x["score"], reverse=True)[:top_n]
@app.post("/extract-keywords")
async def extract_keywords_endpoint(job: JobDescription):
    return {"keywords": extract_keywords(job.text)}
@app.post("/match")
async def match_all(data: MatchingRequest):
    return {
        "certificates": get_top_matches(data.text, data.certificates),
        "projects": get_top_matches(data.text, data.projects),
        "experiences": get_top_matches(data.text, data.experiences)
    }
