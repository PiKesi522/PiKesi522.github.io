### 函数传参

~~~pascal
procedure  P(w,x,y,z);
begin
   y := y*w;
   z := z+x;
end
begin
   a := 5;
   b := 3;
   P(a+b,a-b,a,a); 
   write(a);
end

~~~

-----

#### 	传地址：指针操作，对于传入数据的修改将会影响原本参数，导致在调用过程中实参发生变化

~~~pascal
P(w,x,y,z);	=>	P(a+b,a-b,a,a);
~~~

传地址的操作使得在栈空间中，w,x,y,z 在栈空间中各自分配一块内存空间【y和z指向同一块栈空间】

~~~pascal
y := y*w;	=>	a := a * (a+b)	// 在地址空间中，a被修改为40，此时y和z指向的空间为40
z := z+x	 =>	 a := a + (a-b)	 // z变成了40，但是x的地址空间未被修改，还是2

结果为 42
~~~

-----

#### 	传值：传值不会对函数外部的变量起任何影响，外部变量不会变化

~~~pascal
a := 5
...
begin
y := y*w;	=>	a := a * (a+b)	
z := z+x	 =>	 a := a + (a-b)	 
end
...

结果为 5
~~~

-----

#### 	传结果：传结果的方式是把函数中的运算结果，最后赋值给传入的参数

~~~pascal
y := y*w;	=>	a := a * (a+b)	// y = 5 * （5 + 3） = 40
z := z+x	 =>	 a := a + (a-b)	 // z = 5 + （5 - 3） = 7

// 此时函数完成，按照调用顺序先把y赋值回a，此时a=40
// 再把z赋值回a，此时a=7

结果为 7
~~~

-----

#### 	传名：相当于把函数直接贴在被调用的块中执行的同级别语句，对上一句的操作会影响到下一句

~~~pascal
begin
a := 5;
b := 3;
y := y*w;	=>	a := a * (a+b)	// a被修改为40
z := z+x	 =>	 a := a + (a-b)	 // 此时a=40，所以结果是a = 40 + 40 - 3 = 77
end

结果为 77
~~~



------

### 存储器的划分

<img src=".\img\image-20230607115601316.png" alt="image-20230607115601316" style="height:200px; width:150px" />

一次活动（函数）所需要的信息都会存储在一个活动记录块AR（Activation Record）中，存在非可嵌套定义语言（C）和可嵌套定义语言（Pascal）

<img src=".\img\image-20230609234257272.png" alt="image-20230609234257272" style="height:200px; width:180px" />

对任何局部变量X的引用可表示为变址访问dx[SP]；dx: 变量X相对于活动记录起点的地址，在编译时可确定。



<img src=".\img\image-20230609233318759.png" alt="image-20230609233318759" style="height:200px; width:180px" />

- 返回地址：此活动结束后跳转到哪个位置
- 动态链：指向此活动之前的活动（也即在哪里调用了这个活动）
- 静态链：指向外层活动的存取地址，用于访问外部定义的变量
- 形式单元：存放**传参**的地址
- 局部数据区：存放此活动中局部变量的位置

-----

~~~pascal
program P;
	var a, x : integer;
	procedure Q(b: integer);
        var i: integer;
        procedure R(u: integer; var v: integer);
            var c, d: integer;
            begin 
                if u=1 then R(u+1, v)
                ......
                v:=(a+c)*(b-d);
                ......
        	end {R}
        begin
            ......
            R(1,x);
            ......
        end {Q}
    procedure S;
        var c, i:integer;
        begin
            a:=1;
            Q(c);
            ......
        end {S}
begin
	a:=0;
	S;
	......
end. {P}

~~~

-----

#### P是最外层的主函数，而Q和S都是在P内部定义的，R是在Q中嵌套定义的，所以使用静态链得到的结果如下：

<img src=".\img\image-20230609235650082.png" alt="image-20230609235650082" style="zoom:33%;" />

- ##### 所有的动态链都是指向上一块AR的起始地址

- ##### 可以看到其中S和Q的动态链都是指向最外层P的，因为他们都是在P中定义的

- ##### R的静态链指向Q，因为R是在Q中定义的，所以外部变量的读取得从Q中获取

-  

#### 对于上述过程，还有一种display表示法：用display来表示嵌套过程

<img src=".\img\image-20230610000440175.png" alt="image-20230610000440175" style="zoom:50%;" />

- ##### 其中所有原先记录静态链的位置都换成了display位置，指向上层调用的display的位置

- ##### 在静态链表示的形参之后，添加了若干个调用深度的记录

- 



#### 将两者结合，得到PL表示法，也即在静态链的基础上，增加一个全局display表，用于表示调用深度

~~~pascal
program P;
   	var x,y: integer;
     ...
   	procedure P1;
       	var i,j:integer;
         ...
       	procedure P11(a,b:integer);
          ...
        	begin
                 ...
           	end;
       	begin
           	...
           	call P11(i,j);
           	...
    end;{P1}
       	
   	procedure P2;
   		var s,t:integer;
       	...
      	procedure P21;
         	begin
               ...
         	end;
      	begin
           ...
           call P1
           ...
        end;{P2}
begin
    ...
    call P2;
    ...
end.
~~~

<img src=".\img\image-20230610001228186.png" alt="image-20230610001228186" style="zoom:33%;" />

------

