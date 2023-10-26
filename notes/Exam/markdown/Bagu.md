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

### 暂时性死区

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

------

### Promise 和 try..catch

由于Promise是处理异步函数使用的，而try catch是同步方法，所以catch无法获取到Promise中出错的reject情况

### 手写Promise.all 

-----

### Cookie

Cookie本身是一小段文本文件，保存在本地，当用户Cookie过期后（第一次访问），浏览器会把这段Cookie一起传给Web服务器，用于记录用户的某些操作（喜好，历史记录，账号密码等）。某种意义上可以把Cookie视作一个使用者ID，服务器在Cookie过期前可以完整的识别出这个用户。

不论用户和浏览器需不需要，cookies始终会携带在http头部，所以一般cookie大小只限制在4k左右

### Session

WebStorage 相较于 Cookie 可以保存更多的数据，但是都保存在本地会话中，一般大小为5M左右，包括LocalStorage和SessionStorage两部分

#### LocalStorage



#### SessionStorage



#### Token



### XSS和CSRF

-----

### CSS 盒模型

-----

### CSS 选择器

- 通配符选择器：所有的元素
- 标签选择器：例如 div，p，img等html保留标签【】
- 类选择器：按照给定的标签类名进行选择
- ID选择器：按照给定的ID名进行选择
- 属性选择器：例如：[type="submit"] {}选择具有 type="submit" 属性的元素。
- 后代选择器：按照元素层叠属性进行选择
- 相邻后代选择器：选择元素后紧随的元素选择
- 伪类选择器：hover，active，focus等【用于匹配元素的状态和属性】
- 伪元素选择器：在元素内的某个特定部分进行处理【用于向特定元素插入内容】

### CSS 权重

1.  !important 最高优先级，谨慎使用
2.  内联选择器【直接写在标签里】
3. 类，伪类，属性选择器
4. 元素，伪元素选择器

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

通过预处理方案，可以解决在大型项目中，css导致的重复名情况

- Less：提供变量名@，函数，嵌套定义，运算
- Sass：和less提供的方法类似

以下都以Less为例：

~~~less
// 定义变量
@primary-color: #007bff;
.button {
  background-color: @primary-color;
}

