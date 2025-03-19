class Task:

    def __init__(self, task: str):
        self.task = task

    def GetTask(self):
        return self.task


class Point:

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def getXY(self):
        return tuple([self.x, self.y])
    


class Solution:

    def __init__(self, task=None, name=None, formula=None, 
                 focus1=Point(None, None), focus2=Point(None, None), eccenter=None,
                 parameter=None, direct1=None, direct2=None, 
                 semiaxis_a=None, semiaxis_b=None, asymptote1=None,
                 asymptote2=None, center=Point(None, None)):
        self.task = task
        self.name = name
        self.formula = formula
        self.focus1 = focus1
        self.focus2 = focus2
        self.eccenter = eccenter
        self.parameter = parameter
        self.direct1 = direct1
        self.direct2 = direct2
        self.semiaxis_a = semiaxis_a
        self.semiaxis_b = semiaxis_b
        self.asymptote1 = asymptote1
        self.asymptote2 = asymptote2
        self.center = center

    def outputs(self):
        print("Задание:", self.task)
        print("Название:", self.name)
        print("Канонический вид:", self.formula)
        print(f"Фокусы: {self.focus1.getXY()}, {self.focus2.getXY()}")
        print("Эксцентриситет:", self.eccenter)
        print("Параметр:", self.parameter)
        print("Директрисы:", self.direct1, self.direct2)
        print(f"Полуоси: a = {self.semiaxis_a}, b = {self.semiaxis_b}")
        print(f"Асимптоты: {self.asymptote1}, {self.asymptote2}")
        print("Центр:", self.center.getXY())

class Verdict:
    def __init__(self, ok: bool, msg=""):
        self.ok = ok
        self.msg = msg

class Request:
    def __init__(self, user_id: int, solution: Solution):
        self.user_id = user_id
        self.solution = solution