<div style="font-size:36px; text-indent:2em; font-weight:800; padding:1em 0">
    A 字符串前缀 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
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

T

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



-----

<div style="font-size:36px; text-indent:2em; font-weight:800; padding:1em 0">
    B 交通规划 <span style="color:red; float:right; margin: 0 1em 0 0">81</span>
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

T

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

