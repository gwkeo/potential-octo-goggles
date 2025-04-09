from fastapi import FastAPI, Body
from core.models.task import Task
from core.models.solution import ValidationRequest
from core import automaton, checker, solver

app = FastAPI()
 
@app.get("/generate", response_model=Task)
async def get_formula():
    return automaton.generate()

@app.post("/validate")
async def check_solution(validationRequest: ValidationRequest = Body(...)):
    return checker.valid_answer(validationRequest.solution.task, solver.impost(validationRequest.task))