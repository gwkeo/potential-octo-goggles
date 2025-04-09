from latex2sympy2_extended import latex2sympy
from sympy import symbols, solve, N

from core.models.solution import Solution
from core.models.verdict import Verdict
from core import solver, automaton

def evaluate_line(equation, x1, x2):
    x = symbols("x")
    return frozenset([solve(equation.subs(x, x1))[0], solve(equation.subs(x, x2))[0]])

def divide_lines(strings):
    strings = strings.replace(" ", "")
    loc = strings.find(",")
    if loc == -1:
        loc = strings.find(";")
    s1 = latex2sympy(strings[:loc])
    s2 = latex2sympy(strings[loc + 1:])
    return s1, s2

def valid_name(ans, key):
    ans = ans.replace(" ", "")
    ans = ans.lower()
    key = key.replace(" ", "")
    key = key.lower()
    return ans == key

def valid_formula(ans, key):
    try:
        if (ans.count(',') + ans.count(';')) == 0: # то есть 1 уравнение
            return ans == key
        if (ans.count(',') + ans.count(';')) == 1: # параллельные или пересекающиеся
            if '**' in ans or '^' in ans:
                return False
            else:
                ans_divided = divide_lines(ans)
                key_divided = divide_lines(key)
                a = set([evaluate_line(ans_divided[0], 0, 1412),(evaluate_line(ans_divided[1], 0, 1412))])
                b = set([evaluate_line(key_divided[0], 0, 1412),(evaluate_line(key_divided[1], 0, 1412))])
                return a == b
    except:
        return False
    
def valid_num_value(ans, key):
    if ans == None or key == None:
        return ans == key
    else:
        try:
            return N(ans) == N(key)
        except:
            return False

def valid_asymptote(ans, key):
    if ans == None or key == None:
        return ans == key
    else:
        if '**' in ans or '^' in ans:
            return False
        else:
            try:
                return evaluate_line(latex2sympy(ans), 0, 1412) == evaluate_line(latex2sympy(key), 0, 1412)
            except:
                return False

def valid_direct(ans, key):
    if ans == None or key == None:
        return ans == key
    elif ans[0] != key[0]:
        return False
    try:
        loc_a = ans.find("=") + 1
        loc_k = key.find("=") + 1
        ans = ans[loc_a:]
        key = key[loc_k:]
        return N(ans) == N(key)
    except:
        return False
    
def valid_point(ans, key):
    if ans.x == None or key.x == None:
        return ans == key
    try:
        return N(ans.x) == N(key.x) and N(ans.y) == N(key.y)
    except:
        return False

def valid_answer(ans: Solution, key: Solution):
    verd = Verdict(ok=False)
    if not (valid_name(ans.name, key.name)):
        verd.msg = "Неверное название"
    elif not (valid_formula(ans.formula, key.formula)):
        verd.msg = "Неверная формула"
    elif not ((valid_point(ans.focus1, key.focus1) and valid_point(ans.focus2, key.focus2)) or
            (valid_point(ans.focus1, key.focus2) and valid_point(ans.focus2, key.focus1))):
        if key.name == "Парабола":
            verd.msg = "Неверный фокус"
        verd.msg = "Неверные фокусы"
    elif not (valid_num_value(ans.eccenter, key.eccenter)):
        verd.msg = "Неверный эксцентриситет"
    elif not (valid_num_value(ans.parameter, key.parameter)):
        verd.msg = "Неверный параметр"
    elif not ((valid_direct(ans.direct1, key.direct1) and
                valid_direct(ans.direct2, key.direct2)) or
                (valid_direct(ans.direct1, key.direct2) and
                valid_direct(ans.direct2, key.direct1))):
        if key.name == "Парабола":
            verd.msg = "Неверная директриса" 
        else:
            verd.msg = "Неверные директрисы"
    elif not (valid_num_value(ans.semiaxis_a, key.semiaxis_a) and
            valid_num_value(ans.semiaxis_b, key.semiaxis_b)):
        verd.msg = "Неверные полуоси"
    elif not ((valid_asymptote(ans.asymptote1, key.asymptote1) and
                valid_asymptote(ans.asymptote2, key.asymptote2)) or
                (valid_asymptote(ans.asymptote1, key.asymptote2) and
                valid_asymptote(ans.asymptote2, key.asymptote1))):
        verd.msg = "Неверные асимптоты"
    elif not (valid_point(ans.center, key.center)):
        if key.name == "Парабола":
            verd.msg = "Неверная вершина"
        if key.name == "Точка":
            verd.msg = "Неверные координаты точки"
        else:
            verd.msg = "Неверный центр кривой"
    else:
        verd.ok = True
        verd.msg = "Правильно"
    return verd

        
