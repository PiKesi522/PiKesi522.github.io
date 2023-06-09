<center><h2>
</center>


在博客中，左边框栏sidebar是一个单独的HTML文档，由于所有界面都需要展示sidebar，所以每个html中都需要有加载sidebar的方法(loadSidebar.js)。可是每次切换页面的时候，如果能够通过cache来减少每次切换界面加载的资源数量，就可以对整个访问速度有一些优化。

​		对于网页缓存，有SessionStorage，LocalStorage，Cookies三种解决方法。

​		在此，我们采用LocalStorage的方法来缓存sidebar.html:

~~~js
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = localStorage.getItem('sidebar');
  if (sidebar) {
    document.getElementById('sidebar').innerHTML = sidebar;
  } else {
    fetch('/sidebar.html')
      .then(response => response.text())
      .then(data => {
        localStorage.setItem('sidebar', data);
        document.getElementById('sidebar').innerHTML = data;
      });
  }
});
~~~


- 当页面在加载完成的时候，通过“localStorage.getItem”来查找是否保存了siderbar.html
- 如果找到了，直接加载cache里的innerHTML
- 如果没找到，则使用fetch进行加载

------

在“开发者视图”中，我们可以看到结果：

<img style="text-align: center" src="./img/image-20230412202325492.png" alt="image-20230412202325492" style="zoom: 25%;" />

<div style="text-align: center; font-size:12px">
    使用了LocalStorage的网络流
</div>
<hr>


<img style="text-align: center" src="./img/image-20230412202601358.png" alt="image-20230412202601358" style="zoom:25%;" />

<div style="text-align: center; font-size:12px">
    没使用LocalStorage的网络流
</div>
<hr>



上面使用LocalStorage的网络流相较于下方少了一个请求数量，说明确实存在了优化。



------

我们可以看到在网络流中，还都加载了jquery.js，util.js等外部js，那是否可以通过类似LocalStorage的方法实现性能优化呢？

实现是可以实现的，但是由于LocalStorage本身的大小会限制在5~10MB左右，所以把太多外部Blob文件放在cache中并不是一个明智的选择，可能反而会降低解析效率。