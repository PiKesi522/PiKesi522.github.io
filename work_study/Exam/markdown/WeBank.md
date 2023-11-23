<div style="font-size:36px; text-indent:1em; font-weight:800; padding:1em 0">
    A 数组转树 <span style="color:green; float:right; margin: 0 1em 0 0"></span>
</div>




<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>

~~~txt
给定一个数组，类似于
[{id:1, parentId:null, name:'广东'},
{id:2, parentId:2, name:'深圳'}]
将其转为树的形式，其中parent == null的节点为根节点
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
答案没有给标准输出结构，设计为{id:number, name:string, children:array}的形式。

通过递归的方法，查找当前调用的函数中的id，在函数中查找所有parentId为当前id的节点，并加入children中

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>


~~~js
function transFlatToTree(array, id) {
    const children = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].parentId === id) {
            children.push(array[i]);
        }
    }
    const result = [];
    children.forEach(child => {
        result.push({
            id: child.id,
            name: child.name,
            children: transFlatToTree(array, child.id)
        })
    })
    return result;
}

const result = transFlatToTree(array, null);
console.log(result);

~~~



-----

<div style="font-size:36px; text-indent:1em; font-weight:800; padding:1em 0">
    B 字符串最长匹配 <span style="color:green; float:right; margin: 0 1em 0 0"></span>
</div>


<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>


~~~txt
给一个字符串，找到其中出现的最多的字符的次数，并输出{'a':4, 'b':4} 类似的结构
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
一次循环查找，注意处理最后的情况

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>

~~~js
const string = readLine().split("");
let max = -1;
let result = [];
let count = 0;
let pointer = null;

let i;
for(i = 0; i < string.length; i++){
    if(string[i] === pointer){
        count += 1;
    }
    else{
        if(count > max){
            max = count;
            result = [string[i]];
        }
        else if( count === max){
            result.push(string[i]);
        }
        count = 1;
        pointer = string[i];
    }
} 


if(count > max){
    max = count;
    result = [string[i]];
}
else if( count === max){
    result.push(string[i]);
}


const ans = {};

for(let i = 0; i < result.length; i++){
    arr[result[i]] = max;
}

console.log(ans);
~~~

-----

<div style="font-size:36px; text-indent:1em; font-weight:800; padding:1em 0">
    C 输出日期 <span style="color:green; float:right; margin: 0 1em 0 0"></span>
</div>

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>

~~~txt
输入两个日期，把这两个日期中的所有日期输出：
例如输入'2020-9-30 ~ 2020-10-3'
则要输出['2020-9-30','2020-10-1','2020-10-2','2020-10-3']
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
直接用模拟的方法完成，相比于判断什么时候结束，采用从A时间开始保存到B时间的年份结束；然后再从B时间开始，依次把之前得到的时间删除，得到之间的日期

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>


~~~js
const monthCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthCountLunar = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function judgeLunarYear(y) {
    let hit = false;
    if (y % 4 == 0) {
        hit = true;
        if (y % 100 == 0) {
            hit = false;
            if (y % 400 == 0) {
                hit = true;
            }
        }
    }
    return hit;
}

function solve(arr, arrBackup, yA, yB, mA, mB, dA, dB) {
    for (let i = yA; i <= yB; i++) {
        if (i == yA) {
            arrayPushRestOfThisYear(arr, yA, mA, dA);
        }
        if (i == yB) {
            arrayPushRestOfThisYear(arrBackup, yB, mB, dB);
        }
        if (i != yA && i != yB) {
            arrayPushRestOfThisYear(arr, i, 1, 1);
        }
    }
}

function arrayPushRestOfThisYear(arr, y, m, d) {
    const lunar = judgeLunarYear(y);
    const dayCount = lunar ? monthCountLunar : monthCount;

    for (let i = m; i <= 12; i++) {
        if (i == m) {
            arrayPushRestOfThisMonth(arr, y, i, d, dayCount);
        }
        else {
            arrayPushRestOfThisMonth(arr, y, i, 1, dayCount);
        }
    }
}

function arrayPushRestOfThisMonth(arr, y, m, d, dayCount) {
    const count = dayCount[m - 1];
    for (let i = d; i <= count; i++) {
        arr.push(y + "-" + m + "-" + i);
    }
}

const input = readLine().split("~");
const tA = input[0].split("-");
const tB = input[1].split("-");
const yA = tA[0], yB = tB[0], mA = tA[1], mB = tB[1], dA = tA[2], dB = tB[2];
const arr = [];
const arrBackup = []
solve(arr, arrBackup, yA, yB, mA, mB, dA, dB);
for (let i = 0; i < arrBackup.length - 1; i++) {
    arr.pop();
}
console.log(arr);
~~~

