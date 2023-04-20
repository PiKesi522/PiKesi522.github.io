<div style="font-size:36px; text-indent:2em; font-weight:800; padding:0 0 1em 0">
    A 前端编程题 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
</div>

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>

~~~txt
编写一个函数
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>

~~~txt
入参为大于0的整型数据【输入5】
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>

~~~txt
出参为一个数组【输出[0,3,8,15,24]】
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
完全没有任何解释的题目，让人摸不着头脑到底是要干什么。虽然放在编程题里面，但是居然是考找规律，无语...

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>

~~~js
/**
 * @param n int整型 
 * @return int整型一维数组
 */
function fn( n ) {
    // write code here
    const result = [];
    for(let i = 0; i < n; i++){
        result.push(i * (i + 2));
    }
    return result;
}
module.exports = {
    fn : fn
};
~~~



-----

<div style="font-size:36px; text-indent:2em; font-weight:800; padding:1em 0">
    B 地区数据处理 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
</div>
<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>


~~~txt
将地理数据处理为不带'省'字的数组数据
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>

~~~txt
[""广东省""，"广西",湖北省","湖南省","北京"","吉林省""]
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>

~~~txt
[""广东"，""广西，""湖北""，"湖南",”北京","吉林"]
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
无语*2

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>

~~~js
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    var n = await readline();
    var ans = 0;
    n = n.slice(1, n.length-1).split(",");
    const result = [];
    n.forEach(e => {
        e = e.slice(1, e.length - 1);
        let t = '"' + e.split("省")[0] + '"';
        result.push(t);
    })
    console.log('[' + result.toString() + ']');
}()
~~~

-----

<div style="font-size:36px; text-indent:2em; font-weight:800; padding:1em 0">
    C 数组去重 <span style="color:green; float:right; margin: 0 1em 0 0">AC</span>
</div>


<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    题目描述
</div>

~~~txt
假设有数组，以name为唯一值作去重，生成新的数组
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输入
</div>

~~~txt
数组
~~~

<div style="font-size:24px; text-indent:1em; color:black; font-weight:600">
    输出
</div>

~~~txt
返回非重数组
~~~

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0 1em 0">
    思路
</div>
无语*3

<div style="font-size:24px; text-indent:1em; font-weight:600; padding: 1em 0  0 0">
    解答
</div>


~~~js
const readline = require("readline");

function sortAndUniqJsonArray(inJson) {
    const dict = [];
    inJson = inJson.filter(e => {
        if(dict.indexOf(e.name) != -1){
            return false;
        }
        dict.push(e.name);
        return true;
    })
    return inJson;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {    
  const inJson = JSON.parse(line);
  outJson = sortAndUniqJsonArray(inJson);
  console.log(JSON.stringify(outJson));
});
~~~

