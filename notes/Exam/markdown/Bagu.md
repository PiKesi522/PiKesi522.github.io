### 为什么不做游戏？

### CSS 有哪些选择器

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

-----

项目难点

ToB和ToC不同

http状态码

**懒加载**

async返回值

let var const不同

react 生命周期函数

react 组件间传递数据

