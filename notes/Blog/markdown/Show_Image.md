在博客中，为了把展示博客和文档博客区分开，在文档类博客中我把图片大小设置为主窗口的一半大小，这样有助于用户在观看的时候可以流畅的阅读文字，并且不会被图片影响太多。

在未设置图像大小的时候，在页面中的效果是这样的：

![image-20230413170900708](.\img\image-20230413170900708.png)

-----

看得出来，这样的布局容易打断读者的观看体验，所以首先我们把图片缩小到1/4：

~~~css
#content .inner img {
    box-shadow: 0 0 1em rgb(184, 187, 206);
    border-radius: 1%;
    width: 50%;
    display: block;
    margin: 0 auto;
}
~~~

这样得到了当前网页中的布局样式：

![image-20230413171057538](.\img\image-20230413171057538.png)

-----

对于整个页面稍微有了一些美观，但是会导致第二个问题，也即用户想要正常阅读图片的时候，却只能在新窗口中打开进行查看，这样对于阅读流畅性也有影响，所以我设计了第二个部分：

~~~js
$("#content").on("click", "img", function () {
    console.log("click");
    var src = $(this).attr("src");
    var img = $("<img>").attr("src", src).addClass("modal-image");
    $("body").addClass("show-modal").css("overflow", "hidden").append(img);

    img.css({
        "position": "fixed",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)"
    });
});

$("body").on("click", ".modal-image", function () {
    $(this).remove();
    $("body").removeClass("show-modal").css("overflow", "auto");
});
~~~

当用户点击某张图片的时候，在窗口中将会新出现一个灰色半透明背景，用于放置图片的预览窗口，在这个窗口中：

- 图片将按照原始比例缩放在整个显示器大小之内，用户可以详细的阅读图片。
- 外部的滚动事件将不会被执行。
- 再次点击图片的时候，这个窗口就会消失，同时回到正常的博客中。

![image-20230413171727367](.\img\image-20230413171727367.png)

-----

最后为图片放大展示添加一个过渡动画，使得整个过程显得流畅一些：

~~~css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  /* 设置较大的z-index值 */
}

.modal-image {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-in-out;
  max-width: 90%;
  max-height: 90%;
  z-index: 10000;
}
~~~

~~~js
$("#content").on("click", "img", function () {
    var src = $(this).attr("src");
    var img = $("<img>").attr("src", src).addClass("modal-image");
    $("body").addClass("show-modal").css("overflow", "hidden").append(img);

    img.css({
        "position": "fixed",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
        "opacity": 0,
        "transition": "opacity 0.3s ease-in-out"
    });

    // 将透明度设置为 1，触发过渡动画
    setTimeout(function () {
        img.css("opacity", 1);
    }, 0);
});

$("body").on("click", ".modal-image", function () {
    var img = $(this);
    img.css("opacity", 0);
    // 在过渡动画结束后再将图片移除
    setTimeout(function () {
        img.remove();
        $("body").removeClass("show-modal").css("overflow", "auto");
    }, 300);
});
~~~

