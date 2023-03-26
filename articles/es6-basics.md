# 8. Executable Code and Execution Contexts

## 8.1 Lexical Environments

Когда во время исполнения кода виртуальная машина JS (VM в дальнейшем) встречает выражение `a = 3`, ей нужно понять, куда указывает `a`.

Этот процесс называется «**разрешение имён**» или «**разыменование**».

Рассмотрим пример:
```
var a = 3;
function f() {
   a = 4;
}
f();
```
Когда функция `f` выполняется, VM нужно понять, что такое эта самая `a`.

Если вы писали на Javascript, то наверняка вы скажете, что в этом случае значение 4 будет присвоено той `a`, что вне функции.

Давайте разбираться, как это работает.

> A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code. A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment. Usually a Lexical Environment is associated with some specific syntactic structure of ECMAScript code such as a FunctionDeclaration, a BlockStatement, or a Catch clause of a TryStatement and a new Lexical Environment is created each time such code is evaluated.
>
> An Environment Record records the identifier bindings that are created within the scope of its associated Lexical Environment. It is referred to as the Lexical Environment’s EnvironmentRecord
>
> The outer environment reference is used to model the logical nesting of Lexical Environment values. The outer reference of a (inner) Lexical Environment is a reference to the Lexical Environment that logically surrounds the inner Lexical Environment. An outer Lexical Environment may, of course, have its own outer Lexical Environment. A Lexical Environment may serve as the outer environment for multiple inner Lexical Environments. For example, if a FunctionDeclaration contains two nested FunctionDeclarations then the Lexical Environments of each of the nested functions will have as their outer Lexical Environment the Lexical Environment of the current evaluation of the surrounding function.


Псевдокод:
```

// начинаем выполнение программы, мы вначале всегда находимся в «глобальном контексте»


// создали объект для хранения переменных нашего глобального контекста
$GlobalEnvironmentRecord = {};

// указали, что есть «ключ» `a`, пока «пустой»
$GlobalEnvironmentRecord[‘a’] = undefined;

// указали, что есть ключ `f`, ссылающийся на функцию f, мы её сразу определяем
$GlobalEnvironmentRecord[‘f’] = function () {...}

var a = 3;

// во время выполнения кода **нашли** ключ `a` в объекте глобальных переменных
// и присвоили этому `a` значение 3
$GlobalEnvironmentRecord[‘a’] = 3;


function f() {

   // очутились в контексте функции `f`

   // создали объект для хранения переменных нашего контекста `f`
   $FEnvironmentRecord = {};

   // важно: **указали ссылку на внешний для нашей функции environment record**
   $FEnvironmentRecord[‘outer’] = $GlobalEnvironmentRecord;

   // указали ссылку на объект arguments
   $FEnvironmentRecord[‘arguments’] = argumentsObject; // дальше обсудим

   // пришли к выполнению кода

   a = 4;

   // запускаем поиск:
   // 1. смотрим в $FEnvironmentRecord (объект переменных нашего контекста)
   // 2. если не нашли, смотрим в $FEnvironmentRecord[‘parent’]
   // нашли! Устанавливаем $FEnvironmentRecord[‘parent’][‘a’] = 4

}

f();

```


