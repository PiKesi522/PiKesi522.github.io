消除左递归：

~~~t
   A  -> Aa | b	
=> A  -> bA'
   A' -> aA' | ε
~~~

消除回溯：

~~~t
   A  -> kb | kc | kd ... | kn | m | ... | z
=> A  -> kA' | m | ... | z
   A' -> b | c | d ... | k
~~~



-----

### First集合和Follow集合

![image-20230424134917770](.\img\image-20230424134917770.png)

### First集看产生式的左边，递归查找左边的元素跟着的下一个

1. A -> a ：则 First（A） = {a}
2. A -> B, B -> b | ε ：则 First（A） = {b，ε}
3. A -> BCDEFG    ：则 First（A） = First（B）∪ First（C） ...  - {ε} 直到BCDEFG中某个First不含ε 。如果都包含，则不去除{ε}

### Follow集看产生式的右边：

1. 文法开始符 加一个#

2. A -> aBb, 则把First（b）-  {ε} 添加到 Follow（B）

3. A -> aB 或 A -> aBb, First（b）= {ε} ，则把Follow（A）添加到 Follow（B）

    【如果b-> c | ε 类似这样的形式，则First（b）- {ε} 和 Follow（B）都要添加进去】