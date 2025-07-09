from fastapi import FastAPI, Request
from src.dtos.requests.summarizer_request import SummarizerRequestDto
from src.services.summarizer_service import summarize_text
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address


limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tools/summarizer")
@limiter.limit("5/second")
def text_summarizer(request: Request, dto: SummarizerRequestDto):
    return summarize_text(dto.text)
