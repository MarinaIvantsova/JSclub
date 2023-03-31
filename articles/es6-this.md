# This в ES6

## Поиск / определение

По аналогии с поиском значения переменной по идентификатору, поиск значения this идёт от текущего environmentObject текущего ExecutionContext'a "вверх" до global.

В global this есть всегда, таким образом, если this не найден в каком-то из "локальных" environmentRecord'ов, то будет использован globalEnvironmentRecord['this'].

**arrow functions**

## Установка this

1. call
2. apply
3. bind
4. initial

### Call

Call является "внутренним" методом функции. Вызывается с двумя параметрами: this, argumentsList

_об аргументах поговорим позже_.

```javascript

function a () {
	alert(this);
}

a();
```

```javascript

// начиная выполнение программы, мы всегда находимся в «глобальном контексте»
// в глобальном контексте this == globalEnvironmentRecord

function a () {
	// смотрим aEnvironmentRecord['this'], не находим
	// смотрим aEnvironmentRecord['outer']['this'], находим global и алёртим
	// в браузере выведется [object Window]
	alert(this);
}

a();
```



```javascript

function a () {
	alert(this);
}

a.call("wtf");
```

Этот код будет работать следующим образом:

```javascript

// начиная выполнение программы, мы всегда находимся в «глобальном контексте»
// в глобальном контексте this == globalEnvironmentRecord

function a () {
	// смотрим aEnvironmentRecord['this'], находим "wtf"
	alert(this);
}

// при этом выполнении мы вызываем функцию, предварительно установив aEnvironmentRecord['this'] = "wtf" 
a.call("wtf");
```

### Apply

_Apply отличается от call способом передачи аргументов, об аргументах поговорим позже_.

С точки зрения установки this для функции apply идентичен call'у.

```javascript

function a () {
	alert(this);
}

a.apply("wtf");
```

a.call("this", return, throw); <- ключевые слова появляются в вызове функции call
a.apply("this", [return, throw]) <- ключевые слова появляются при инициализации массива

### Bind

Bind возвращает новую функцию, в которой localEnvironmentRecord['this'] будет заранее установлен.

```javascript
function a () {
	alert(this);
}

let b = a.bind("wtf");
// b будет являться новой функцией с установленным localEnvironmentRecord['this']="wtf"
// вызов этой функции не происходит!

b();
```
