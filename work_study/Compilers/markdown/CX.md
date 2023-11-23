CX编译器和PL0编译器在大部分内容上是相似的，像getch，getsym的方法，区别在于一些保留关键词的不同，我们知道CX的语法定义是：

~~~txt
1)  <program> ∷= <block>

2)  <block> ∷= {<decls> <stmts>}
（block只由一个decls和stmts部分组成，和PL0中循环的定义模式不同）

3)  <decls> ∷=<decls> <decl> | ε

4)  <decl> ∷= int <aid>; | bool <bid>;
（decl中只允许声明变量名，不允许初始化赋值）

5)  <aid> ∷= <ID>

6)  <bid> ∷= <ID>

7)  <stmts> ∷= <stmts> <stmt> | ε
（stmts和decls的方法类似，所以重复stmt过程）

8)  <stmt> ∷= <aid> = <aexpr>; | <bid> = <bexpr>; | if (<bexpr>) <stmt> |  if (<bexpr>) <stmt> else <stmt> | while (<bexpr>) <stmt> | write <aexpr>; | read <aid>; |  <block>

9)	<aexpr> ∷= <aterm> + <aterm> | <aterm> - <aterm> | <aterm>
	（aexpr 由最多两个aterm组成，可以包括一次加法或减法）
	
10)	<aterm> ∷= <afactor> * <afactor> | <afactor> / <afactor> | <afactor>
	（aterm由最多两个afactor组成，可以包括一次乘法或者除法）
	
11)	<afactor> ∷= <aid> | NUM | (<aexpr>)
	（afactor由三种组成：ID，NUM，表达式）

12)	<bexpr> ∷= <bexpr> || <bterm> | <bterm>
	（bexpr 由若干个 bterm 组成，bterm用‘||’连接）
	
13)	<bterm> ∷= <bterm> && <bfactor> | <bfactor>
	（bterm 由若干个bfactor组成，bfactor用‘&&’连接）

14) <bfactor> ∷= <bid> | true | false | ! <bfactor> | (<bexpr>) | <rel>
   （bfactor由多种部分组成：ID，bool值，否命题，表达式，rel【数值比较】）

15) <rel> ∷= (<aid>|NUM) (< | <= | > | >= | == | !=) <aexpr>
~~~

语言关键词包括： int bool if else while write read【拓展：odd，xor】

专用符号包括：\+ - * / < <= > >= == != = || && ！ ; ( ) { } /* */【拓展：%，++，--】
