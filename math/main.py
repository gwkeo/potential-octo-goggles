from fastapi import FastAPI, Body
from core.models.task import Task
from core.models.solution import Request, Solution
from core import automaton
from core import solver

app = FastAPI()
 
@app.get("/generate", response_model=Task)
async def get_formula():
    result = automaton.generate()
    return {"task": result}

@app.post("/validate")
async def check_solution(request: Request = Body(...)):
    solution : Solution = request.solution
    task : str = solution.task
    key = solver.impost(task)
    return {"focus1": solution.focus1}