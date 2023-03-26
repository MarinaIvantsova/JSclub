# Разрешение имён

Когда во время исполнения кода виртуальная машина JS (VM в дальнейшем) встречает выражение `a = 3` или `alert(a)`, ей нужно понять, куда указывает `a`, чтобы получить (или установить) значение.

Этот процесс называется «**разрешение имён**» или «**разыменование**».

Рассмотрим пример:

```javascript
let a = 3;
function f() {
   a = 4;
}
f();
```
Когда функция `f` выполняется, VM нужно понять, что такое эта самая `a`, чтобы установить ей значение `4`.

Наверняка вы скажете, что в этом случае значение `4` будет присвоено той `a`, что _вне_ функции (и будете правы).

Давайте разбираться, как это работает.

> A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code. A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment. Usually a Lexical Environment is associated with some specific syntactic structure of ECMAScript code such as a FunctionDeclaration, a BlockStatement, or a Catch clause of a TryStatement and a new Lexical Environment is created each time such code is evaluated.
>
> An Environment Record records the identifier bindings that are created within the scope of its associated Lexical Environment. It is referred to as the Lexical Environment’s EnvironmentRecord
>
> The outer environment reference is used to model the logical nesting of Lexical Environment values. The outer reference of a (inner) Lexical Environment is a reference to the Lexical Environment that logically surrounds the inner Lexical Environment. An outer Lexical Environment may, of course, have its own outer Lexical Environment. A Lexical Environment may serve as the outer environment for multiple inner Lexical Environments. For example, if a FunctionDeclaration contains two nested FunctionDeclarations then the Lexical Environments of each of the nested functions will have as their outer Lexical Environment the Lexical Environment of the current evaluation of the surrounding function.


```javascript

// начиная выполнение программы, мы вначале всегда находимся в «глобальном контексте»
// переменная — это пара идентификатор и значение, и эту пару где-то нужно хранить.

// VM создаёт объект для хранения переменных нашего глобального контекста
let $GlobalEnvironmentRecord = {};

// указали, что есть «ключ» `a`, пока «пустой»
$GlobalEnvironmentRecord["a"] = undefined;

// указали, что есть ключ `f`, ссылающийся на функцию f
$GlobalEnvironmentRecord["f"] = function () {...}

let a = 3;

// во время выполнения этого кода нужно найти, где же наша `a`:
// 1. смотрим в текущем объекте хранения переменных $GlobalEnvironmentRecord
// 2. нашли! Устанавливаем $GlobalEnvironmentRecord["a"] = 3

$GlobalEnvironmentRecord["a"] = 3;


function f() {

   // во время выполнения функции `f` мы очутились в её контексте

   // создали объект для хранения переменных нашего контекста `f`
   $FEnvironmentRecord = {};

   // ВАЖНО: каждая функция должна уметь смотреть наружу себя
   // указали ссылку на внешний для нашей функции environment record
   $FEnvironmentRecord["outer"] = $GlobalEnvironmentRecord;

   // пришли к выполнению кода

   a = 4;

   // во время выполнения этого кода нужно найти, где же наша `a`:
   // 1. сначала смотрим у нас: в $FEnvironmentRecord (объект переменных нашего контекста)
   // 2. Не нашли! смотрим наружу: в $FEnvironmentRecord["outer"]
   // 3. Нашли там! Устанавливаем:
   $FEnvironmentRecord["outer"]["a"] = 4; // (то есть $GlobalEnvironmentRecord["a"] = 4)

}

f();

```

Процесс поиска идентификатора переменных идёт по всем контекстам до самого верха, до глобального контекста.

**Если идентификатор переменной не найден нигде, даже в глобальном контексте, JS VM бросает _ReferenceError_:**

```javascript

let $GlobalEnvironmentRecord = {};
$GlobalEnvironmentRecord["b"] = function () {...}

function b () {

  let $BEnvironmentRecord = {};
  $BEnvironmentRecord["outer"] = $GlobalEnvironmentRecord;

  alert(c);

  // поиск 1. смотрим в $BEnvironmentRecord, не видим!
  // поиск 2. смотрим в родительский $BEnvironmentRecord["outer"], то есть в $GlobalEnvironmentRecord
  // не нашлось! бросаем ReferenceError
 
}
b();
```

Рассмотрим пример посложнее:

```javascript

  let a = 3;
  function f() {
    let a = 4;

     function x() {
        a = 5;
     }

     x();
  }

  f();
```


```javascript

  let $GlobalEnvironmentRecord = {};
  $GlobalEnvironmentRecord["a"] = undefined;
  $GlobalEnvironmentRecord["f"] = function () {...}

  let a = 3;

  // поиск 1. смотрим в $GlobalEnvironmentRecord, нашли!
  $GlobalEnvironmentRecord["a"] = 3;

  function f() {

     let $FEnvironmentRecord = {};
     $FEnvironmentRecord["a"] = undefined;
     $FEnvironmentRecord["x"] = function () {...}

     // указали ссылку на внешний для нашей функции environment record
     $FEnvironmentRecord["outer"] = $GlobalEnvironmentRecord;

     let a = 4;

     // поиск 1. смотрим в $FEnvironmentRecord, нашли!
     // в родительский $FEnvironmentRecord["outer"] даже и ходить не пришлось
     $FEnvironmentRecord["a"] = 4;

     function x() {

       let $XEnvironmentRecord = {};

       // указали ссылку на внешний для нашей функции environment record
       $XEnvironmentRecord["outer"] = $FEnvironmentRecord;

       a = 5;

       // поиск 1. смотрим в $XEnvironmentRecord, не видим!
       // поиск 2. смотрим в родительский $XEnvironmentRecord["outer"], нашли!
       // в прародительский смотреть не пришлось
       $FEnvironmentRecord["a"] = 4;
     }

     x();
  }

  f();

```

