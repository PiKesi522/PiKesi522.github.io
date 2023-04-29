<div style="font-size:36px; text-indent:1em; font-weight:800; padding:0 0 1em 0">
    A 矩阵构造 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
</div>


<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>
~~~txt
构造一个n行m列的01矩阵，满足恰好有k个大小为2的连通块，以及n*m - 2*k个大小为1的连通块
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>
~~~txt
三个整数n, m, k
1 <= n,m <= 500
1 <= k <= (n * m) / 2
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>
~~~txt
如果无解，请输出-1；可能有多个满足的解，只要输出一个即可
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
按照题意可知，题目要求其实就是把一个n*m的矩阵，分成只有2格或1格连通的部分。然而其问题在于2连通的区域会对周围产生影响，也即如果存在一个 XX（代表‘11’）的区域，其上方和下方都需要是 OO（代表‘00’）用于保证只有2连通块。只有左右两边可以是单独的连通块。

所以根据上方描述，我们可以知道，控制K的个数，需要把 2 连通块放置在矩阵的边缘，为了便于计算，可以归纳为两种方案：① 横着2格，竖排放在最左侧；②竖着2格，横着排放在最上方。而且必须需要把一整层排放满才能控制 2 连通块的数量。

得到方法后，代码逻辑不是很麻烦：

- 只要判断K是不是 n 或者 m 的整数倍即可判断是否有解
- 如果是 n 的倍数，那么把 K 横着放在左边
- 如果是 m 的倍数，那么把 K 竖着放在上面

~~~
 横放		  竖放
001101		10101
110010		10101
001101		01010
~~~



接下来只要考虑如何正确的输出数组即可，这里不多赘述

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>
~~~js
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    let input = await readline();
    input = input.split(" ");
    const n = parseInt(input[0]), m = parseInt(input[1]), k = parseInt(input[2]);
    if(k % n === 0){
        const times = parseInt(k / n);
        for(let i = 0; i < n; i++){
            let sign = (i % 2 === 0) ? 1 : 0;
            let line = '';
            let j;
            for(j = 0; j < times; j++){
                line += sign;
                line += sign;
                sign = 1 - sign;
            }
            for(j = times * 2; j < m; j++){
                line += sign;
                sign = 1- sign;
            }
            console.log(line);
        }
    }
    else if(k % m === 0){
        const times = parseInt(k / m);
        let i;
        let lastsign = 1;
        for(i = 0; i < times; i++){
            let sign = lastsign;
            let line = '';
            for(let j = 0; j < m; j++){
                line += sign;
                sign = 1 - sign;
            }
            console.log(line);
            console.log(line);
            lastsign = 1 - lastsign;
        }
        for(i = times * 2; i < n; i++){
            let sign = lastsign;
            let line = '';
            for(let j = 0; j < m; j++){
                line += sign;
                sign = 1 - sign;
            }
            console.log(line);
            lastsign = 1 - lastsign;
        }
    }
    else{
        console.log(-1);
    }
}()
~~~



-----

<div style="font-size:36px; text-indent:1em; font-weight:800; padding:1em 0">
    B 连续长城子数组 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
</div>




<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>


~~~txt
定义一个数组是长城，当且仅当对于每个i，当下标合法时，有a[i-1] != a[i], a[i-2] = a[i]
例如[3,5,3,5,3]和[1,2]，而[1,3,2,1]和[2,2,2]则不是长城，现在给定一个数组，请你求出连续长城子数组的数量
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>


~~~txt
第一行输入一个正整数n表示数组大小，第二行输入n个正整数a[i]，代表数组的元素，1 <= n <= 2*1e5, 1 <= a[i] <= 1e9
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>


~~~txt
输出一个数字，表示数组数量
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
这道题逻辑不难，主要是如何进行优化减少处理量。

假设从某一个位置Head开始进行判断，不断往右拉长Tail，当Tail指向的数字使得整个数组不再为长城数组（或是Tail到达数组最右），就结束这一轮的判断。将Head右移，同时把Tail归回到Head的位置。

进行判断的长城数组的方法也很简单：计算Tail和Head之间的个数差异，为偶数则判断是否和Head相等，为奇数则判断是否和Head + 1相等。每成功一次，就将结果记录 +1，直到最后返回整个数字。

第一次的方案导致代码超时，所以需要优化。

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    优化
</div>
上述的方案在右侧完成之后直接把左侧的数据全部清空了，留下的信息也被丢弃了，所以优化的方案需要把左侧的信息也利用起来。

在此我使用滑动窗口进行处理，而且不再是一次判断成功增加一次计数，而是判断失败一次把长度整个增加一次。

建立快慢指针Head，Tail。Head和Tail之间的数组一定是长城数组，Tail右移一位，按照上方的判断方法进行判断，如果成功，则Tail继续移动；如果失败，则把（Tail - 1） - Head的长度加入结果Result中【这里和上方一样，从Head出发，到（Tail - 1）结束，每个从Head开始的子数组都是长城数组】，把Head右移一位【注意这里并没有接纳Tail的成功，而是再次判断现在是否是长城数组】，直到Tail到达最右侧。此时把Head后数组长度加进去即可。

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>


~~~js

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const n = parseInt(await readline());
    const array = (await readline()).split(" ");
    var result = 0;
    let i = 0, j = 0;
    while(j < array.length){
        if(j - i > 1){
            if(array[j] === array[i + ((j - i) % 2)]){
                j ++;
            }
            else{
                result += j - i;
                i ++;
            }
        }        
        else if(j - i === 1){
            if(array[i] === array[j]){
                result += j - i;
                i ++;
            }else{
                j ++;
            }
        }
        else if(j === i){
            j ++;
        }
    }
    const diff = j - i;
    result += (1 + diff) * diff / 2;
    console.log(result);
}()
~~~

