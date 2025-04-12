from fastapi import FastAPI, Body
from core.models.task import Task
from core.models.solution import Solution
from core import automaton, checker, solver
from core.converters.tex_to_py import tex_to_py

app = FastAPI()
 
@app.get("/generate", response_model=Task)
async def get_formula():
    return automaton.generate()

@app.post("/validate")
async def check_solution(solution: Solution = Body(...)):
    solution = tex_to_py(solution)
    file = open('./aaa.txt', "w")
    b = solver.impost(solution.task)
    file.write(b.formula)
    file.write(checker.valid_answer(solution, solver.impost(solution.task)).msg + " " + str(checker.valid_answer(solution, solver.impost(solution.task)).ok))

    return checker.valid_answer(solution, solver.impost(solution.task))