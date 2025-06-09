from fastapi import FastAPI
from dtos.requests.summarizer_request import SummarizerRequestDto
from services.summarizer_service import summarize_text

app = FastAPI()

@app.post("/tools/summarizer")
def text_summarizer(request: SummarizerRequestDto):
    return summarize_text(request.text)
