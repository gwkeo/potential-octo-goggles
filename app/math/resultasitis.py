from sympy import var, Eq, simplify, sqrt
import math
from fractions import Fraction
import json

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

def coef(text, vr): # поиск коэффициентов одночленов
        i = -1
        text = text.replace(' ', '')
        if text.find(vr + '^2') == text.find(vr):
            text = text.replace(vr + '^2', '///')
        if text.find(vr + 'y') == text.find(vr):
            text = text.replace(vr + 'y', '//')
        if text.find('x' + vr) + 1 == text.find(vr):
            text = text.replace('x' + vr, '//')
        if text.find(vr + '^2') == text.find(vr):
            text = text.replace(vr + '^2', '///')
        if text.find(vr) == -1:
            return 0
        else: # будет классно, если я вспомню как это работает
            while True:
                i += 1
                if i > len(text):
                    if vr != '=':
                        return int(text[text.find(vr) - 1] + '1')
                    else:
                        return 0
                try:
                    return int(text[i:text.find(vr)])    
                except:
                    continue

                
def impost(s):
    lst_main = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    # lst_main = [name, F1, F2, E, p, d1, d2, ax0, by0, OSx ,OSy]
    dict_main = {"name": "", "formula": "", "focus1": {"x": "", "y": ""},
                 "focus2": {"x": "", "y": ""}, "eccenter": "", "parameter": "",
                 "direct1": "", "direct2": "", "semiaxis_a": "", "semiaxis_b": "",
                 "asymptote1": "", "asymptote2": "", "center": {"x": "", "y": ""}}

    s = s.replace('**', '^')
    s = s.replace('x2', 'x^2')
    s = s.replace('y2', 'y^2')

    a = coef(s, 'x^2')
    b = coef(s, 'x')
    c = coef(s, 'y^2')
    d = coef(s, 'y')
    e = coef(s, 'xy')
    k = coef(s, '=')


    if e != 0: # xy существует, это параллельные прямые
        if b != 0: # x не равен 0
            hlp_x = int1(math.sqrt(a))
            hlp_y = int1(math.sqrt(c))
            t1 = int1((-(b/hlp_x) + sqrt((b/hlp_x)**2 - 4*k))/2)
            t2 = int1((-(b/hlp_x) - sqrt((b/hlp_x)**2 - 4*k))/2)
            dict_main.update({"name": "Параллельные прямые",
                              "formula": f"{hlp_x}x{sgn(hlp_y)}y{sgn(-t1)}=0, {hlp_x}x{sgn(hlp_y)}y{sgn(-t2)}=0"})
            

        if b == 0: # x и y равны нулю, вид (bx+cy)^2-a^2=0
            a0 = int1(math.sqrt(a))
            b0 = int1(math.sqrt(c))
            dict_main.update({"name": "Параллельные прямые",
                              "formula": f"{a0}x{sgn(b0)}y{sgn(int1(math.sqrt(-k)))}=0, {a0}x{sgn(b0)}y{sgn(int1(-math.sqrt(-k)))}=0"})

    elif a * c < 0: # гиперболы (+ вырожденные)
        if a < 0:
            a, b, c, d, e, k = -a, -b, -c, -d, -e, -k
        B = -(k - (b**2)/(4*a) - (d**2)/(4*c)) # свободный член после преобразований
        if B == 0: # пересекающиеся прямые
            coef_x = int1(math.sqrt(a))
            coef_y = int1(math.sqrt(-c))
            var1 = -int1(b/(2*a))
            var2 = -int1(d/(2*c))
            dict_main.update({"name": "Пересекающиеся прямые",
                              "formula": f"{coef_x}x{sgn(coef_y)}y{sgn(-(var1*coef_x+var2*coef_y))}=0, {coef_x}x{sgn(-coef_y)}y{sgn(-(var1*coef_x-var2*coef_y))}=0",
                              "center": {"x": f"{var1}", "y": f"{var2}"}})
            
        else: # общее для гиперболы
            a0 = int1(abs(B/a)**0.5)
            b0 = int1(abs(B/c)**0.5)
            c0 = sqrt(a0**2 + b0**2) 
            x0 = int1(-b/(2*a))
            y0 = int1(-d/(2*c))
            dict_main.update({"name": "Гипербола", "formula": f"(x{sgn(-x0)})^2/{a0**2}-(y{sgn(-y0)})^2/{b0**2}={int(B / abs(B))}",
                 "semiaxis_a": f"{a0}", "semiaxis_b": f"{b0}",
                 "asymptote1": f"{b0}x{sgn(-a0)}y{sgn(a0*y0-b0*x0)}=0", "asymptote2": f"{b0}x{sgn(a0)}y{sgn(-b0*x0-a0*y0)}=0",
                 "center": {"x": f"{x0}", "y": f"{y0}"}})
            
            if int(B / abs(B)) == 1: # если итог = 1 
                e0 = c0/a0
                dict_main.update({"focus1": {"x": f"{c0+x0}", "y": f"{y0}"},
                 "focus2": {"x": f"{-c0+x0}", "y": f"{y0}"}, "eccenter": f"{e0}", "parameter": f"{c0 - a0/e0}",
                 "direct1": f"x = {a0/e0+x0}", "direct2": f"x = {-a0/e0+x0}"})
                
            else: # если итог = -1, сопряжённая гипербола
                e0 = c0/b0
                dict_main.update({"focus1": {"x": f"{x0}", "y": f"{c0+y0}"},
                 "focus2": {"x": f"{x0}", "y": f"{-c0+y0}"}, "eccenter": f"{e0}", "parameter": f"{c0 - b0/e0}",
                 "direct1": f"y = {b0/e0+y0}", "direct2": f"y = {-b0/e0+y0}"})
                


    elif a * c > 0: # эллипсы
        B = -(k - (b**2)/(4*a) - (d**2)/(4*c))
        if B < 0: # то есть =-1, мнимый эллипс
            a0 = int1(sqrt(abs(B/a)))
            b0 = int1(sqrt(abs(B/c)))
            c0 = sqrt(a0**2 + b0**2) 
            x0 = int1(-b/(2*a))
            y0 = int1(-d/(2*c))
            dict_main.update({"name": "Мнимый эллипс", "formula": f"(x{sgn(-x0)})^2/{a0**2}+(y{sgn(-y0)})^2/{b0**2}=-1"})
            
        elif B == 0: # то есть =0, точка
            x0 = int1(-b/(2*a))
            y0 = int1(-d/(2*c))
            dict_main.update({"name": "Точка", "formula": f"{a}(x{sgn(-x0)})^2+{c}(y{sgn(-y0)})^2=0",
                              "center": {"x": f"{x0}", "y": f"{y0}"}})
            
        else: # то есть эллипс
            if a < 0: 
                a, b, c, d, e, k = -a, -b, -c, -d, -e, -k
            B = -(k - (b**2)/(4*a) - (d**2)/(4*c))
            a0 = int1(abs(B/a)**0.5)
            b0 = int1(abs(B/c)**0.5) 
            x0 = int1(-b/(2*a))
            y0 = int1(-d/(2*c))
            dict_main.update({"name": "Эллипс", "formula": f"(x{sgn(-x0)})^2/{a0**2}+(y{sgn(-y0)})^2/{b0**2}=1",
                 "semiaxis_a": f"{a0}", "semiaxis_b": f"{b0}", "center": {"x": f"{x0}", "y": f"{y0}"}})
            
            if a0 >= b0: # то есть эллипс по оси х
                c0 = sqrt(a0**2 - b0**2)
                e0 = c0/a0 # эксцентриситет
                dict_main.update({"focus1": {"x": f"{c0+x0}", "y": f"{y0}"},
                 "focus2": {"x": f"{-c0+x0}", "y": f"{y0}"}, "eccenter": f"{e0}", "parameter": f"{a0/e0 - c0}",
                 "direct1": f"x = {a0/e0+x0}", "direct2": f"x = {-a0/e0+x0}"})

            
            else: # то есть эллипс по оси y
                c0 = sqrt(b0**2 - a0**2)
                e0 = c0/b0 # эксцентриситет
                dict_main.update({"focus1": {"x": f"{x0}", "y": f"{c0+y0}"},
                 "focus2": {"x": f"{x0}", "y": f"{-c0+y0}"}, "eccenter": f"{e0}", "parameter": f"{b0/e0 - c0}",
                 "direct1": f"y = {b0/e0+y0}", "direct2": f"y = {-b0/e0+y0}"})


    elif a * c == 0: # все параболы 
        dict_main.update({"name": "Парабола", "eccenter": "1"})
        if a == 0: # вид параболы (y-y0)^2=2p(x-x0)
            p = int1(-b/(2*c)) # параметр
            x0 = -int1((-k+((d/(2*c))**2)*c)/(-b)) # координаты центра
            y0 = int1(-d/(2*c))
            dict_main.update({"formula": f"(y{sgn(-y0)})^2={2*p}(x{sgn(-x0)})", "focus1": {"x": f"{int1(p/2+x0)}", "y": f"{y0}"},
                                  "direct1": f"x = {int1(x0 - p/2)}"})

            
        if c == 0: # вид параболы (x-x0)^2=2p(y-y0)
            p = int1(-d/(2*a))
            x0 = int1(-b/(2*a))
            y0 = -int1((-k+((b/(2*a))**2)*a)/(-d))
            dict_main.update({"formula": f"(x{sgn(-x0)})^2={2*p}(y{sgn(-y0)})", "focus1": {"x": f"{x0}", "y": f"{int1(p/2+y0)}"},
                                  "direct1": f"y = {int1(y0 - p/2)}"})    

        dict_main.update({"parameter": f"{abs(p)}", "center": {"x": f"{x0}", "y": f"{y0}"}}) # конечная информация для всех парабол


    return json.dumps(dict_main, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    RESULT = impost(input())
    print(RESULT)
    with open("data.json", "w") as file:
        file.write(RESULT)
        # json.dump(RESULT, file, indent=4, ensure_ascii=False)
