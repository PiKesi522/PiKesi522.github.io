### 理解PL0编译器

​	一个CX程序和PL0的编译过程大致类似，主要是一些保留关键词和拓展关键词语的差异。

​	在PL0中，有一个关键点，就是所有对于sym符号的解析过程一旦结束（**也即当前sym一旦被解析，还未到下一步处理的时候**），就会通过getsym方法准备好下一个sym。

------

### PL0分析主流程

![image-20230517112137589](.\img\image-20230517112137589.png)

​	一个程序会直接通往block，所有的处理程序都会在【**block**】中进行处理，但是在正式进入到block前，我们还需要首先初始化【**init**】PL0编译器

-----

#### 在init中，主要对以下内容进行了初始化：

- **ssym**（single sym：单字符保留字）：例如‘+’，‘-’，‘=’这些关键词，我们将其对应的sym号写入ssym中，同时对于一些没有保留的单字，例如'a'，'$'等，将其视作nul
- **wsym**（word sym：字符保留字）：例如‘const’，‘if’等关键词，首先将其写入word进行记录，然后将其对应的保留字符号写入wsym。（在具体使用的时候，获得一个sym，先从word里面判断是否是保留字，然后从wsym获得这个保留字的处理方法）

1. **为什么不把ssym也写入wsym中合并？**我认为是wsym是基于字符串进行查找到的，而ssym本身只是一个char，为了避免混淆，所以分开写
2. **为什么ssym没有wsym一样用word对其进行记录，使得其使用了256个大小的数组进行存储？**我认为ssym本身就可以通过ASCII码进行对应Hash查找，所以不需要再进一步对其建立查找字典，通过空间换时间

​	最终，在init中，我们对于PL0编译器中的保留词进行了初始化，之后如果我们需要通过保留词进行函数处理的话，也只用ssym或者wsym的结果进行对应查找处理即可。

-----

#### 对于block，其只有三个路径：

1. 定义const常量，将使用constsym作为const关键字的保留字符
2. 定义var变量，将使用varsym作为var关键字的保留字符
3. 进行函数处理，将进入到次级函数域中，类似于一个”{}“块

其中对于const和var两个函数，其处理方法如下：

- 首先判断变量声明的名称是否可以作为变量名（冲突检测+保留变量检测）

1. 对于const，必须在初始化的时候就将其给定一个值【**constdeclaration**】	
2. 对于var，PL0的规则要求其在定义的时候，不能初始化值【**vardeclaration**】

- 将定义的变量左值写入符号表中【**enter**】

当上述三个步骤结束之后，都会同一进入到语法分析处理环节【**statement**】

![image-20230517112255094](.\img\image-20230517112255094.png)

-------

#### 在statement中，对sym进行处理：

​	首先要判端sym是什么类型的数据，由于PL0的特性，在上述var或const声明之后，sym会自动读取到下一个token

![image-20230517095337502](.\img\image-20230517095337502.png)

1.  **ident**：作用是给一个**在符号表中存在的符号赋值**。如果不存在，或者此符号不是var都会报错。进入到【**expression**】

   ~~~c
   if (sym == ident) /* 准备按照赋值语句处理 */
   {
       i = position(id, *ptx); /* 查找标识符在符号表中的位置 */
       if (i == 0) /* 标识符未声明 */{}
       else
       {
           if (table[i].kind != variable) 
               // 找到的变量名应该是var才能进行赋值，const和procedure都不行
           {
               error(12); /* 赋值语句中，赋值号左部标识符应该是变量 */
               i = 0;
           }
           else
           {
               getsym();
               if (sym == becomes)
               else /* 没有检测到赋值符号 */
               expression(ptx); /* 处理赋值符号右侧表达式 */
           }
       }
   }
   ~~~

