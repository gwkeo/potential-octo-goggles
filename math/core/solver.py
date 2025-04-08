import math
import re
from core.models.solution import Solution

from sympy import sqrt
if __name__ == "__main__":
    from models.solution import *
    
def sgn(vl): # функция для верного написания ответа: x+2y, x-2y, где строка +2 и -2
        if vl > 0:
            return '+' + str(vl)
        else:
            return str(vl)

        
def int1(sm): # целочисленное представление дробных чисел вида 1,0000000002
        if int(sm) - round(sm, 9) == 0:
            return int(sm)
        else:
            return round(sm, 9)

def coef(equation_str, monom):
    equation_str = equation_str.strip().replace(' ', '').replace('**', '^')
    left, right = equation_str.split('=')
    # Разбиение на одночлены (["x^2", "+12", "+y^2"])
    terms_left = re.findall(r'([+-]?\d*x\^2|[-+]?\d*y\^2|[-+]?\d*xy|[-+]?\d*x|[-+]?\d*y|[-+]?\d+)', left)
    terms_right = re.findall(r'([+-]?\d*x\^2|[-+]?\d*y\^2|[-+]?\d*xy|[-+]?\d*x|[-+]?\d*y|[-+]?\d+)', right)
    for i in range(len(terms_right)):
        term = terms_right[i]
        if term[0] == '+':
            term = '-' + term[1:]
        elif term[0] == '-':
            term = '+' + term[1:]
        else:
            term = '-' + term
        terms_right[i] = term
    terms = terms_left + terms_right
    t = 0
    for term in terms:
        term = term.replace('^', '')  # Clean term (e.g., "+y^2" → "+y2")
        
        if monom == "":  # свободный член
            try:   
                t += int(term)
            except:
                pass
            
        elif term.endswith(monom):
            coeff_str = term[:-len(monom)]  # убираем переменны
            if not coeff_str or coeff_str == '+':  # если +x или первый член
                coeff = 1
            elif coeff_str == '-':  # если просто -
                coeff = -1
            else:
                try:
                    coeff = int(coeff_str)
                except:
                    coeff = 0
            t += coeff

    return t
         
