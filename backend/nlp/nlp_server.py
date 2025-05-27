from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import spacy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware
from sklearn.feature_extraction.text import TfidfVectorizer

# --- FastAPI App Setup ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class JobDescription(BaseModel):
    text: str

class MatchingRequest(BaseModel):
    text: str
    certificates: List[Dict]
    projects: List[Dict]
    experiences: List[Dict]

# --- NLP Initialization ---
nlp = spacy.load("en_core_web_sm")
model = SentenceTransformer('all-MiniLM-L6-v2')  # Lightweight semantic model

# --- Helper Functions ---
def extract_keywords(text: str, top_n=10) -> List[str]:
    doc = nlp(text.lower())
    tokens = [token.lemma_ for token in doc if token.is_alpha and not token.is_stop]
    cleaned_text = " ".join(tokens)

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([cleaned_text])
    scores = zip(vectorizer.get_feature_names_out(), tfidf_matrix.toarray()[0])
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
    return [word for word, _ in sorted_scores[:top_n]]

def get_top_matches(jd_text: str, entries: List[Dict], top_n: int = 3) -> List[Dict]:
    # Encode JD and entries into embeddings
    jd_vector = model.encode(jd_text)
    entry_vectors = model.encode([
        " ".join(entry.get("keywords", [])) if entry.get("keywords") 
        else entry.get("description", "")  # Fallback to raw text if available
        for entry in entries
    ])

    # Calculate cosine similarity
    sims = cosine_similarity([jd_vector], entry_vectors)[0]

    # Attach scores to entries
    scored_entries = [
        {**entries[i], "score": round(float(sims[i]), 4)}
        for i in range(len(entries))
    ]
    print("Scored Entries (Semantic):", scored_entries)

    return sorted(scored_entries, key=lambda x: x["score"], reverse=True)[:top_n]

def calculate_weighted_overall_score(
    certs: List[Dict], projects: List[Dict], experiences: List[Dict]
) -> float:
    def average_score(entries: List[Dict]) -> float:
        if not entries:
            return 0.0
        return sum(e.get("score", 0) for e in entries) / len(entries)

    weights = {"certificates": 0.20, "projects": 0.50, "experiences": 0.30}
    overall = (
        average_score(certs) * weights["certificates"] +
        average_score(projects) * weights["projects"] +
        average_score(experiences) * weights["experiences"]
    )
    return round(overall, 4)

# --- API Endpoints (Unchanged) ---
@app.post("/extract-keywords")
async def extract_keywords_endpoint(job: JobDescription):
    keywords = extract_keywords(job.text)
    return {"keywords": keywords}

@app.post("/match")
async def match_all(data: MatchingRequest):
    top_certificates = get_top_matches(data.text, data.certificates)
    top_projects = get_top_matches(data.text, data.projects)
    top_experiences = get_top_matches(data.text, data.experiences)

    overall_score = calculate_weighted_overall_score(
        top_certificates, top_projects, top_experiences
    )

    return {
        "certificates": top_certificates,
        "projects": top_projects,
        "experiences": top_experiences,
        "overall_score": overall_score
    }