2. **read**：从符号表中读取多个值

   ~~~c
   if (sym == readsym) /* 准备按照read语句处理 */
   {
       getsym();
       if (sym != lparen)/* 格式错误，应是左括号 */ {}
       else
       {
           do
           {
               getsym();
               if (sym == ident)
                   i = position(id, *ptx); /* 查找要读的变量 */
               else 
                   i = 0;
               if (i == 0)
                   error(35); /* read语句括号中的标识符应该是声明过的变量 */
               getsym();
           } while (sym == comma); /* 一条read语句可读多个变量 */
       }
   
       if (sym != rparen)/* 格式错误，应是右括号 */{}
       else{}
   }
   ~~~

3. **write**：向符号表写入多个值

   ~~~c
   if (sym == writesym) /* 准备按照write语句处理 */
   {
       getsym();
       if (sym == lparen)
       {
           do
           {
               getsym();
               expression(ptx);	/* 调用表达式处理 */
           } while (sym == comma); /* 一条write可输出多个变量的值 */
   
           if (sym != rparen) /* 格式错误，应是右括号 */
           else
       }
   }
   ~~~

4. **call**：调用函数，后续关键词必须是procudure

   ~~~c
   if (sym == callsym) /* 准备按照call语句处理 */
   {
       getsym();
       if (sym != ident)/* call后应为标识符 */
       else
       {
           i = position(id, *ptx);
           if (i == 0) /* 过程名未找到 */
           else if (table[i].kind != procedure)/* call后标识符类型应为过程 */
           getsym();
       }
   }
   ~~~

5. **if**：后续【**condition**】判断，需要跟then

   ~~~c
   if (sym == ifsym) /* 准备按照if语句处理 */
   {
       getsym();
       condition(ptx); /* 调用条件处理 */
       if (sym == thensym)
       else /* 缺少then */
       statement(ptx); /* 处理then后的语句 */
   }
   ~~~

6. **begin**：后续”{}“包围，需要跟end

   ~~~c
   if (sym == beginsym) /* 准备按照复合语句处理 */
   {
       getsym();
       statement(ptx); /* 对begin与end之间的语句进行分析处理 */
       /* 如果分析完一句后遇到语句开始符或分号，则循环分析下一句语句 */
       while (sym == semicolon)
       {
           getsym();
           statement(ptx);
       }
       if (sym == endsym)
       {
           getsym();
       }
       else /* 缺少end */
   }
   ~~~

7. **while**：后续【**condition**】判断，需要跟do

   ~~~c
   if (sym == whilesym) /* 准备按照while语句处理 */
   {
       getsym();
       condition(ptx); /* 调用条件处理 */
       if (sym == dosym)
       {
           getsym();
       }
       else /* 缺少do */
       statement(ptx); /* 循环体 */
   }
   ~~~

   

-----

### 词法分析

​	getsym和getch这两个函数构成了PL0编译器的词法分析的方法，值得注意的是，这两个函数本身并不返回任何值，而是在函数调用的过程当中，对于全局变量 ch 和 sym 两者的修改，getsym是由getch所依赖实现的，所以先从getch进行分析：

~~~c
/*
 * 过滤空格，读取一个字符
 * 每次读一行，存入line缓冲区，line被getsym取空后再读一行
 * 被函数getsym调用
 */
void getch()
{
	if (cc == ll) /* 判断缓冲区中是否有字符，若无字符，则读入下一行字符到缓冲区中 */
	{
		if (feof(fin))
		// 正常文件结束并不会遇到EOF，而是在更上层的处理函数中解决，所以这里显示不完整
		{
			printf("Program incomplete!\n");
			exit(1);
		}
		ll = 0;
		cc = 0;
		ch = ' ';
		while (ch != 10)
		{
			if (EOF == fscanf(fin, "%c", &ch))
			{
				line[ll] = 0;
				break;
			}

			printf("%c", ch);
			fprintf(foutput, "%c", ch);
			line[ll] = ch;
			ll++;
		}
	}
	ch = line[cc];
	cc++;
}
~~~

​	在getch之中，其把FILE视作一个二位数组，其中每一行作为数组行的起始位置，在此处PL0将使用三个变量：

