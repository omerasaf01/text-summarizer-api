from pydantic import BaseModel

class SummarizerResponseDto(BaseModel):
    result: str
