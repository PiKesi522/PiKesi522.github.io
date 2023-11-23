为什么需要**扩展文法**？确定一个开始符号以便计算机识别，实际用的不是S。

------

### 四种文法的区别：

- LR0【适用于不存在冲突的文法】：扩展——构建项目集——构建分析表
- SLR1【适用于存在移进归约冲突的文法】：扩展——构建项目集——构建Follow——构建分析表【通过FOLLOW解决冲突】
- LR1【适用于同时存在“移进-归约”和“归约-归约”冲突的文法】：扩展——构建“前向搜索”项目集——构建分析表【通过前向搜索解决冲突】
- LALR1【把LR1中“归约-归约”冲突合并以后得到的文法】：扩展——构建“前向搜索”项目集——合并——构建分析表【通过前向搜索解决冲突】

几种文法的包含关系如下：

~~~t
LR0 < SLR(1) < LR(1) < 无二义文法

LALR(1)是对LR(1)的近似实现，结果一定一致，但是构造会更加简单
~~~

-----

### 何为“移进-归约”冲突？

按照定义的四种项目：

- 归约项目：A -> a·【点在最后】
- 移进项目：A -> a·bc 【点后面是终结符号】
- 接受项目：S -> a·【初始状态，开始文法】
- 待约项目：A -> a·Bc 【点后面是非终结符号】

移进-归约冲突就是指 归约项目 和 移进项目 同时出现在了一个状态之中，例如:

~~~ t
I1:
S -> L·=R【移进】
R -> L·  【归约】       => 不是 LR0 文法

接着看【移进】项的终结符“=” 和 【归约】项的最左符“R”的 Follow集合
{=} ∩ FOLLOW(R) != 0   => 不是 SLR1 文法
~~~

如果有向前搜索符：

~~~ t
I0:
L -> ·a , #
M -> ·  , a|b
t
查看【移进】项的终结符“a” 和 【归约】项的向前搜索符号 {a, b}
有 {a} ∩ {a, b} != 0    => 不是 LR1 文法
~~~

再有LALR1的判断

~~~t
I6：
A -> a· , &
B -> a· , *

I9:
A -> a· , *
B -> a· , &

则LALR1会将其合并为I69:
A -> a· , &|*
B -> a· , &|*

此时产生“归约-归约”冲突，也即对“&”或“*”不知道用“A”还是“B”进行归约， 故不是 LALR1文法
~~~