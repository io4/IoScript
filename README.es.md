IoScript
--------
## Sintaxis
### Set
`set variable = contenido`

Variable es el nombre que le queres poner a la variable que estas definiendo y contenido es lo que querés que tenga, puede ser texto, un número u otra variable.

Uso:
```
set var1 = Hola, Mundo!
set var2 = 10
set var3 = var2
```
### Print
`print contenido`
Donde contenido es lo que querés que se imprima, que puede ser texto o una variable.
** se reemplaza con una linea nueva y ?? con un espacio
Uso:
```
print 1**
set var1 = Hola
print var1
```
va a imprimir
```
1
Hola
```
### Func and call
`func nombre código`

Nombre es el nombre de la función y código es lo que queres que haga, usando ; como linea nueva.

`call nombre argumento1 argumento2 argumento(n)`

Nombre es el nombre de la funcion y argumento(n) son los argumentos que van a aparecer en la variable "arguments" para el codigo de la funcion.

Uso:
```
func hello print Hola, Mundo!**;print Hola, ;print arguments
call hello iovoid
```
### Matematica
`[+|-|*|/] var valor`

Podes usar +, -, * o / para añadir/restar/multiplicar/dividir var por valor
### Goto
`goto linea`

Va a línea, si esta dentro de una function, va a la línea dentro del codigo de la funcion.

Uso:
```
print Voy a ser imprimido por siempre
goto 0
```
### Die
`die`

Termina el programa devolviendo la salida requerida, o se sale de la funcion, si esto es llamado dentro de una.

Uso:
```
print Vas a ver esto
die
print Pero no esto
```
### If
`if var1 var2 func1 func2`

Si var1 y var2 son iguales, llamar func1, sino func2. die se puede usar en lugar de alguna de las dos funciones.

### Get
`get módulo`
Importa un módulo

Uso:
```
get fs
call read index.js o
print o
```
## Ejemplos
#### Hola, Mundo
```
print Hola, Mundo!
```
#### 99 botellas de cerveza
```
set beer = 99
set o = 1
func pb print beer;print ??botellas de cerveza en la pared, ;print beer;print ??botellas de cerveza.**;
func pb2 print Saca una y compartela, ;print beer;print ??botellas de cerveza en la pared.****
func ro print Saca una y compartela, ninguna botella de cerveza en la pared.****No mas botellas de cerveza en la pared, no mas botellas de cerveza.**Ve a la tienda y compra mas, 99 botellas de cerveza en la pared.;
call pb
- beer 1
if beer o ro
if beer o die
call pb2
goto 5
```
#### Sequencia Fibonacci
```
set a = 0
set b = 1
set end = 832040
set c = 0
+ c a
set a = b
set b = c
print c
print **
if c end die
goto 4
```

#### Copiar un archivo
```
get fs
call read archivo.txt o
call write archivo2.txt o
```
