from random import randint
from sympy import var, Eq, simplify, sqrt
import math
from fractions import Fraction
from resultasitis import impost
import json

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
    ch1, ch2, ch3, ch4 = -99, -99, -99, -99
    p, a, b, x0, y0 = -99, -99, -99, -99, -99
    k = randint(1,10)
    if k == 1:       
        while True:
            a = randint(1,9)
            b = randint(1,9)
            if a > b:
                x0 = randint(1, 5)*(-1)**randint(1,2)
                y0 = randint(1, 5)*(-1)**randint(1,2)
                t_line = no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(a**2) + 'y^2' + sgn(-2*y0*a**2) + 'y' + sgn_last(b**2*x0**2+a**2*y0**2-a**2*b**2) + '=0'
                break
            else:
                continue
    if k == 2:       
        while True:
            a = randint(1,9)
            b = randint(1,9)
            if a < b:
                x0 = randint(1, 5)*(-1)**randint(1,2)
                y0 = randint(1, 5)*(-1)**randint(1,2)
                t_line = no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(a**2) + 'y^2' + sgn(-2*y0*a**2) + 'y' + sgn_last(b**2*x0**2+a**2*y0**2-a**2*b**2) + '=0'
                break
            else:
                continue
    if k == 3:
        a = randint(1, 9)
        b = randint(1, 9)
        x0 = randint(1, 5)
        y0 = randint(1, 5)
        t_line = no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(-a**2) + 'y^2' + sgn(2*y0*a**2) + 'y' + sgn_last(b**2*x0**2-a**2*y0**2-a**2*b**2) + '=0'
    if k == 4:
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1, 5)
        y0 = randint(1, 5)
        t_line = no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(-a**2) + 'y^2' + sgn(2*y0*a**2) + 'y' + sgn_last(b**2*x0**2-a**2*y0**2+a**2*b**2) + '=0'
    if k == 5:
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1, 5)*(-1)**randint(1,2)
        y0 = randint(1, 5)*(-1)**randint(1,2)
        t_line = no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(-a**2) + 'y^2' + sgn(2*y0*a**2) + 'y' + sgn_last(b**2*x0**2-a**2*y0**2) + '=0'
    if k == 6:
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1,5)*(-1)**randint(1,2)
        y0 = randint(1,5)*(-1)**randint(1,2)
        t_line = no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(a**2) + 'y^2' + sgn(-2*y0*a**2) + 'y' + sgn_last(b**2*x0**2+a**2*y0**2) + '=0'
    if k == 7:       
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1,5)*(-1)**randint(1,2)
        y0 = randint(1,5)*(-1)**randint(1,2)
        t_line = no_ones(b**2) + 'x^2' + sgn(-2*x0*b**2) + 'x' + sgn(a**2) + 'y^2' + sgn(-2*y0*a**2) + 'y' + sgn_last(b**2*x0**2+a**2*y0**2+a**2*b**2) + '=0'
    if k == 8:
        a = randint(1,9)
        b = randint(1,9)
        x0 = randint(1,10)*(-1)**randint(1,2)
        y0 = randint(1,10)*(-1)**randint(1,2)
        t_line = no_ones(a**2) + 'x^2' + sgn(2*a*b) + 'xy' + sgn(-a*(x0+y0)*a) + 'x' + sgn(b**2) + 'y^2' + sgn(-a*(x0+y0)*b) + 'y' + sgn_last(x0*y0*a**2) + '=0'
    if k == 9:
        p = randint(1,5)*(-1)**randint(1,2)
        x0 = randint(1,5)*(-1)**randint(1,2)
        y0 = randint(1,5)*(-1)**randint(1,2)
        t_line = 'x^2' + sgn(-2*x0) + 'x' + sgn(-2*p) + 'y' + sgn_last(2*p*y0+x0**2) + '=0'
    if k == 10:
        p = randint(1,5)*(-1)**randint(1,2)
        x0 = randint(1,5)*(-1)**randint(1,2)
        y0 = randint(1,5)*(-1)**randint(1,2)
        t_line = 'y^2' + sgn(-2*y0) + 'y' + sgn(-2*p) + 'x' + sgn_last(2*p*x0+y0**2) + '=0'
  
    return t_line
