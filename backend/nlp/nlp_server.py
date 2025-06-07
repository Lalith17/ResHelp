from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import spacy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware
from sklearn.feature_extraction.text import TfidfVectorizer

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

nlp = spacy.load("en_core_web_sm")
model = SentenceTransformer('all-MiniLM-L6-v2')

class JobDescription(BaseModel):
    text: str

class MatchRequest(BaseModel):
    jd_text: str
    entries: List[Dict]
    top_n: int = 3

def extract_keywords(text: str, top_n=10) -> List[str]:
    tokens = [token.lemma_ for token in nlp(text.lower()) if token.is_alpha and not token.is_stop]
    cleaned = " ".join(tokens)
    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform([cleaned])
    scores = sorted(zip(vectorizer.get_feature_names_out(), tfidf.toarray()[0]), key=lambda x: x[1], reverse=True)
    return [word for word, _ in scores[:top_n]]

@app.post("/extract-keywords")
async def extract_keywords_endpoint(job: JobDescription):
    return {"keywords": extract_keywords(job.text)}

@app.post("/match")
def get_top_matches(request: MatchRequest):
    jd_vec = model.encode(request.jd_text)
    entry_vecs = model.encode([
        " ".join(e.get("keywords", [])) if e.get("keywords") else e.get("description", "")
        for e in request.entries
    ])
    sims = cosine_similarity([jd_vec], entry_vecs)[0]
    scored = [{**request.entries[i], "score": round(float(sims[i]), 4)} for i in range(len(request.entries))]
    return {
        "top_matches": sorted(scored, key=lambda x: x["score"], reverse=True)[:request.top_n],
        "average_score": round(float(sims.mean()), 4) if len(sims) > 0 else 0.0
    }
