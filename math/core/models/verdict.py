from typing import Optional
from pydantic import BaseModel

class Verdict(BaseModel):
    ok: bool
    msg: Optional[str] = None