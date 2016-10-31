IoScript
--------
## Syntax
### Set
`set variable = content`

Where variable is the name of the variable you want to declare and content is the number, string, or variable to set the content to.

Use:
```
set var1 = Hello, world!
set var2 = 10
set var3 = var2
```
### Print
`print content`
Where content can be a string or a variable.
?? will be replaced with a space and ** with newline.
Use:
```
print 1**
set var1 = Hello
print var1
```
will print
```
1
Hello
```
### Func and call
`func name code`

Where name is the name of the variable to store function in and code is the code to be executed, using ; as newline.

`call name arg1 arg2 argn`

Where name is function's name and argn are the arguments, that are passed in arguments variable to the function, joined by a ;

Use:
```
func hello print Hello, world!**;print Hello, ;print arguments
call hello iovoid
```
### Math
`[+|-|*|/] var value`

First operator can be +, -, * or /. Var is variable that is going to be modified, and value can be a string (only +), a number or a variable containing a string/number
### goto
`goto line`

Where line is the line of code to jump to.
Inside functions, goto will use function's code not main one.

Use:
```
print I will be printed forever
goto 0
```
### Die
`die`

Ends program outputing the needed things or breaking the function
Use:
```
print You will see this
die
print You wont see this
```
### If
`if var1 var2 func1 func2`

If var1 and var2 are equal, call func1 else func2.
die can be used instead too
### Get
`get module`
It imports a module (module).

Use:
```
get fs
call read index.js o
print o
```
## Examples
#### Hello world
```
print Hello, world!
```
#### 99 bottles of beer
```
set beer = 99
set o = 1
func pb print beer;print ??bottles of beer on the wall, ;print beer;print ??bottles of beer.**;
func pb2 print Take one down and pass it around, ;print beer;print ??bottles of beer on the wall.****
func ro print Take one down and pass it around, no more bottles of beer on the wall.****No more bottles of beer on the wall, no more bottles of beer.**Go to the store and buy some more, 99 bottles of beer on the wall.;
call pb
- beer 1
if beer o ro
if beer o die
call pb2
goto 5
```
#### Fibonacci sequence
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

#### Copy a file
```
get fs
call read file.txt o
call write file2.txt o
```
