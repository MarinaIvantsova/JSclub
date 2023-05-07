# ES6 arguments

strict mode — strict function
non-strict mode — non-strict function




Arrow functions never have an arguments objects.
У стрелочных функций не бывает доступа к объекту arguments

Дублированные параметры допускаются только в non-strict mode:

```javascript

 function a(b, b) {
   // fails when "use strict";
 } 
```


формальные параметры функции описываются в сигнатуре функции
arguments objec




function a ( b, c,d) {

alert(b) // <- пытаюсь получить значение аргумента b

}


Если формальный параметр функции называется arguments, объекта arguments внутри не будет

```javascript
function b(arguments) {

    console.log(arguments);
}

b(2,4,5)
// выведет 2
```

Если внутри функции определяется переменная с названием arguments, доступа к объекту arguments не будет

```javascript

function c() {

  let arguments = 4;

   console.log(arguments);
}

c();
// выведет 4
```

//объект arguments бывает только в non-strict mode функциях без rest параметров, 

доступ к именованному значению arguments['???'] бывает только в non-strict mode функциях:
  1. без rest параметров
  2. с параметрами без дефолтных значений
  3. без деструктурированных параметров

в strict режиме объект arguments является иммутабельным


function X (a, b, c) // formal parameters

{


let e = 5;

var

}


X() // [[Call]]


когда вызывается функция, определённая как FunctionDeclaration, формальные параметры инстанцируются в EnvironmentRecord вместе с другими объявлениями внутри функции 


