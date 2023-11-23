<div style="font-size:36px; text-indent:1em; font-weight:800; padding:0 0 1em 0">
    A 字符串前缀 <span style="color:red; float:right; margin: 0 1em 0 0">81</span>
</div>

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>
~~~txt
现在有两个字符串S和T，你需要对S进行若干次操作，使得S是T的一个前缀（空串也是一个前缀）。每次操作可以修改S的一个字符，或者删除一个S末尾的字符。
小团需要写一段程序，输出最少需要操作的次数。
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>
~~~txt
第一行一个正整数C，表示数据组数；
对于每一组数据输入两行仅包含小写字母的字符串S和T。
1≤|S|,|T|≤5*10^4, 1≤C≤10
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>
~~~txt
对于每一组数据，输出一个整数，表示最少需要操作的次数。
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>

​	*这道题题面有点过于简单，以至于我都不理解为什么还有没过的点，可能是题目描述存在一些问题*

- S字符串只有修改和删除两个选择，但是删除只能删除末尾的字符串
- 如果是对应修改，那么修改一个字符为正确的，和删除一个错误的字符本质上是一样的操作
- 那么处理前缀的方法就只剩两种：删除S中多余的 + 更改S中不匹配的
- 由于删除只能删除最后的，甚至不需要考虑字符匹配的算法（*这里就是我怀疑可能有理解错误的地方*）

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>
~~~js
const C = readInt();

const compareDiff = (S, T) => {
    const len = Math.min(T.length, S.length);
    let diff = 0;
    for (let i = 0; i < len; i++) {
        if (S[i] != T[i]) {
            diff++;
        }
    }
    // console.log("diff : " + diff);
    return diff;
}

const removeSuffix = (S, T) => {
    // console.log("suffix : " + Math.max(S.length - T.length, 0));
    return (Math.max(S.length - T.length, 0));
}

for (let i = 0; i < C; i++) {
    let S = readline();
    let T = readline();
    // console.log(S, T);

    const result = compareDiff(S, T) + removeSuffix(S, T);
    console.log(result);
}

~~~



-----

<div style="font-size:36px; text-indent:1em; font-weight:800; padding:1em 0">
    B 交通规划 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
</div>



<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>


~~~txt
A国有n个城市，这n个城市排成一列，依次编号为1,2,3,...,n。一开始，这n座城市之间都没有任何交通路线，于是政府打算修建一些铁路来进行交通规划。接下来T天，每一天会进行如下操作的其中一种：
- “L x”：表示编号为 x 的城市与其左边的城市之间修建一条铁路。如果 x 左边没有城市或者已经修建了铁路，则无视该操作；
- “R x”：表示编号为 x 的城市与其右边的城市之间修建一条铁路。如果 x 右边没有城市或者已经修建了铁路，则无视该操作；
- “Q x”：表示查询 x 往左边和往右边最远能到达的城市编号。
你的任务是模拟以上操作，并对于每一条“Q x”操作，输出对应的答案。
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>


~~~txt
第一行输入两个正整数 n , T ；
接下来T行，每行输入形如题面中的其中一种。
1≤n≤10000,  1≤T≤200， 1≤x≤n
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>


~~~txt
对于每一个"Q x”操作，输出一行两个正整数，分别表示 x 往左边和往右边最远能到达的城市编号，中间用空格隔开。
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>

- 此题主要是要考虑构建连接通路的记录，由于城市都是线性分布，所以只需记录每个城市的左连接和右连接
- 以城市2为例，一开始其左右连接为【2，2】，也即左侧通往“城市2”，右侧通往“城市2”
- 同时将“L”操作和“R”操作同一按照“L”操作进行，也即将 “R-X” 视作 “L-（X+1）”，方法名为“Update”
- L和R的边界处理条件分别为 “X不为1，X不为N”
- 当处理Update函数的时候，由于已经确保了边界条件，所以只用正常处理数据即可。
  1. 利用distance数组保存连接属性，distance按照下标记录：distance\[X][0]为城市X的左连接
  2. 分别处理 distance\[flag][0] 和 distance\[flag - 1][1]为 true
- 当处理Query查询的时候，根据X，分别向左向右遍历查询到边界

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    优化
</div>

- 这道题感觉可以用dp维护两个数组left和right，分别代表每个城市最左和最右分别可以到达的地方
- 这样的设计对于update的更新会更长，但是对于query的时间会减少

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>


~~~js
const n = readInt(), T = readInt();
var distance = [];
var i;
for (i = 1; i <= n; i++) {
    distance.push([i, i]);
}
// console.log(distance);

const update = (left) => {
    // console.log("Insert Left: ", left);
    let loc = left - 1;
    distance[loc][0] = left - 1;
    distance[loc - 1][1] = left;
    // console.log(distance)
};

const query = (loc) => {
    // console.log("Query: ", loc);
    let pointer = loc;
    let min = pointer, max = pointer;
    while (distance[pointer - 1][0] != pointer) {
        pointer -= 1;
        min = pointer;
    }
    // console.log(min);
    pointer = loc;
    while (distance[pointer - 1][1] != pointer) {
        pointer += 1;
        max = pointer;
    }
    console.log(min, max);
}

var op, loc;
for (i = 0; i < T; i++) {
    let l = readline();
    [op, loc] = l.split(" ");
    if (op == 'Q') {
        query(parseInt(loc));
    } else if (op == 'L') {
        if (loc != 1) {
            update(parseInt(loc));
        }
    } else if (op == 'R') {
        if (loc != n) {
            update(parseInt(loc) + 1);
        }
    } else {
        console.log("Error OP:", op);
    }
}

~~~

