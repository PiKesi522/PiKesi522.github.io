在博客中，由于笔记中的HTML都是直接从文件夹下的Markdown文件直接读取源码进行解析的，所以会存在Typora中对于代码块以及公式块的CSS无法在HTML中展示，导致网页变得不美观。

![image-20230413172744240](.\img\image-20230413172744240.png)

​	因此我们需要通过载入Typora的CSS或者是其他CSS库来美观代码块，这里我尝试多次询问GPT给出解决方法，但是GPT好像不是很能够完全明白我的意思，所以在此需要拆开分析一下整个HTML中DOM的结构：

- 首先使用jQuery来尝试分析：在markdown文件中没有设定一个html标签的时候，代码块是使用“\~~~”进行封装的，那么jQuery在进行HTML转化的时候，是否会添加一个代码块标签呢？
- 幸运的是，在解析markdown的时候，会自动添加一个code标签，虽然我们还不能直接使用这个标签，但是帮我们省略了查找代码块的麻烦。

![image-20230413193608674](.\img\image-20230413193608674.png)

- 并且这个code的标签中还包含了两个class分别为"语言"和"language-语言"
- 所以我们可以直接在CSS中修改code标签的样式，用于美化代码块

~~~css
code {
    font-family: Consolas, monospace;
    font-size: 14px;
    color: #333;
    line-height: 1.5;

    display: block;
    background-color:#f5f5f5;
    margin: 3em;
}
~~~

-----

目前只是将所有的代码块和一般的html区别开来，还需要按照代码的语言，各自对其进行美化：

