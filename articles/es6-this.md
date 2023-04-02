# This в ES6

## Поиск / определение

По аналогии с поиском значения переменной по идентификатору, поиск значения this идёт от текущего environmentObject текущего ExecutionContext'a "вверх" до global.

В global this есть всегда, таким образом, если this не найден в каком-то из "локальных" environmentRecord'ов, то будет использован globalEnvironmentRecord['this'].

**arrow functions**

## Установка this

1. initial
2. call
3. apply
4. bind

### Initial

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

let a = {
	b: function () { alert(this.name); },
	name: "wtf"
}

a.b();

```

```javascript

let a = {
	b: function () {

		// смотрим aEnvironmentRecord['this'], находим, он равен самому объекту
		// выводим this.name
		alert(this.name);

	},
	name: "wtf"
}

a.b();

```


### Call

Call является "внутренним" методом функции. Вызывается с двумя параметрами: this, argumentsList

_об аргументах поговорим позже_.



```javascript

function a () {
	alert(this);
}

a.call("wtf");
```

Этот код будет работать следующим образом:

```javascript

function a () {
	// смотрим aEnvironmentRecord['this'], находим "wtf"
	// смотрим aEnvironmentRecord['outer']['this'], находим global и алёртим
	alert(this);
}

// вызываем функцию, предварительно установив aEnvironmentRecord['this'] = "wtf" 
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

### Bind

Bind создаёт обёртку над функцией, об которую он вызван. В этой обёртке localExecutionContext установлен заранее.

```javascript
function a () {
	alert(this);
}

let b = a.bind("wtf");
// a.bind("wtf")();
// b будет являться новой функцией с установленным localEnvironmentRecord['this']="wtf"
// вызов этой функции не происходит!

b();
```


