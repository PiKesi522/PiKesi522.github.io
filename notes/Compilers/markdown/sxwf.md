### 属性文法和语法制导翻译

属性文法基于上下文无关语法进行扩展，包括**综合属性**和**继承属性**多了以下两部分内容：

1. 每个终结符号/非终结符号有 **“值”（属性）**
2. 每个产生式有一组**属性的语义规则**，对属性进行计算



#### 综合属性

​	越是靠语法树上层的信息都是由下层累计计算得到的，所以是一种自下而上传递信息的过程

![img](.\img\v2-22a1b0444c51979f63601c668e04cc1b_b.jpg)

​	其语法规则的左侧是一个上层值，而右侧是一个表达式，从而使得左侧的结果由右侧表达式计算得到（**上层属性由下层属性计算得到**）

![img](.\img\v2-407f15d2eed43071bf975923e7f85726_b.jpg)

​	对于其语法树来说，从底层出发可以确定上层节点，也即**子节点确定父节点**



#### 继承属性

​	继承属性和综合属性相反，在产生式左侧确定产生式右侧，在语法树中上层向下层传递信息

![img](.\img\v2-f8b91f8bcbedeccfac8a461f5f6c5f8d_b.jpg)

​	当产生式左侧的符号确定的时候，产生式右侧的结果会对应确定



#### 语义规则

​	对于任意产生式 A -> a 对应得语义规则为 b := f(c1, c2, c3, ... ck) 其中只包括两种情况：

1. b是A的综合属性， 此时Ci是右边文法a的属性
2. b是右边文法a的继承属性，此时Ci是A或右边文法a的属性

-------

### 带注释的语法树

#### S属性文法

S属性文法只是用综合属性，在每个节点处自下而上进行确定语义规则