<div style="font-size:36px; text-indent:1em; font-weight:800; padding:0 0 1em 0">
    A 游游的you矩阵 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
</div>



<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>

~~~txt
游游拿到了一个字符矩阵。她想知道有多少个2*2的子矩阵同时包含了'y'、'o'和'u'这三种字符?
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>

~~~txt
第一行输入两个正整数n和m，代表矩阵的行数和列数。
接下来的n行，每行输入一个长度为m的、仅由英文小写字母组成的字符串，代表游游拿到的矩阵。
1≤ n, m ≤10^3
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>

~~~txt
一个整数，代表同时包含了'y '、'o'和'u'三种字符的2*2的子矩阵数量。
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
以下的解答完全是按照题目意思采用的模拟做法，所以不在加以讨论

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    优化
</div>

- 尝试用二进制码对'Y''O''U'三个字进行编码，分别对应4，2，1。
- 对于n*m的矩阵，额外增加1行1列用于避免边界检测，也即martix为（n+1）\*（m+1）的大小
- martix初始化全部为0，从第1行第1列，到第n行m列为止进行输入
- 如果检测到输入为'Y''O''U'三个之一，则分别为[x,y]为右下，对‘左’‘上’‘左上’三个点分别做或运算
  1. 例如[3,4]检测到Y，则[2,3],[2,4],[3,3],[3,4]分别 |= 4
  2. 例如[2,6]检测到U，则[1,5],[1,6],[2,5],[2,6]分别 |= 1
- 最终判断每个格子内数值如果等于7，那么则判断成功

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>

~~~js
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

const judge = (a, b, c, d) => {
    if(a === 'y' || b === 'y' || c ==='y' || d === 'y'){
        if(a === 'o' || b === 'o' || c === 'o' || d === 'o'){
            if(a === 'u' || b ==='u' || c === 'u' || d === 'u'){
                return 1;
            }
        }
    }
    return 0;
}

void (async function () {
    let line = await readline();
    let tokens = line.split(" ");
    let n = parseInt(tokens[0]);
    let m = parseInt(tokens[1]);
    
    var ans = 0;
//     let lastLine = await readline();
    let array = [];
    for(let i = 0; i < n; i++){
        line = await readline();
        array.push(line.split(""));
    }
//     console.log(array);
    for(let i = 0; i < n - 1; i++){
        for(let j = 0; j < m - 1; j++){
            ans += judge(array[i][j], array[i+1][j], array[i][j + 1], array[i + 1][j + 1]);
        }
    }
    console.log(ans);
})();
~~~



-----

<div style="font-size:36px; text-indent:1em; font-weight:800; padding:1em 0">
    B 游游的最小公倍数 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
</div>
<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>


~~~txt
游游拿到了一个正整数n，她希望找到两个正整数a和b(a≤b)，使得a＋b = n，且a和b的lcm(最小公倍数)尽可能大。你能帮帮她吗?
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>

~~~txt
第一行输入一个正整数t，代表询问的次数。对于每组询问，输入一行一个正整数n。
对于50%的数据，保证t=1
对于另外20%的数据,1< t <10; 2< n ≤10^4
对于100%的数据，1< t <10^5; 2< n ≤10^13
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>

~~~txt
共输出t行。对于每组询问，输出一行两个正整数α和b，用空格隔开。
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
- 这道题和把 N 拆成 A + B 使得 A * B 最大的问题类似，不同之处在于还需要除以一个GCD(A,B)
- 所以基本思路也是直接把N对半拆分，然后依次减少，向下查询是否有GCD存在：
  1. 如果没有GCD存在了，说明他的最大可能值也就到此了，不用再往下查找了
  2. 如果还有GCD存在， 说明可能需要再往下查找，保留历史最大值MAX用于比较

#### *由于此题目的特殊性，我可以给出结论：所有答案的解只有三种存在的可能性*

1. 当N为奇数的时候，答案只为：A，A + 1
2. 当N为偶数的时候，答案只为：A - 1， A + 1；当 A - 1 和 A + 1 都为偶数的时候，则答案为 A - 2，A + 2

#### 以下给出证明

~~~txt
A 和 A + 1只相差1，假设A 和 A + 1存在非1的最小公约数， 则有：
A     = n * a
A + 1 = n * b
可以推出： n * (b - a) = 1
然而 n > 1, 则推得0 < (b - a) < 1，与 a,b 均为正整数条件矛盾
推出 n = 1, 也即 A 和 A + 1 的最小公约数只为 1

同理可推得 A - 1 和 A + 1的最小公约数可能为2， 所以当两者都为偶数的时候，采用A - 2, A + 2
假设 n > 1, 但 n != 2和4
A - 2 = n * a
A + 2 = n * b
可以推出： n * (b - a) = 4
若 n = 3, 则推得b - a = 4 / 3，与 a,b 均为正整数条件矛盾
若 n > 4, 则推得0 < (b - a) < 1，与 a,b 均为正整数条件矛盾
推出 n = 1, 也即 A - 2 和 A + 2 的最小公约数只为 1
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>

~~~js
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const t = parseInt(await readline());
    for(let i = 0; i < t; i++){
        let n = parseInt(await readline());
        if( n == 2){
            console.log(1, 1);
            continue;
        }
        let left, right;
        if((n % 2) == 1){
            left = (n - 1)/2;
            right = (n - 1)/2 + 1;
        }
        else{
            left = n/2 - 1;
            right = n/2 + 1;
            if((left % 2) == 0){
                left -= 1;
                right += 1;
            }
        }
        console.log(left, right);
    }
}()
~~~

-----

<div style="font-size:36px; text-indent:1em; font-weight:800; padding:1em 0">
    C 游游的二进制数 <span style="color:#EE0; float:right; margin: 0 1em 0 0">WA</span>
