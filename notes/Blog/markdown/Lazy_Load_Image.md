当博客被部署在github pages上时候，访问博客的时候速度相较于本地有明显的延迟，此时查看网络流会发现，占用最多网络时间的是图片的加载时间：

![image-20230414144939581](.\img\image-20230414144939581.png)

不管是大小还是加载时间都远超过Markdown的加载时间，所以需要提供方法来优化图片的加载。

### 使用懒加载，当图片出现在窗口的时候在对其进行加载。

​	在解析markdown的时候，对所有图片添加一个“loading=‘lazy'”的属性，这是使用了浏览器原生的懒加载属性“native lazy-loading”来实现图片懒加载：

~~~js
// ...
const htmlContent = converter.makeHtml(markdownContent);
const processedHtmlContent = htmlContent.replace(/<img/g, '<img loading="lazy"');
$("#" + md.filename + "-content").html(processedHtmlContent);
// ...
~~~



可以看到图片在一开始并不会被完全加载，只会加载其中的一部分：

![image-20230414162707518](.\img\image-20230414162707518.png)

而不同文章的图片也只有在第一次被展开以后才会加载：

![image-20230414162827248](.\img\image-20230414162827248.png)

可以看到图片被分段加载，这样确实减少了网页跳转后初次加载的网络流压力。

