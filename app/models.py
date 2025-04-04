from typing import Optional
from pydantic import BaseModel


class Formula(BaseModel):
    def __init__(self, formula: str):
        self.formula = formula


class Point(BaseModel):
    x: Optional[str] = None
    y: Optional[str] = None


class Solution(BaseModel):
    name: str
    formula: str
    focus1: Optional[Point] = None
    focus2: Optional[Point] = None
    eccenter: Optional[str] = None
    parameter: Optional[str] = None
    direct1: Optional[str] = None
    direct2: Optional[str] = None
    semiaxis_a: Optional[str] = None
    semiaxis_b: Optional[str] = None
    assymptotle1: Optional[str] = None
    assymptotle2: Optional[str] = None
    center: Optional[Point] = None


class Request(BaseModel):
    user_id: int
    solution: Solution