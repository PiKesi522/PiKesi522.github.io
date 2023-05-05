### 为什么不做游戏？

-----

### let var const不同

- var，存在于函数作用域，最基本的变量，可以先使用，在声明【因为在预解析的时候会找到】，可以重复用var定义同名。

- let，解决var在全局作用域下的问题，只能在块级作用域下使用。由于没有预解析，所以不能先使用再定义。

~~~js
// 函数作用域
if(true){
    var name = 'Matt';
    console.log(name);	// Matt
}
console.log(name);		// Matt

// 块作用域
if(true){
    let name = 'Matt';
    console.log(name);	// Matt
}
console.log(name);		// 没有定义
~~~

- const，和let相同，但是const将固定引用的内存地址，所以不能修改本身指向的变量，但是可以修改对象内容

### 声明提升

如果出现以下类似代码

~~~js
function foo(){
    console.log(age);
    var age = 26;
}
foo() // undefined
~~~

ES6会将var在函数体内的声明提升到函数最上方进行，使得其等价于以下代码

~~~js
function foo(){
    var age = undefined;
    console.log(age);
    age = 26;
}
foo() // undefined
~~~

但是对于let来说，就不存在变量提升这一说法，必须先定义再使用。

综上由于var的函数作用域问题会导致变量渗透到不必要的地方，通过let可以有效控制

~~~js
for(var i = 0; i < 5; i++){}
console.log(i) // 5

for(let i = 0; i < 5; i++){}
console.log(i) // undefined
~~~

------

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

- undefined：未定义、未赋值的变量，当使用let和var进行初始化的但没有赋值就相当于赋值了undefined
- boolean
- string：字符串本质上是不可变的，所有的字符串操作都是开辟了新的变量空间
- number
- object：对象，包括**null表示空对象指针，也属于object**
- *bigint*
- *symbol*

-----

### JS的基本数据类型和引用数据类型

- 原始值【基本数据类型】：直接定义的非Object类属性，都是存在栈内存中，所以无法被转为Object对象而添加属性。被复制的时候在栈内存中创建一个完全一致的对象，对于被复制的值的修改不会影响本属性
- 引用值【引用数据类型】：

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

- require只在Node.js下支持，是在运行时动态加载的文件，**可以在文档中任何地方加载**。
  1. 实际通过require引用的module是一个**拷贝对象**，是可以修改的变量
- import是基于ES6规范，在浏览器下都支持的。在预编译的时候就需要加载，所以必须写在文档最上方。
  1. 通过import引用的是一个**引用对象**，是不能修改的常量

-----

### http状态码

1.  1XX 临时状态码
2.  2XX 已被接受处理【200 成功状态码；】
3.  3XX 重定向
4.  4XX 客户端错误【400 语义错误；403 拒绝执行；404 未找到资源；】
5.  5XX 服务端错误【】

-----

### https中SSL实现

-----

### **懒加载**	

1. img标签中的src属性默认不写完整，通过data-属性来保存所有的图片，当窗口滑动到某一特定位置的时候，对其进行加载
2. img标签中加上浏览器自带的lazyload属性

-----

### 渲染与重绘，重排

### async返回值

返回的是一个Promise对象

-----

### DOM0级事件和DOM2级事件

- 直接写在标签里的事件都是dom0级事件：\<div onclick="foo()"> div.onclick=function(){}。dom0事件会相互覆盖
- 通过动态绑定的方法对于dom的添加都是dom2级事件：addEventLisenter（需要传入false参数为事件冒泡，传入true参数为事件捕获）。dom2级事件不会覆盖

~~~js
const oDiv = document.getElementById("d");

oDiv.addEventListener('click', function(){
    console.log(1);
}, true) // 事件捕获

oDiv.addEventListener('click', function(){
    console.log(1);
}, true) // 事件冒泡
~~~

冒泡是从下往上执行，捕获是从上往下执行

-----

### 事件冒泡和事件代理

- **事件冒泡**指的是，从最深的子节点开始，在节点树上不断循环往上找父节点。例如 div>ul>li>a，如果在a上添加一个点击事件，那么这个事件就会一层一层往外执行，执行的顺序为 a>li>ul>div

- **事件委托**指的是，一些类似的事件，利用事件冒泡，可以把事件委托给其他事件进行统一处理