def valid_answer_old(ans, key):
    r_dict = {"ok": False, "msg": ""}
    if not (valid_name(ans["name"], key["name"])):
        r_dict.update({"msg": "Неверное название"})
    elif not (valid_formula(ans["formula"], key["formula"])):
        r_dict.update({"msg": "Неверная формула"})
    elif not (valid_num_value(ans["semiaxis_a"], key["semiaxis_a"]) and
            valid_num_value(ans["semiaxis_b"], key["semiaxis_b"])):
        r_dict.update({"msg": "Неверные полуоси"})
    elif not (valid_point(ans["center"], key["center"])):
        if key["name"] == "Точка":
            r_dict.update({"msg": "Неверные координаты точки"})
        elif key["name"] == "Парабола":
            r_dict.update({"msg": "Неверная вершина"})
        else:
            r_dict.update({"msg": "Неверный центр кривой"})
    elif key["name"] == "Парабола":
        if not (valid_num_value(ans["eccenter"], key["eccenter"])):
            r_dict.update({"msg": "Неверный эксцентриситет"})
        elif not (valid_num_value(ans["parameter"], key["parameter"])):
            r_dict.update({"msg": "Неверный параметр"})
        elif not ((valid_point(ans["focus1"], key["focus1"]) and
                valid_point(ans["focus2"], key["focus2"])) or
                (valid_point(ans["focus1"], key["focus2"]) and
                valid_point(ans["focus2"], key["focus1"]))):
            r_dict.update({"msg": "Неверный фокус"})
        elif not ((valid_direct(ans["direct1"], key["direct1"]) and
                valid_direct(ans["direct2"], key["direct2"])) or
                (valid_direct(ans["direct1"], key["direct2"]) and
                valid_direct(ans["direct2"], key["direct1"]))):
            r_dict.update({"msg": "Неверная директриса"})
        elif ans["asymptote1"] != "" and ans["asymptote2"] != "":
            r_dict.update({"msg": "Асимптот не должно быть"})
        else:
            r_dict.update({"msg": "Правильно", "ok": True})
    else:
        if not ((valid_point(ans["asymptote1"], key["asymptote1"]) and
                valid_point(ans["asymptote2"], key["asymptote2"])) or
                (valid_point(ans["asymptote1"], key["asymptote2"]) and
                valid_point(ans["asymptote2"], key["asymptote1"]))):
            r_dict.update({"msg": "Неверные асимптоты"})
        elif not ((valid_point(ans["focus1"], key["focus1"]) and
                valid_point(ans["focus2"], key["focus2"])) or
                (valid_point(ans["focus1"], key["focus2"]) and
                valid_point(ans["focus2"], key["focus1"]))):
            r_dict.update({"msg": "Неверные фокусы"})
        elif not (valid_num_value(ans["eccenter"], key["eccenter"])):
            r_dict.update({"msg": "Неверный эксцентриситет"})
        elif not (valid_num_value(ans["parameter"], key["parameter"])):
            r_dict.update({"msg": "Неверный параметр"})
        elif not ((valid_direct(ans["direct1"], key["direct1"]) and
                valid_direct(ans["direct2"], key["direct2"])) or
                (valid_direct(ans["direct1"], key["direct2"]) and
                valid_direct(ans["direct2"], key["direct1"]))):
            r_dict.update({"msg": "Неверная директриса"})
        else:
            r_dict.update({"msg": "Правильно", "ok": True})
    return r_dict

a = automaton.generate().task
print(valid_answer(solver.impost(a), solver.impost(a)))