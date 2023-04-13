由于目前博客中所有Markdown都会一起加载进整个窗口中，当markdown数量越来越多的时候，通过网络加载的时间会越来越长，于是我们提出一个懒加载的解决方案：在默认状态下，DOM将只显示title，当用户点击title所在的DOM的时候，此时再加载某个文档的内容。同时页面本身不要使用跳转，实现类似于折叠展示的效果

首先实现文章折叠的效果，在整个文章中所有的DOM在初始的时候都是折叠状态，只展示标题和副标题，当用户点击某个文章的时候，会展开选中的文章，同时折叠其余所有文章。

虽然此时我们并没有对Markdown的网络加载进行处理，但是这是我所需要的最终文章展示形态，所以我们先进行如下的修改：

![image-20230413231821307](.\img\image-20230413231821307.png)

在进行下一步的时候遇到一个问题：

- 如果需要展开列表再进行加载的话，“每篇文章按照最后修改时间进行排序”的要求就不能实现，因为文章不会被加载，所以也就不能排序。
- 如果所有文章都提前加载一次读取修改时间的话，也不再需要分批次加载了

目前还没有找到一个比较更优的解决方案，所以仍旧保持完全加载一次的解决方案。

~~~js

    let articleElements = []; // 保存所有已加载的文章节点
    let loadedCount = 0; // 记录已经加载的文章数量

    mdList.forEach((md, index) => {
        // ... 
        
        .then(markdownContent => {
          // ...
            
          // 所有文章都已加载，对DOM进行排序
          loadedCount++;
          if (loadedCount === mdList.length) {
            // 根据修改时间排序
            articleElements.sort((a, b) => b.modifiedTime - a.modifiedTime); 

            articleElements.forEach((article, index) => {
              $("#content .inner").append(article.article)
              // 点击文章标题
              article.headerElement.click(() => {
                if (currentOpen !== null) {
                  currentOpen.mainContentElement.slideUp("fast"); // 折叠当前展开的文章
                  currentOpen.headerElement.removeClass("active");
                  currentOpen.headerElement.find(".open-tip").text("展开文章"); // 修改已展开文章的提示信息
                }
                if (currentOpen === article) { // 点击已经展开的文章
                  currentOpen = null;
                } else { // 点击未展开的文章
                  article.mainContentElement.slideDown("fast"); // 展开当前点击的文章
                  article.headerElement.addClass("active");
                  articleElements[index].headerElement.find(".open-tip").text("收起文章"); // 修改已展开文章的提示信息
                  currentOpen = article;
                }
              });

              // 添加到DOM中的默认状态只显示文章标题，点击后才会展开
              let headerElement = article.headerElement;
              let mainContentElement = article.mainContentElement;
              headerElement.addClass("clickable");
              mainContentElement.hide();

              if (index === 0) { // 第一个文章默认展开
                currentOpen = article;
                headerElement.addClass("active");
                mainContentElement.show();
              }
            });
          }
        })
        // ...
~~~