例如有以下元素

~~~html
<ul id="ul1">
    <li>111</li>
    <li>222</li>    
    <li>333</li>
</ul>
~~~

默认方法给每个li添加点击事件的方法：

~~~js
const ul = document.getElementById("ul1");
const ali = ul.getElementsByTagName("li");
for(let i = 0; i < ali.length; i++){
    ali[i].onclick = function(){
        alert(123);
    }
}
~~~

但是通过事件委托，可以把li的每个点击事件委托给ul去做

~~~js
const ul = document.getElementById("ul1");
ul.onclick = function(){
    alert(123);
}
~~~

当然使用这种方法会导致ul也会有一个onclick事件，所以需要通过nodeName来获取具体的节点名称

~~~js
const ul = document.getElementById("ul1");
ul.onclick = function(){
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLowerCase() === 'li'){
        alert(123);
    }
}
~~~

1. 这种方法对于后续新增的同级别li节点，并不会添加点击事件，所以需要同样再对ul进行一次事件委托即可。
2. 由于是用户的输入对窗口元素添加的方法，所以可能用户点击的不是我们所需要的窗口元素，而是其100%宽高的子元素，那么需要先通过target.parent找到最上方的组件，然后再往下找

~~~js
const ul = document.getElementById("ul1");
ul.addEventListener('click',function(ev){
    var target = ev.target;
    while(target !== ul){
        if(target.tagName.toLowerCase() === 'li'){
            cnonsole.log('123');
            break;
        }
        target = target.parentNode;
    }
})
~~~

-----

### 事件冒泡和事件捕获

在上述的基础上，假设有一个div嵌套结构，div1 > div2 > div3 > div4，当进行点击的时候事件开始传递

1. 先是1 - 2 - 3 - 4，从外到内逐层传入，这个步骤叫做**事件捕获**
2. 再是4 - 3 - 2 - 1，从内到外逐层输出，这个步骤叫做**事件冒泡**

~~~js
var body=document.getElementsByTagName('body')[0];
 
window.addEventListener('click',function(){
        console.log('window')
},false)
 body.addEventListener('click',function(){
        console.log('body')
},false)
 
var oDiv=document.getElementsByTagName('div')[0];
 oDiv.addEventListener('click',function(){
    console.log(1)
 },false)
 
oDiv.addEventListener('click',function(){
  console.log(2)
},false)

// ----- 事件冒泡输出 -----
/*
	1
	2
	body
	window
*/
~~~

~~~js
var body=document.getElementsByTagName('body')[0];
 
window.addEventListener('click',function(){
        console.log('window')
},true)
 body.addEventListener('click',function(){
        console.log('body')
},true)
 
var oDiv=document.getElementsByTagName('div')[0];
 oDiv.addEventListener('click',function(){
    console.log(1)
 },true)
 
oDiv.addEventListener('click',function(){
  console.log(2)
},true)

// ----- 事件捕获输出 -----
/*
	window
	body
	1
	2
*/
~~~

如果同时存在冒泡和捕获，那还是按照一开始写的顺序，先捕获，再冒泡

------

### react 生命周期函数

### react 组件间传递数据

### 跨域问题

1. JSONP
2. CORS
3. 反向代理

### 项目难点

### ToB和ToC不同

-----

### 设计原则

设计原则不是要完全不能违背，而是要尽量少的违反

#### SOLID五大基本原则

- 单一职责原则：每个程序只做一个功能，过大的类需要把他拆开
- 开放封闭原则：（promise 的then扩展）对扩展开放，对修改封闭
- 里氏替换原则：子类有父类所有的功能，但是不能改变父类的原有功能
- 接口隔离原则：类不需要知道的接口越少越好
- 依赖反转原则：高层类不应该依赖底层类，而是应该依赖抽象类

#### 23种设计模式

- 工厂模式：只通过构造器和传入参数进行类对象的创建
- 单例模式：一个类最多只能创建一个实例
- 订阅发布模式：（事件绑定）对于状态的更新会自动发布给订阅者
- 迭代器模式：提供一种方法顺序访问一个聚合对象中各个元素，而又不暴露该对象的内部表示
- 代理模式：（事件代理）一个对象不能/不方便直接访问另一个对象的时候，需要一个代理

-----

### URL解析过程