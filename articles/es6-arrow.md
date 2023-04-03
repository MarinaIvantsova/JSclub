# Arrow functions

EnvironmentRecord:

EnvironmentRecord не предоставляет для ArrowFunction значение this

У ArrowFunction значение this, arguments, super, new.target имеет "лексический характер", чаще всего это внешняя к ArrowFunction функция

У ArrowFunction отличается синтаксис:

ArrowFunction[In, Yield] : ArrowParameters[?Yield] [no LineTerminator here] => ConciseBody[?In]

ArrowFunction наследует значение "strict" из окружающего контекста.

ArrowFunction может быть оптимизирована движком JS VM для правильной хвостовой рекурсии.

Ошибки ArrowFunctions:

1. нельзя использовать yield ни в параметрах, ни в теле => ArrowFunction не может быть генератором

**Нужно разобрать практический пример использования генераторов**

2. нельзя внутри ArrowFunction определять переменную с тем же именем, что и в параметрах ArrowFunction: (a) => { let a; }

3. ArrowFunction нельзя использовать с оператором new

проверить наслдеование

4. ArrowFunction априори анонимна



