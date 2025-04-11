from fastapi import FastAPI, Body
from core.models.task import Task
from core.models.solution import Solution
from core import automaton, checker, solver

app = FastAPI()
 
@app.get("/generate", response_model=Task)
async def get_formula():
    return automaton.generate()

@app.post("/validate")
async def check_solution(solution: Solution = Body(...)):
    print(checker.valid_answer(solution.task, solver.impost(solution.task)))
    return {"ping": "pong"}