- **line**：表示当前所读取的FILE的某一行，将这一行的内容暂时保存在line中，最大长度为81个字
- **ll（line length）**：表示编译器目前存储的**line**的长度
- **cc**：表示编译器目前正读取到**line**的哪个位置

·对于这个函数，我们不难发现其主要的语法就是：

~~~c
ch = line[cc++];;
~~~

将当前**缓存的line中指针cc指向的内容 赋值给 ch**，只有当cc==ll时候（指针指向了最后一个单词），我们认为这一行已经阅读完毕，就转向下一行

getsym的函数可以抽象成以下方法：

~~~c
/*
 * 词法分析，获取一个符号
 * 通过getsym的调用，可以确定一个当前正在获取的 词法sym 之后将其视作一个整体使用
 */
void getsym()
{
	int i, j, k;

	while (ch == ' ' || ch == 10 || ch == 9) /* 过滤空格、换行和制表符 */

	if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) /* 当前的单词是标识符或是保留字 */
	{
		// 先把一个完整的词法块分割下来
		...
            
		// 把这个词法放到id中，表示目前的正在处理的关键词ident
		strcpy(id, a);

		/* 搜索当前单词是否为保留字，使用二分法查找 */
		i = 0;
		j = norw - 1;
		do
		{
			k = (i + j) / 2;
			if (strcmp(id, word[k]) <= 0)
				j = k - 1;
			if (strcmp(id, word[k]) >= 0)
				i = k + 1;
		} while (i <= j);

		// 根据ident的搜索结果，来确认sym是从wsym找还是table找
		if (i - 1 > j) /* 当前的单词是保留字 */
			sym = wsym[k];
		else /* 当前的单词是标识符 */
			sym = ident;
	}
	else
	{
		if (ch >= '0' && ch <= '9') /* 当前的单词是数字 */
		{
			/* 获取数字的值 */
			if (k > nmax) /* 数字位数太多 */
				error(30);
		}
		else 
		{
			// 以下三个':=','<=','>=' 三者都是多字符符号，所以不能合并到最里面的ssym[ch]中获取
			if (ch == ':') /* 检测赋值符号 */
				// 判断 :=
			else if (ch == '<') /* 检测小于或小于等于符号 */
                // 判断 <=
            else if (ch == '>') /* 检测大于或大于等于符号 */
                // 判断 >=
            else
            {
                sym = ssym[ch]; /* 当符号不满足上述条件时，全部按照单字符符号处理 */
                if (sym != period)
                    // period是语法结束符号，对于未设置的单字符符号，在前面都设置了nul
                    // 对于结束符号'.', ch就不再往下读了
                    // 如果是非结束符号，例如'+''-'那么我们还需要读取一个下一次备用
                    getch();
            }
		}
	}
}
~~~

在getsym中，将当前切片下来的部分保留为token，对于这个token分析为三种不同的**sym**：

1. 保留字，变量（**ident**）：这些token由字母开头，获得后sym分别在wsym和word中查找
2. 数字（**number**）：由数字开头，需要控制大小
3. 操作符：依次比较即可

------

### 写入符号表

对于在程序中生成的变量名，我们需要将其记录在符号表中，便于之后查看，其中符号表结构如下：

~~~c
/* 符号表中的类型 */
enum object
{
	constant,
	variable,
	procedure,
};

/* 符号表结构 */
struct tablestruct
{
	char name[al];	  /* 名字 */
	enum object kind; /* 类型：const，var或procedure */
};

struct tablestruct table[txmax]; /* 符号表 */
~~~

对于符号表包括两个操作：

1. 插入新的符号【**enter**】：通过***tx**往后插入新的符号
2. 查找现有的符号【**position**】：从**tx**往前查找，不存在返回0

-----

### 出错分析

------

### 表达式处理

PL0中表达式处理的步骤为 factor -- term -- expression，所有外部函数都只会通过expression完成需求，而expression内部才会使用 term，同样只有term内部会使用factor，但是factor会通过expression循环调用

![image-20230517121137449](.\img\image-20230517121137449.png)





