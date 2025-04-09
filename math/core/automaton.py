from random import randint
from core.models.task import Task
if __name__ == "__main__":
    from models.task import Task

def sgn(vl):
        if vl >= 0:
            if vl == 1:
                return '+'
            else:
                return '+' + str(vl)
        else:
            if vl == -1:
                return '-'
            else:
                return str(vl)

def sgn_last(vl):
        if vl >= 0:
            return '+' + str(vl)
        else:
            return str(vl)


def no_ones(at):
    if at == 1:
        return ''
    if at == -1:
        return '-'
    else:
        return str(at)

def generate():
    k = randint(1,10)
    if k == 1: # эллипс a - большая
        a = randint(2,9)
        b = randint(1,a-1)
        x0 = randint(1, 5)*(-1)**randint(1,2)
        y0 = randint(1, 5)*(-1)**randint(1,2)
        return Task(task=no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(a**2) + 'y^2' + sgn(-2*y0*a**2) + 'y' + sgn_last(b**2*x0**2+a**2*y0**2-a**2*b**2) + '=0')
    if k == 2: # эллипс b - большая
        a = randint(1,8)
        b = randint(a+1,9)
        x0 = randint(1, 5)*(-1)**randint(1,2)
        y0 = randint(1, 5)*(-1)**randint(1,2)
        return Task(task=no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(a**2) + 'y^2' + sgn(-2*y0*a**2) + 'y' + sgn_last(b**2*x0**2+a**2*y0**2-a**2*b**2) + '=0')
    if k == 3: # гипербола a - действительная
        a = randint(1, 9)
        b = randint(1, 9)
        x0 = randint(1, 5)
        y0 = randint(1, 5)
        return Task(task=no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(-a**2) + 'y^2' + sgn(2*y0*a**2) + 'y' + sgn_last(b**2*x0**2-a**2*y0**2-a**2*b**2) + '=0')
    if k == 4: # гипербола b - действительная
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1, 5)
        y0 = randint(1, 5)
        return Task(task=no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(-a**2) + 'y^2' + sgn(2*y0*a**2) + 'y' + sgn_last(b**2*x0**2-a**2*y0**2+a**2*b**2) + '=0')
    if k == 5: # пересекающиеся прямые
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1, 5)*(-1)**randint(1,2)
        y0 = randint(1, 5)*(-1)**randint(1,2)
        return Task(task=no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(-a**2) + 'y^2' + sgn(2*y0*a**2) + 'y' + sgn_last(b**2*x0**2-a**2*y0**2) + '=0')
    if k == 6: # точка
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1,5)*(-1)**randint(1,2)
        y0 = randint(1,5)*(-1)**randint(1,2)
        return Task(task=no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(a**2) + 'y^2' + sgn(-2*y0*a**2) + 'y' + sgn_last(b**2*x0**2+a**2*y0**2) + '=0')
    if k == 7: # мнимый эллипс
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1,5)*(-1)**randint(1,2)
        y0 = randint(1,5)*(-1)**randint(1,2)
        return Task(task=no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(a**2) + 'y^2' + sgn(-2*y0*a**2) + 'y' + sgn_last(b**2*x0**2+a**2*y0**2+a**2*b**2) + '=0')
    if k == 8: # параллельные прямые
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1,10)*(-1)**randint(1,2)
        y0 = randint(1,10)*(-1)**randint(1,2)
        return Task(task=no_ones(a**2) + 'x^2' + sgn(2*a*b) + 'xy' + sgn(-a*(x0+y0)*a) + 'x' + sgn(b**2) + 'y^2' + sgn(-a*(x0+y0)*b) + 'y' + sgn_last(x0*y0*a**2) + '=0')
    if k == 9: # парабола ветви вверх/вниз
        p = randint(1,5)*(-1)**randint(1,2)
        x0 = randint(1,5)*(-1)**randint(1,2)
        y0 = randint(1,5)*(-1)**randint(1,2)
        return Task(task='x^2' + sgn(-2*x0) + 'x' + sgn(-2*p) + 'y' + sgn_last(2*p*y0+x0**2) + '=0')
    if k == 10: # парабола ветви влево/вправо
        p = randint(1,5)*(-1)**randint(1,2)
        x0 = randint(1,5)*(-1)**randint(1,2)
        y0 = randint(1,5)*(-1)**randint(1,2)
        return Task(task='y^2' + sgn(-2*y0) + 'y' + sgn(-2*p) + 'x' + sgn_last(2*p*x0+y0**2) + '=0')
    