def impost(s):
    main_solution = Solution(task=s)

    s = s.replace('**', '^')
    s = s.replace('x2', 'x^2')
    s = s.replace('y2', 'y^2')

    a = coef(s, 'x2')
    b = coef(s, 'x')
    c = coef(s, 'y2')
    d = coef(s, 'y')
    e = coef(s, 'xy')
    k = coef(s, '')


    if e != 0: # xy существует, это параллельные прямые
        if b != 0: # x не равен 0
            hlp_x = int1(math.sqrt(a))
            hlp_y = int1(math.sqrt(c))
            t1 = int1((-(b/hlp_x) + sqrt((b/hlp_x)**2 - 4*k))/2)
            t2 = int1((-(b/hlp_x) - sqrt((b/hlp_x)**2 - 4*k))/2)
            main_solution.name = "Параллельные прямые"
            main_solution.formula = f"{hlp_x}x{sgn(hlp_y)}y{sgn(-t1)}=0, {hlp_x}x{sgn(hlp_y)}y{sgn(-t2)}=0"
            

        if b == 0: # x и y равны нулю, вид (bx+cy)^2-a^2=0
            a0 = int1(math.sqrt(a))
            b0 = int1(math.sqrt(c))
            main_solution.name = "Параллельные прямые"
            main_solution.formula = f"{a0}x{sgn(b0)}y{sgn(int1(math.sqrt(-k)))}=0, {a0}x{sgn(b0)}y{sgn(int1(-math.sqrt(-k)))}=0"

    elif a * c < 0: # гиперболы (+ вырожденные)
        if a < 0:
            a, b, c, d, e, k = -a, -b, -c, -d, -e, -k
        B = -(k - (b**2)/(4*a) - (d**2)/(4*c)) # свободный член после преобразований
        if B == 0: # пересекающиеся прямые
            coef_x = int1(math.sqrt(a))
            coef_y = int1(math.sqrt(-c))
            var1 = -int1(b/(2*a))
            var2 = -int1(d/(2*c))
            main_solution.name = "Пересекающиеся прямые"
            main_solution.formula = f"{coef_x}x{sgn(coef_y)}y{sgn(-(var1*coef_x+var2*coef_y))}=0, {coef_x}x{sgn(-coef_y)}y{sgn(-(var1*coef_x-var2*coef_y))}=0"
            main_solution.center = Point(x=str(var1), y=str(var2))
            
        else: # общее для гиперболы
            a0 = int1(abs(B/a)**0.5)
            b0 = int1(abs(B/c)**0.5)
            c0 = sqrt(a0**2 + b0**2) 
            x0 = int1(-b/(2*a))
            y0 = int1(-d/(2*c))
            main_solution.name = "Гипербола"
            main_solution.formula = f"(x{sgn(-x0)})^2/{a0**2}-(y{sgn(-y0)})^2/{b0**2}={int(B / abs(B))}"
            main_solution.semiaxis_a = f"{a0}"
            main_solution.semiaxis_b = f"{b0}"
            main_solution.asymptote1 = f"{b0}x{sgn(-a0)}y{sgn(a0*y0-b0*x0)}=0"
            main_solution.asymptote2 = f"{b0}x{sgn(a0)}y{sgn(-b0*x0-a0*y0)}=0"
            main_solution.center = Point(x=str(x0), y=str(y0))
            
            if int(B / abs(B)) == 1: # если итог = 1 
                e0 = c0/a0
                main_solution.focus1 = Point(x=f"{c0+x0}", y=str(y0))
                main_solution.focus2 = Point(x=f"{-c0+x0}", y=str(y0))
                main_solution.eccenter = str(e0) 
                main_solution.parameter = f"{c0 - a0/e0}"
                main_solution.direct1 = f"x = {a0/e0+x0}"
                main_solution.direct2 = f"x = {-a0/e0+x0}"
                
            else: # если итог = -1, сопряжённая гипербола
                e0 = c0/b0
                main_solution.focus1 = Point(x=str(x0), y=f"{c0+y0}")
                main_solution.focus2 = Point(x=str(x0), y=f"{-c0+y0}") 
                main_solution.eccenter = str(e0)
                main_solution.parameter = f"{c0 - b0/e0}"
                main_solution.direct1 = f"y = {b0/e0+y0}"
                main_solution.direct2 = f"y = {-b0/e0+y0}"
                


    elif a * c > 0: # эллипсы
        B = -(k - (b**2)/(4*a) - (d**2)/(4*c))
        if B < 0: # то есть =-1, мнимый эллипс
            a0 = int1(sqrt(abs(B/a)))
            b0 = int1(sqrt(abs(B/c)))
            c0 = sqrt(a0**2 + b0**2) 
            x0 = int1(-b/(2*a))
            y0 = int1(-d/(2*c))
            main_solution.name = "Мнимый эллипс"
            main_solution.formula = f"(x{sgn(-x0)})^2/{a0**2}+(y{sgn(-y0)})^2/{b0**2}=-1"
            
        elif B == 0: # то есть =0, точка
            x0 = int1(-b/(2*a))
            y0 = int1(-d/(2*c))
            main_solution.name = "Точка"
            main_solution.formula = f"{a}(x{sgn(-x0)})^2+{c}(y{sgn(-y0)})^2=0"
            main_solution.center = Point(x=str(x0), y=str(y0))
            
        else: # то есть эллипс
            if a < 0: 
                a, b, c, d, e, k = -a, -b, -c, -d, -e, -k
            B = -(k - (b**2)/(4*a) - (d**2)/(4*c))
            a0 = int1(abs(B/a)**0.5)
            b0 = int1(abs(B/c)**0.5) 
            x0 = int1(-b/(2*a))
            y0 = int1(-d/(2*c))
            main_solution.name = "Эллипс"
            main_solution.formula = f"(x{sgn(-x0)})^2/{a0**2}+(y{sgn(-y0)})^2/{b0**2}=1"
            main_solution.semiaxis_a = str(a0)
            main_solution.semiaxis_b = str(b0)
            main_solution.center = Point(x=str(x0), y=str(y0))
            
            if a0 >= b0: # то есть эллипс по оси х
                c0 = sqrt(a0**2 - b0**2)
                e0 = c0/a0 # эксцентриситет
                main_solution.focus1 = Point(x=f"{c0+x0}", y=str(y0))
                main_solution.focus2 = Point(x=f"{-c0+x0}", y=str(y0))
                main_solution.eccenter = str(e0)
                main_solution.parameter = f"{a0/e0 - c0}"
                main_solution.direct1 = f"x = {a0/e0+x0}"
                main_solution.direct2 = f"x = {-a0/e0+x0}"

            
            else: # то есть эллипс по оси y
                c0 = sqrt(b0**2 - a0**2)
                e0 = c0/b0 # эксцентриситет
                main_solution.focus1 = Point(x=str(x0), y=f"{c0+y0}")
                main_solution.focus2 = Point(x=str(x0), y=f"{-c0+y0}")
                main_solution.eccenter = str(e0)
                main_solution.parameter = f"{b0/e0 - c0}"
                main_solution.direct1 = f"y = {b0/e0+y0}"
                main_solution.direct2 = f"y = {-b0/e0+y0}"


    elif a * c == 0 and (a != 0 or c != 0): # все параболы 
        main_solution.name = "Парабола"
        main_solution.eccenter = "1"
        if a == 0: # вид параболы (y-y0)^2=2p(x-x0)
            p = int1(-b/(2*c)) # параметр
            x0 = -int1((-k+((d/(2*c))**2)*c)/(-b)) # координаты центра
            y0 = int1(-d/(2*c))
            main_solution.formula = f"(y{sgn(-y0)})^2={2*p}(x{sgn(-x0)})"
            main_solution.focus1 = Point(x=f"{int1(p/2+x0)}", y=str(y0))
            main_solution.direct1 = f"x = {int1(x0 - p/2)}"

            
        if c == 0: # вид параболы (x-x0)^2=2p(y-y0)
            p = int1(-d/(2*a))
            x0 = int1(-b/(2*a))
            y0 = -int1((-k+((b/(2*a))**2)*a)/(-d))
            main_solution.formula = f"(x{sgn(-x0)})^2={2*p}(y{sgn(-y0)})"
            main_solution.focus1 = Point(x=str(x0), y=f"{int1(p/2+y0)}")                               
            main_solution.direct1 = f"y = {int1(y0 - p/2)}"    

        main_solution.parameter = f"{abs(p)}"
        main_solution.center = Point(x=str(x0), y=str(y0)) # конечная информация для всех парабол

    else:
        pass

    return main_solution