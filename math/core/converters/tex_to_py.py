from core.models.solution import Solution
from latex2sympy2_extended import latex2sympy

def conv(a):
    try:
        return str(latex2sympy(a))
    except:
        return a

def tex_to_py(stand_solution: Solution):
# строка json в формате tex
    if stand_solution.formula.count(',') + stand_solution.formula.count(';') == 0:
        stand_solution.formula = conv(stand_solution.formula)
        if stand_solution.formula.count('Eq') == 1:
            stand_solution.formula = stand_solution.formula[3:-1].replace(",", "=").replace(" ", "").replace("**", "^")
        if stand_solution.name == "Гипербола":
            stand_solution.formula = stand_solution.formula.replace("1*", "")
    stand_solution.eccenter = conv(stand_solution.eccenter)
    stand_solution.parameter = conv(stand_solution.parameter)
    stand_solution.semiaxis_a = conv(stand_solution.semiaxis_a)
    stand_solution.semiaxis_b = conv(stand_solution.semiaxis_b)
    if stand_solution.direct1.find("=") != 0:
        loc_d1 = stand_solution.direct1.find("=") + 1
        stand_solution.direct1 = stand_solution.direct1[:loc_d1] + conv(stand_solution.direct1[loc_d1:])
    if stand_solution.direct2.find("=") != 0:
        loc_d2 = stand_solution.direct2.find("=") + 1
        stand_solution.direct2 = stand_solution.direct2[:loc_d2] + conv(stand_solution.direct2[loc_d2:])
    stand_solution.focus1.x = conv(stand_solution.focus1.x)
    stand_solution.focus1.y = conv(stand_solution.focus1.y)
    stand_solution.focus2.x = conv(stand_solution.focus2.x)
    stand_solution.focus2.y = conv(stand_solution.focus2.y)
    stand_solution.center.x = conv(stand_solution.center.x)
    stand_solution.center.y = conv(stand_solution.center.y)
    return stand_solution