from fastapi import FastAPI, status
from app.models import Formula, Request

app = FastAPI()

@app.get("/formula")
async def get_formula():
    return Formula("some silly formula")

@app.post("/check")
async def check_solution(request: Request):
    return {"well": "done"}