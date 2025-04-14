from typing import Optional
from pydantic import BaseModel
from core.models.task import Task

class Point(BaseModel):
    x: Optional[str] = ""
    y: Optional[str] = ""

class Solution(BaseModel):
    task: str
    name: Optional[str] = ""
    formula: Optional[str] = ""
    focus1: Optional[Point] = Point(x = "", y = "")
    focus2: Optional[Point] = Point(x = "", y = "")
    eccenter: Optional[str] = ""
    parameter: Optional[str] = ""
    direct1: Optional[str] = ""
    direct2: Optional[str] = ""
    semiaxis_a: Optional[str] = ""
    semiaxis_b: Optional[str] = ""
    asymptote1: Optional[str] = ""
    asymptote2: Optional[str] = ""
    center: Optional[Point] = Point(x = "", y = "")