// 嵌套定义
.navbar {
  ul {
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      a {
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

// 运算
@width: 100px;
.container {
  width: @width * 2;
  background-color: #fff - #333;
}

// 函数
.font-size(@size) {
  font-size: @size;
}
h1 {
  .font-size(24px);
}
~~~

-----

### JS的Typeof能返回的值

- undefined：未定义、未赋值的变量，当使用let和var进行初始化的但没有赋值就相当于赋值了undefined
- null
- boolean
- string：字符串本质上是不可变的，所有的字符串操作都是开辟了新的变量空间
- number
- object：对象，包括**null表示空对象指针，也属于object**
- *bigint*
- *symbol*

-----

### JS的基本数据类型和引用数据类型

- 原始值【基本数据类型】：直接定义的非Object类属性，都是存在栈内存中，所以无法被转为Object对象而添加属性。被复制的时候在栈内存中创建一个完全一致的对象，对于被复制的值的修改不会影响本属性
- 引用值【引用数据类型】：大部分就是Object类型，是在栈空间内创建的对象

------

### JS的防抖和节流

闭包

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

### JS的事件循环，React合成事件，JS原生事件

由于JS是单线程的，所以在处理异步函数的时候，需要通过任务调度来使得其加快处理效率，其中分为三个部分：同步任务，宏任务，微任务

其中，JS只会执行同步任务中的代码，当遇到异步调用的时候，会把异步调用放入等待队列任务中分配资源完成，但是不会等待。

等到这个异步调用完成以后，再判断其属于宏任务还是微任务放入对应的队列，其中：

- 宏任务包括：ajax，FileIO，计时器等
- 微任务包括：Promise.then【注意Promise中的是同步，then里面的才是微任务异步】
- nextTick：不属于Event Loop的部分，而是一个特殊的队列，每次阶段完成后都会去查看
- setImmediate：和nextTick类似，不过是要在一个阶段最后才去查看

#### 执行顺序：同步 >> 【process.nextTick >> 微任务 >> 宏任务 >> setImmediate】

一旦当前同步任务队列中任务完成，那么首先会从微任务中调用任务到同步队列中进行处理，直到微任务处理完毕，才会调用宏任务中的任务执行

**由于async函数返回值是Promise，所以返回的也是一个微任务异步函数

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
- map：返回所有经过callback调用过后的结果【map和ES6中的forEach很像，但是forEach是基于原数组的每个元素进行函数执行（不返回新数组，也不修改原数组，可以视作一个**迭代器**），而map是创建新的数组，其中每个元素由原本数组执行变化而来】
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

### CommonJS加载

-----

### http状态码

1.  1XX 临时状态码
2.  2XX 已被接受处理【200 成功状态码；】
3.  3XX 重定向【304 未修改，自上次请求以来网页未被修改过，说明有缓存留用，此时不会返回新界面】
4.  4XX 客户端错误【400 语义错误；403 拒绝执行；404 未找到资源；】
5.  5XX 服务端错误【】

------

### http常规请求头和相应头

#### 请求头：

- accept：用于告知服务器当前浏览器的设置

- host：发出请求所在地址
- connection：链接类型
- cookie：
- origin：对于跨域请求的处理
- content-type：一般只有Post有，告知携带的内容是什么类型

#### 响应头：

- Access-Control-Allow-Origin：哪些网站可以跨域资源共享
- data：服务器名称
- server：链接类型
- expires：链接有效期
- last-modified：最后修改日期
- status：状态码
- content-type

#### 常见的content-type属性值有以下四种：

##### 	1.application/x-www-form-urlencoded：

浏览器的原生form表单，如果不设置enctype属性，那么最终就会以application/x-www-form-urlencoded方式提交数据，该种方式提交的数据放在body里面，数据按照key1=val1&key2=val2的方式进行编码，key和val都进行了URL转码。

##### 	2.multipart/form-data：

该种方式也是一个常见的POST提交方式，通常表单上传文件时使用该种方式。

##### 	3.application/json：

服务器消息主体是序列后的JSON字符串。

##### 	4.text/xml：

该种方式主要用来提交XML格式的数据。

### get，post区别

-----

### https中SSL实现

1. Client 主动请求SSL链接，向Server发送 SSL版本号，加密算法和公钥
2. Server 回应，并添加数字证书（包含公钥）
3. Client通过CA确认数字证书，用公钥加密对此密钥
4. Server确认对称密钥



### 强缓存和协商缓存



### 浏览器进程，JS线程

-----

### 跨域问题

只有当 协议，域名，端口号 三者都相同的时候，才能称之为同源，但对于非同源请求，需要解决跨域问题

-----

### **懒加载**	

1. img标签中的src属性默认不写完整，通过data-属性来保存所有的图片，当窗口滑动到某一特定位置的时候，对其进行加载
2. img标签中加上浏览器自带的lazyload属性

-----

### 渲染与重绘，重排

-----

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
}, false) // 事件捕获

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

如果同时存在冒泡和捕获，那还是按照一开始写的顺序，先捕获，再冒泡。通过event.stopPropagation()方法，可以阻止方法继续向上冒泡。

### react 生命周期函数



### React虚拟DOM

-----

### react diff算法

​	我们知道react为了优化DOM树的绘制和重排操作，采用了diff算法。diff算法主要使用dfs，比较两颗DOM树，以便最快找到变化的节点，然后将其和其子节点全部删除重新渲染，这样只用更新最外层的节点就可以实现全局状态更新。

### react key

​	然而相比于diff算法，key的作用可以省略复杂的比对，直接记录记录该元素是被创建的还是被移动的。key本身并不会导致什么问题，但是会影响每次重排和渲染的性能消耗。

​	react的key应该保持唯一固定，这样可以在重新渲染的时候保证其还能被识别出来。同时之所以不建议通过index设置key，是由于当list被重排了以后，key不会随之变化，导致渲染出现问题

-----

### React 组件间传递数据，单向数据流



### React Fiber

-------

### 跨域问题

1. JSONP
2. CORS
3. 反向代理

------

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

1. DNS解析：输入URL，首先在本地查找是否有IP解析缓存，如果没有就要查询DNS服务器
2. 建立TCP连接
3. 发送HTTP请求
4. 服务器响应
5. 浏览器解析，渲染页面
6. 渲染完成