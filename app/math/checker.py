from resultasitis import impost, coef
from latex2sympy2_extended import latex2sympy
from sympy import symbols, solve, N
import json

def evaluate_line(equation, x1, x2):
    x, y = symbols("x y")
    equation = equation.replace(" ", "")
    loc = equation.find(',')
    if loc == -1:
        loc = equation.find(';')
    equation1 = latex2sympy(equation[:loc])
    equation2 = latex2sympy(equation[loc + 1:])
    return set([solve(equation1.subs(x, x1))[0], solve(equation1.subs(x, x2))[0]])

def valid_name(ans, key):
    ans = ans.replace(" ", "")
    ans = ans.lower()
    key = key.replace(" ", "")
    key = key.lower()
    return ans == key

def valid_formula(ans, key):
    try:
        if str(latex2sympy(ans)).count('Eq') == 1: # то есть 1 уравнение
            ans = str(latex2sympy(ans))[3:-1]
            ans = ans.replace(",", "=")
            ans = ans.replace(" ", "")
            ans = ans.replace("**", "^")
            return ans == key
        if str(latex2sympy(ans)).count('Eq') == 2: # параллельные или пересекающиеся
            if '**' in ans or '^' in ans:
                return False
            else:
                x0 = my_dict["center"]["x"]
                y0 = my_dict["center"]["y"]
                return evaluate_line(ans, x0, 1412) == evaluate_line(key, x0, 1412)
    except:
        return False
    
def valid_num_value(ans, key):
    if ans == "" or key == "":
        return ans == key
    else:
        try:
            return N(latex2sympy(ans)) == N(key)
        except:
            return False

def valid_asymptote(ans, key):
    if ans == "" or key == "":
        return ans == key
    else:
        if '**' in ans or '^' in ans:
            return False
        else:
            x0 = my_dict["center"]["x"]
            y0 = my_dict["center"]["y"]
            try:
                return evaluate_line(ans, x0, 1412) == evaluate_line(key, x0, 1412)
            except:
                return False

def valid_direct(ans, key):
    if ans == "" or key == "":
        return ans == key
    elif ans[0] != key[0]:
        return False
    try:
        ans = ans[2:]
        key = key[3:]
        return N(latex2sympy(ans)) == N(key)
    except:
        return False
    
def valid_point(ans, key):
    if ans == "" or key == "":
        return ans == key
    try:
        return N(latex2sympy(ans["x"])) == N(key["x"]) and N(latex2sympy(ans["y"])) == N(key["y"])
    except:
        return False
    
def valid_answer(ans, key):
    if not (valid_name(ans["name"], key["name"])):
        return "Неверное название"
    if not (valid_formula(ans["formula"], key["formula"])):
        return "Неверная формула"
    if not (valid_num_value(ans["semiaxis_a"], key["semiaxis_a"]) and
            valid_num_value(ans["semiaxis_b"], key["semiaxis_b"])):
        return "Неверные полуоси"
    if not (valid_point(ans["center"], key["center"])):
        if key["name"] == "Точка":
            return "Неверные координаты точки"
        elif key["name"] == "Парабола":
            return "Неверная вершина"
        else:
            return "Неверный центр кривой"
    if key["name"] == "Парабола":
        if not (valid_num_value(ans["eccenter"], key["eccenter"])):
            return "Неверный эксцентриситет"
        if not (valid_num_value(ans["parameter"], key["parameter"])):
            return "Неверный параметр"
        if not ((valid_point(ans["focus1"], key["focus1"]) and
                valid_point(ans["focus2"], key["focus2"])) or
                (valid_point(ans["focus1"], key["focus2"]) and
                valid_point(ans["focus2"], key["focus1"]))):
            return "Неверный фокус"
        if not ((valid_direct(ans["direct1"], key["direct1"]) and
                valid_direct(ans["direct2"], key["direct2"])) or
                (valid_direct(ans["direct1"], key["direct2"]) and
                valid_direct(ans["direct2"], key["direct1"]))):
            return "Неверная директриса"
        if ans["asymptote1"] != "" and ans["asymptote2"] != "":
            return "Асимптот не должно быть"
        else:
            return "Правильно"
    else:
        if not ((valid_point(ans["asymptote1"], key["asymptote1"]) and
                valid_point(ans["asymptote2"], key["asymptote2"])) or
                (valid_point(ans["asymptote1"], key["asymptote2"]) and
                valid_point(ans["asymptote2"], key["asymptote1"]))):
            return "Неверные асимптоты"
        if not ((valid_point(ans["focus1"], key["focus1"]) and
                valid_point(ans["focus2"], key["focus2"])) or
                (valid_point(ans["focus1"], key["focus2"]) and
                valid_point(ans["focus2"], key["focus1"]))):
            return "Неверные фокусы"
        if not (valid_num_value(ans["eccenter"], key["eccenter"])):
            return "Неверный эксцентриситет"
        if not (valid_num_value(ans["parameter"], key["parameter"])):
            return "Неверный параметр"
        if not ((valid_direct(ans["direct1"], key["direct1"]) and
                valid_direct(ans["direct2"], key["direct2"])) or
                (valid_direct(ans["direct1"], key["direct2"]) and
                valid_direct(ans["direct2"], key["direct1"]))):
            return "Неверная директриса"
        return "Правильно"
    
key_dict = json.loads(impost(input()))
with open("data.json", "r") as file:
    ans_dict = json.load(file)
    print(ans_dict)
print(valid_answer(ans_dict, key_dict))