</div>

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>

~~~txt
游游拿到了一棵树，共有n个节点，每个节点都有一个权值:0或者1。这样，每条路径就代表了一个二进制数。
游游想知道，有多少条路径代表的二进制数在[l, r]区间范围内?
(请注意:路径长度至少为1，例如，节点3到节点3虽然有一个权值，但并不是合法路径! )
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>

~~~txt
第一行输入三个正整数n,l,r，用空格隔开。
第二行输入一个长度为0的01串，第i个字符代表i号节点的权值。
接下来的n―1行，每行输入两个正整数u和v，代表u号节点和v号节点有一条边连接。
1≤ n ≤10^3
1≤ u,v ≤n
1≤ l ≤ r ≤ 10^14
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
- 这道题存在一个隐藏条件，利用这个隐藏条件可以把这个问题给简化
- 此图中只有n个节点，同时输入只有n行，其中第一行是节点的值的输入，剩下n-1行才是边的输入
- 由于所有的节点都会被连接，不会存在离散点，所以n-1条边是刚好够把所有节点连接起来的数目
- 所以虽然题干中写的是树，但是实际上可以转为双向链表来进行表示
- 关于节点和链接的记录（***这道题就错在这里了，考试的时候这一部分没有写正确导致正确字符串没解析出来*）**：
  1. 首先用一个appear数组记录每个节点的出现次数，初始为0，每次出现+1
  2. 可以用类来记录每个节点，属性分别为number，link1，link2
  3. 但是由于number本身是递增的，所以可以用数组connect进行记录，link1和link2也只需要转为长度为2的数组，默认为-1。当出现节点名称的时候，对其进行记录
  4. 例如 ”1 4“ 则 connect\[1][0] = 4; connect\[4][0] = 1
  5. 在输入完成后，根据appear找到起点和终点，选一个位置开始查找，同时创建一个used数组记录以及遍历过的位置，以及result来表示链接串
    1. 从start开始，访问connect\[start][0]，同时将used[start] = true; start = connect\[start][0]; result.push(start);
    2. 如果connect\[start][0]在used中已经为true了，那么采用connect\[start][1]
    3. 不断重复，直到start == end，退出循环
  6. 此时result已经正确的表示节点串了，按照之前输入的节点数值，可以给出正确的01顺序，记录为seq
  7. 进入下一步处理函数check，由于节点串可以反向，所以需要运算两次
  8. **结果为check(l, r, seq) + check(l, r, seq.reverse());**
- Check的函数作用主要是获得有多少个符合范围的二进制串
- 为了加快查找速度，我们可以进行一步剪枝条操作
  1. 计算左边界的最小长度串，例如 4 = ‘100’ 则下一步的窗口可以从大小为3开始，而不是2
  2. *其实右边界也是可以剪枝的，但是这样的做法涉及到滑动窗口或者是DP，所以没有做*
- 然后根据窗口大小，从小到大获取seq数组中窗口内的数值转为十进制的结果，然后判断是否在窗口内判断返回

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>

~~~js
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

const getValue = (loc, size, array) => {
    var result = parseInt(array[loc]);
    for(let i = 1; i < size; i++){
        result *= 2;
        result += parseInt(array[loc + i]);
    }
//     console.log("[" + loc, (size + loc) + "]:" + result);
    return result;
}

const getSize = (s) => {
    let result = 0;
    while(s != 0){
        s = parseInt(s / 2);
        result ++;
    }
    return result;
}

const check = (l, r, seq) => {
    var result = 0;
    const minSize = Math.max(getSize(l), 2);
//     const maxSize = getSize(r);
//     console.log(minSize, seq);
    let size;
    for(size = minSize; size <= seq.length; size++){
//         console.log("size:" + size);
        for(let i = 0; i <= (seq.length - size); i++){
            let value = getValue(i, size, seq);
            if(l <= value && value <= r){
                result += 1;
            }
        }
    }
//     console.log("result:" + result);
    return result;
}

void (async function () {
    let line = await readline();
    let tokens = line.split(" ");
    let n = parseInt(tokens[0]);
    let l = parseInt(tokens[1]);
    let r = parseInt(tokens[2]);
//     console.log(n, l, r);
    
    var value = await readline();
    let apper_array = [], connect_array = [];
    for(let i = 0; i <= n; i++){
        apper_array.push(-1);
        let temp_array = [];
        for(let j = 0; j <= n; j++){
            temp_array.push(0);
        }
        connect_array.push(temp_array);
    }
//     console.log(connect_array);
//     console.log(value);
    
    let a,b;
    var ans = 0;
    for (var i = 0; i < n - 1; i++) {
        lines = (await readline()).split(" ");
//         console.log(lines);
        a = parseInt(lines[0]);
        b = parseInt(lines[1]);
        
        apper_array[a] += 1;
        apper_array[b] += 1;
        connect_array[a][b] = 1;
        connect_array[b][a] = 1;
    }    

    var start = 0, end = 0;;
    for(let i = 1; i <= n; i++){
        if(apper_array[i] == 0 && start == 0){
            start = i;
        }
        else if(apper_array[i] == 0 && end == 0){
            end = i;
            break;
        }
    }
    
    let used = [];
    for(let i = 0; i <= n; i++){
        used.push(0);
    }
    const seq = [];
    while(start != end){
        seq.push(value[start - 1]);
        used[start] = 1;
        for(let i = 1; i <= n; i++){
            if(connect_array[start][i] == 1 && used[i] == 0){
                start = i;
            }
        }
    }
    ans += check(l, r, seq);
    ans += check(l ,r, seq.reverse());
    console.log(ans);
})();

~~~

