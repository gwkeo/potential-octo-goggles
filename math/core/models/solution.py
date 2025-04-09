from typing import Optional
from pydantic import BaseModel
from core.models.task import Task

class Point(BaseModel):
    x: Optional[str] = None
    y: Optional[str] = None

class Solution(BaseModel):
    task: str
    name: Optional[str] = None
    formula: Optional[str] = None
    focus1: Optional[Point] = None
    focus2: Optional[Point] = None
    eccenter: Optional[str] = None
    parameter: Optional[str] = None
    direct1: Optional[str] = None
    direct2: Optional[str] = None
    semiaxis_a: Optional[str] = None
    semiaxis_b: Optional[str] = None
    asymptote1: Optional[str] = None
    asymptote2: Optional[str] = None
    center: Optional[Point] = None

class ValidationRequest(BaseModel):
    solution: Solution
    task: str