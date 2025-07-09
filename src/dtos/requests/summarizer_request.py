from pydantic import BaseModel

class SummarizerRequestDto(BaseModel):
    text: str
