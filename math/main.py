from fastapi import FastAPI, Body
from core.models.task import Task
from core.models.solution import Solution
from core import automaton
from core import solver
import logging

app = FastAPI()
 
@app.get("/generate", response_model=Task)
async def get_formula():
    result = automaton.generate()
    return {"task": result.task}

@app.post("/validate")
async def check_solution(solution: Solution = Body(...)):
    solution : Solution = solution
    task : str = solution.task
    logging.info(solution) 
    key = solver.impost(task)
    return {"focus1": solution.focus1}