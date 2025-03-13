from automaton import generate
from resultasitis import impost
from checker import valid_answer
from random import randint

task = generate()
# задание. отправляем пользователю

key = impost(task)
# ключ к решению. пользователю не передаём

ans = input()
# json-строка, которая создаётся в результате отправки решения.

verdict = valid_answer(ans, key)
# вердикт проверяющей системы. отправляем пользователю
