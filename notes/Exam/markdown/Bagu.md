### 为什么不做游戏？

### Promise的三种状态

- pending：还未结束
- fulfilled：成功结束
- rejected：失败结束

-----

### Promise的API

- **ALL**：输入多个promise，当所有promise都返回fulfilled的时候才会resolve，只要有一个返回rejected就会直接reject
- **RACE**：输入多个promise，只看第一个返回的promise的结束状态
- **ANY**：输入多个promise，当所有promise都返回rejected的时候才会reject，只要有一个返回fulfilled就会直接resolve

-----

### Cookie，LocalStorage，SessionStorage

-----

### CSS 盒模型

-----

### CSS 有哪些选择器，权重

- 通配符选择器：所有的元素
- 标签选择器：例如 div，p，img等html保留标签
- 类选择器：按照给定的标签类名进行选择
- ID选择器：按照给定的ID名进行选择
- 属性选择器：例如：[type="submit"] {}选择具有 type="submit" 属性的元素。
- 后代选择器：按照元素层叠属性进行选择
- 相邻后代选择器：选择元素后紧随的元素选择
- 伪类选择器：hover，active，focus等
- 伪元素选择器：在元素内的某个特定部分进行处理【只适用于块级元素】

-----

### CSS 居中方案（水平居中）

- text-align方案

  ~~~css
  .container {
    text-align: center;
  }
  ~~~
- margin方案
  ~~~css
  .element {
    margin: 0 auto;
  }
  ~~~

-  flexbox方案
  ~~~css
  .container {
    display: flex;
    justify-content: center;
  }
  ~~~

- gird方案
  ~~~css
  .container {
    display: grid;
    justify-content: center;
  }
  ~~~

- 绝对定位方案
  ~~~css
  .container {
    position: relative;
  }
  
  .element {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  ~~~

-----

### CSS布局

- block：块级元素，自动占满一行
- inline：行内元素，不会自动换行
- inline-block：行内块，在行内的基础上可以设置宽和高
- flex：弹性容器，让容器内的子元素能够自动地伸缩来适应可用空间【响应式布局】
- grid：网格布局，相比于flex，grid可以控制行和列的排布顺序，可以更加精细的控制布局

-----

### CSS 预处理方案

​	Sass

-----

### JS的Typeof能返回的值

- undefined：未定义、未赋值的变量
- boolean
- string
- number
- object：对象，包括**null也算object**
- *bigint*
- *symbol*

------

### JS的防抖和节流

- 防抖：防止用户手抽搐，疯狂操作，所以设置一个timeout，只监听最后一次操作【resize，search】。
- 节流：节省多余的开销，只监听第一次的操作，设置一个timeout，在结束前不会在有回应【submit，mousedown】。

-----

### Js的Prototype和Proto（假设原型为Person，实例为Student）

- Prototype是一根指针，指向类原型（Person.prototype【原型对象】），拥有原型类的所有方法和属性
- 同样，所有实例的原型（Student.prototype）也是Prototype
- proto是实例对象的属性，用于将对象与该对象的原型进行连接
- 当然Person.prototype还有上层的原型Object.prototype

### JS的原型链

​	当我们读取一个属性的时候，如果在实例属性上找到了，就读取它，不会管原型属性上是否还有相同的属性，这其实就是属性屏蔽。即当实例属性和原型属性拥有相同名字的时候，实例属性会屏蔽原型属性，**只是屏蔽**，不会修改，原型属性那个值还在。

​	方法查找顺序按照原型链顺序查找：Student.prototype > Person.prototype > Object.prototype。像toString等方法都是Object传来的

-----

### JS的this

------

### JS的箭头函数与普通函数

- 箭头函数没有自己的this，指向的是上层作用域
- 不支持call，apply
- 不能使用arguments
- 没有prototype属性
- 不能当作构造函数使用【因为没有this，而且new的时候无法找到原型prorotype】

-----

### JS的宏任务和微任务

-----

### JS创建数组

- 创建长度为N的一位数组，初始化值为false

  ~~~js
  const arr = new Array(N).fill(false);
  ~~~

- 创建二维数组，长度为N，每个数组有M个元素，初始为0

  ~~~js
  const arr = new Array(N);
  
  for (let i = 0; i < N; i++) {
    arr[i] = new Array(M).fill(0);
  }
  ~~~

*N和M都只能用const修饰，同样和C，java一样会遇到类似的问题*

-----

### JS数组API

- push/pop：在数组最后添加删除元素
- unshift/shift：在数组最前添加删除元素
- slice：数组切片
- concat：拼接成数组
- join：拼接成字符串
- reverse：反转数组
- sort：用比较函数进行排序
- every：判断所有元素是否都满足条件
- some：判断是否有元素满足条件
- filter：返回所有满足条件的元素
- map：返回所有经过callback调用过后的结果
- reduce：返回从左到右依次对数组进行操作的累加结果
- has, indexOf, forEach...

-----

### JS字符串

- 将字符串转化为数组：

  ~~~js
  const str = "Hello World!";
  const arr = str.split("");
  ~~~


-----

### JS闭包

- 闭包的作用是**“读取其他函数内部变量”**的<u>函数</u>。
  1. 优点：
     - 避免全局变量的污染
     - 作为全局变量的**“局部私有变量”**不会被修改
  2. 缺点：
     - 闭包会常驻内存导致内存泄漏

~~~js
function fn(){
    var a=10
}
fn()
console.log(a)//报错，a未定义，因为局部变量不能在外部使用
~~~

~~~js
//需求: 将局部变量拿到外部访问
function fn(){
    var a=10
    return a//直接返回变量a-----返回的是值（10），不是变量a
}
var a=fn()
console.log(a)//10
~~~

~~~js
// 函数中返回一个函数的结构------闭包
// 函数fn调用完的时候,局部变量a还没有被销毁,并且永远不会被销毁
function fn(){  
    // 返回一个函数-------返回的是一个执行环境----返回的是变量本身
    var a = 10;
    return function(){//函数没有运行的时候，里面的变量是不能被销毁的，并且永远都不会被销毁
        return a;//直接返回变量a----返回的是变量a本身
    }
}
var a = fn();
console.log(a());
~~~

-----

### @import，link

- @import是css规定的，用于导入css样式表的连接

- link是html规定的，不止可以用于导入html，还可以导入js，css等

-----

### import，require

- require只在Node.js下支持是，是在运行时动态加载的文件，**可以在文档中任何地方加载**。
  1. 实际通过require引用的module是一个**拷贝对象**，是可以修改的变量
- import是基于ES6规范，在浏览器下都支持的。在预编译的时候就需要加载，所以必须写在文档最上方。
  1. 通过import引用的是一个**引用对象**，是不能修改的常量

-----

### http状态码

### **懒加载**	

### 渲染与重绘，重排

### async返回值

-----

### let var const不同

- var，最基本的变量，可以先使用，在声明【因为在预解析的时候会找到】，可以重复用var定义同名。
- let，解决var在全局作用域下的问题，只能在块级作用域下使用。由于没有预解析，所以不能先使用再定义。
- const，大致和let类似，但是const将固定引用的内存地址，所以不能修改

------

### react 生命周期函数

### react 组件间传递数据

### 跨域问题

### 项目难点

### ToB和ToC不同

### 基本数据类型和引用数据类型

### URL解析过程