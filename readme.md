# JS-MINI-COMPILER
 一个迷你的js解析器

## 实现原理
编译器主要为三个阶段：解析（Parsing）、转换（Transformation）、代码生成（Code Generation）。

1. Parsing：将原代码字符串转化为抽象的代码表示，即AST（抽象语法树）。
2. Transformation：对这种抽象的表示（AST）进行操作，比如添加、删除、修改节点。
3. Code Generation：将转换后的代码表示转换为目标代码

source code => parser => AST => transformer => new AST => generator => target code

## Parsing
解析一般分为两个阶段：词法分析、语法分析。

1. 词法分析：通过一个tokenizer将代码字符串转化为Tokens，即将字符串分割成一个个token。
   + Tokens：一组微小的对象，由多个Token组成
   + Token：描述一个语言的基本元素，每个token都有自己的类型，比如数字、字符串、标识符、关键字等。
2. 语法分析：将Tokens流转化为AST
   + AST：抽象语法树，一种深层嵌套的树形结构，描述代码的语法结构（语法的每个部分及其彼此之间的关系）。每个节点都有自己的类型，类似Token。