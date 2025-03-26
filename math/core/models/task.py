from typing import Optional
from pydantic import BaseModel

class Task(BaseModel):
    task: str