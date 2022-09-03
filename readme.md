# JS-MINI-COMPILER
 一个迷你的js解析器

## 实现原理
编译器主要为三个阶段：解析（Parsing）、转换（Transformation）、代码生成（Code Generation）。

1. Parsing：将原代码字符串转化为抽象的代码表示，即AST（抽象语法树）。
2. Transformation：对这种抽象的表示（AST）进行操作，比如添加、删除、修改节点，也可以是以其为基础创建一个新的AST
3. Code Generation：将转换后的代码表示转换为目标代码

source code => parser => AST => transformer => new AST => generator => target code

## Parsing
解析一般分为两个阶段：词法分析、语法分析。

1. 词法分析：通过一个tokenizer将代码字符串转化为Tokens，即将字符串分割成一个个token。
   + Tokens：一组微小的对象，由多个Token组成
   + Token：描述一个语言的基本元素，每个token都有自己的类型，比如数字、字符串、标识符、关键字等。
2. 语法分析：将Tokens流转化为AST
   + AST：抽象语法树，一种深层嵌套的树形结构，描述代码的语法结构（语法的每个部分及其彼此之间的关系）。每个节点都有自己的类型，类似Token。

## Transformation
可以是对源语言的操作修改，也可以将其转为全新的语言。

转换的前提是遍历AST节点，本代码中通过travser（遍历器）和Visitor（访问者）进行遍历操作，并在钩子中进行转换操作
1. travser(ast, visitor)：遍历器，接收ast并对其进行由父到子的递归遍历
2. Visitor：tarvser的第二个参数，是个对象，内含每个类型的节点开始/结束遍历的钩子
  + enter：节点开始遍历的钩子
  + exit：节点结束遍历的钩子
  
``` typescript
export interface VisitorHook {
  enter?: (node: AstNode, parent?: AstNode) => void
  exit?: (node: AstNode, parent?: AstNode) => void
}

export interface Visitor {
  Program?: VisitorHook,
  CallExpression?: VisitorHook,
  NumberLiteral?: VisitorHook
  StringLiteral?: VisitorHook
}
```
