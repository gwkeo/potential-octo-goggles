from classes import *
from resultasitis import impost
from checker import valid_answer
from automaton import generate

# запрашивается ответ пользователя

request = Request(1, impost(generate().task)) 

ans = request.solution

key = impost(request.solution.task)

verdict = valid_answer(ans, key)

print(verdict.ok, verdict.msg)

# отправляем verdict