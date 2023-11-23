### 判断一个文法是否是LL(1)文法？

1. 文法不含左递归
2. 从 A 产生的候选符首集合两两不相交，即 FIRST(a_i) ∩ FIRST(a_j) = 0
3. 对于同样的A，如果候选符首集包含ε，则 FIRST(A) ∩ FOLLOW(A) = 0

~~~t
A -> aBc | De | f | eg ... => (候选符首集) => A -> a | D | f | e
~~~



------

~~~t
A -> aABc | a
B -> Bb | d
~~~

由于是自上而下分析，从规则出发。以自左向右分析为例子，所以首先需要消除左递归和回溯，得到规则：

~~~t
A  -> aA'
A' -> ABc | ε
B  -> dB'
B' -> bB' | ε
~~~

对其求First集和Follow集，得到：

~~~t
First(A)  = {a}		Follow(A) = {#, d}
First(A') = {a, ε}	 Follow(A')= {#, d}
First(B)  = {d}		Follow(B) = {c}
First(B') = {b, ε}	 Follow(B')= {c}
~~~

构造LL(1)分析表，按照First集合填写表格，填写的是生成式子，如果First包含ε，则把Follow集合中的元素添加到ε的生成式①②中

![image-20230424144304699](.\img\image-20230424144304699.png)

------

例子：

 ~~~t
G[v]:  V -> N | N[E]
       E -> V | V+E
       N -> i
 ~~~

去除左递归和回溯得到规则

~~~t
G[V']: V  -> NV'
       V' -> ε | [E]
       E  -> VE'
       E' -> ε | +E
       N  -> i
~~~

得到First集和Follow集：

~~~t
First(V) :{i}		Follow(V) :{#, +, ]}
First(V'):{ε | [}	Follow(V'):{#, +, ]}（此处']'是由Follow(E')推出的，由于存在 E' -> ε）
First(E) :{i}		Follow(E) :{]}
First(E'):{ε | +}	Follow(E'):{]}
First(N) :{i}		Follow(N) :{[, #, +, ]}
~~~

判断是否是LL(1)文法：

~~~t
V' -> ε | [E], First(ε) ∩ First([) = 0, First(V') ∩ Follow(V') = 0
E' -> ε | +E , First(ε) ∩ First(+) = 0, First(E') ∩ Follow(E') = 0
~~~

