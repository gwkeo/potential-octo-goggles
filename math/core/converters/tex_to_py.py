from core.models.solution import Solution
from latex2sympy2_extended import latex2sympy

def tex_to_py(stand_solution: Solution):
# строка json в формате tex
    stand_solution.formula = str(latex2sympy(stand_solution.formula))
    if stand_solution.formula.count('Eq') == 1:
        stand_solution.formula = stand_solution.formula[3:-1].replace(",", "=").replace(" ", "").replace("**", "^")
    stand_solution.eccenter = str(latex2sympy(stand_solution.eccenter))
    stand_solution.parameter = str(latex2sympy(stand_solution.parameter))
    stand_solution.semiaxis_a = str(latex2sympy(stand_solution.semiaxis_a))
    stand_solution.semiaxis_b = str(latex2sympy(stand_solution.semiaxis_b))
    loc_d1 = stand_solution.direct1.find("=") + 1
    stand_solution.direct1 = stand_solution.direct1[:loc_d1] + str(latex2sympy(stand_solution.direct1[loc_d1:]))
    loc_d2 = stand_solution.direct2.find("=") + 1
    stand_solution.direct2 = stand_solution.direct2[:loc_d2] + str(latex2sympy(stand_solution.direct2[loc_d2:]))
    stand_solution.focus1.x = str(latex2sympy(stand_solution.focus1.x))
    stand_solution.focus1.y = str(latex2sympy(stand_solution.focus1.y))
    stand_solution.focus2.x = str(latex2sympy(stand_solution.focus2.x))
    stand_solution.focus2.y = str(latex2sympy(stand_solution.focus2.y))
    stand_solution.center.x = str(latex2sympy(stand_solution.center.x))
    stand_solution.center.y = str(latex2sympy(stand_solution.center.y))
    return stand_solution