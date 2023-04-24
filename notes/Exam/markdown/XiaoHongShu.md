<div style="font-size:36px; text-indent:2em; font-weight:800; padding:0 0 1em 0">
    A 小红的数组增值 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
</div>



<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>

~~~txt
小红拿到了一个数组，她准备不断进行如下操作：
1. 若a[0]=0，则直接删除a[0]，并将数组其余的所有元素向左移动来填补空缺。
2. 否则在数组的末尾添加a[0]个a[0]-1，然后使得a[0]减1。
小红想知道，从开始进行操作直到数组为空，她一共进行了多少次操作？答案请对10^9+7取模。
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>

~~~txt
第一行输入一个正整数n，代表数组的长度。
第二行输入n个正整数a[i]，代表数组的元素。
1 <= n <= 10^5
1 <= a[i] <= 10^5
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>

~~~txt
一个整数，代表操作的次数对10^9+7取模的值。
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
找到规律，当首位是N的时候，将N转为N-1，同时在最后添加N个N-1，为了便于观察，我们可以把这些新增的放在首元素之后而非数组最后：

~~~js
[a,b,c,...,k]  => [a-1, a-1, a-1 ... a-1, b,c,... k]
				  |--- a+1 个 (a-1)  ---|
~~~

假设N - 1需要 f(n-1) 步，则N需要 (N+1) * f(n-1) + 1，多出来的一步为把N拆成N+1个N-1 ,所以得到状态转移方程：

~~~js
F(n) = (n + 1) * F(n - 1) + 1
~~~

其中F(0) = 1，所以可以直接dp得到答案。

为了防止数字过大，直接可以每次都取余，得到的结果也是一样的

~~~js
F(n) = ((n + 1) * F(n - 1) + 1) % (1e9 + 7)
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>

~~~js
const n = readInt();
const arr = readline().split(" ");

const dp = [1];
const m = 1e9 + 7;

for(let i = 1; i <= 1e5; i++){
  let value = (dp[i - 1] * (i + 1) + 1）% m;
  dp.push(value);
}

let result = 0;
arr.forEach(e => {
  result += dp[e];
})

console.log(result % m);
~~~



-----

<div style="font-size:36px; text-indent:2em; font-weight:800; padding:1em 0">
    B 小红的树上染色 <span style="color:red; float:right; margin: 0 1em 0 0">18</span>
</div>
<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>


~~~txt
小红拿到了一棵树，共有n个节点，其中的一些节点被染成了红色。
小红想知道，第k大的红色连通块的节点数是多少？
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>

~~~txt
第一行输入两个正整数n和k。
第二行输入一个长度为n的字符串，第i个字符为'R'代表i号节点被染成红色，为'W'代表未被染色。
接下来的n-1行，每行输入两个正整数u和v，代表节点u和节点v有一条边连接。
1≤k≤n≤10^5
1≤u,v≤n
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>

~~~txt
如果红色连通块的数量小于k，则输出-1。
否则输出一个正整数，代表第k大的红色连通块的节点数。（大小相同的连通块不用去重）
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>

​	这道题题干要求和携程0415的条件一致，所以可以在之前的题目的完成上进行优化，但是事实上看了别人的解答，确实DFS会比排序方便很多，主要还是前端太多人了，要不然哪个前端会要求写算法捏

​	相比于携程的connect数组记录，采用类来记录，这样对于1e5的数据规模可以减少存储成本，得到的结果再sort一下就好了

​	但是结果还是出错，后来我想到，这种做法还是错了，看来还是得老老实实用DFS哇

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>

~~~js
const n = parseInt(readInt());
const k = parseInt(readInt());
const color = readline().split("");

let connect = new Array(n + 1).fill({a: -1, b: -1});
let appear = new Array(n + 1).fill(-1);

for(let i = 0; i < n - 1; i++){
  const lines = readline().split(" ");
  const a = parseInt(lines[0]);
  const b = parseInt(lines[1]);
  appear[a] += 1;
  appear[b] += 1;
  connect[a].a == -1 ? connect[a].a = b : connect[a].b = b;
  connect[b].a == -1 ? connect[b].a = a : connect[b].b = a;
}

var start = 0, end = 0;
for(let i = 1; i <= n; i++){
  if(appear[i] == 0){
    if(start == 0){
      start = i;
    }
    else{
      end = i;
      break;
    }
  }
}

let used = new Array(n + 1).fill(false);

const seq = [];
while(start != end){
  seq.push(color[start - 1]);
  used[start] = true;
  start = used[connect[start].a] ? connect[start].b : connect[start].a;
}
seq.push(color[start - 1]);

let size = 0;
let arr = [];
for(let i = 0; i < n; i++){
  if(seq[i] == 'W'){
    if(size != 0){
      arr.push(size);
      size = 0;
    }
  }
  else{
    size += 1;
  }
}

if(size != 0){
  arr.push(size);
  size = 0;
}

arr.sort((a,b) => b - a);

if(k > arr.length){
  console.log(-1);
}
else{
  console.log(arr[k - 1]);
}
~~~

-----

<div style="font-size:36px; text-indent:2em; font-weight:800; padding:1em 0">
    C 小红的字符串权值 <span style="color:#EE0; float:right; margin: 0 1em 0 0">WA</span>
</div>


<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>

~~~txt
小红很喜欢"red"字符串，她定义一个字符串的美丽度为：该字符串包含的"red"子序列的数量。注意子序列是可以不连续的，例如"rreed"包含了4个"red"子序列，因此美丽度为4。
小红定义一个字符串的权值为：该字符串所有连续子串的美丽度之和。例如，"redd"的权值为3，因为它包含了一个"red"连续子串，美丽度为1，包含了一个"redd"连续子串，美丽度为2。其它连续子串的美丽度都为0。
小红想知道，长度为n的、仅由字符'r'、'e'、'd'构成的所有字符串（共有3^n个字符串）的权值之和是多少？答案请对10^9+7取模。
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>

~~~txt
一个正整数n
1≤n≤1000
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>

~~~txt
长度为n的、仅由字符'r'、'e'、'd'构成的所有字符串的权值之和。
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
完全没看懂到底要做什么，提出了很多概念，虽然结果可以用打表，但是看不懂就打不出来了

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>

~~~js
~
~~~

