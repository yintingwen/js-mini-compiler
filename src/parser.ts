import { Token } from "./tokenizer"

type AstNodeType = 'Program' | 'CallExpression' | 'NumberLiteral' | 'StringLiteral'

interface AstNode { 
  type: AstNodeType;
  value?: string;
  params?: AstNode[];
  body?: AstNode[];
}

interface AstRootNode extends AstNode {
  type: 'Program';
  body: AstNode[];
}

interface AstNumberNode extends AstNode {
  type: 'NumberLiteral';
}

interface AstStringNode extends AstNode {
  type: 'StringLiteral';
}

interface AstCallExpression extends AstNode {
  params: AstNode[];
}

export default function parser (tokens: Token[]): AstRootNode {
  const ast = createRootNode()
  let current = 0
  let token: Token
  
  while (current < tokens.length) {
    token = tokens[current]

    if (token.type === 'number') {
      ast.body.push(createNumberNode(token.value))
    }

    current++
  }

  return ast
}

export function parserCallExpression (tokens: Token[]): AstNode {
  const ast: AstCallExpression = {
    type: 'CallExpression',
    params: [],
  }
  let current = 0
  let token: Token

  while (current < tokens.length) {
    token = tokens[current]

    if (token.type === 'paren' && token.value === '(') {
      current++
      continue
    }

    if (token.type === 'paren' && token.value === ')') {
      break
    }

    if (token.type === 'name') {
      ast.params.push(createStringNode(token.value))
    }
    
    current++
  }
  
  return ast
}

export function createRootNode (body: AstNode[] = []): AstRootNode {
  return {
    type: 'Program',
    body
  }
}

export function createNumberNode (value: string): AstNumberNode {
  return {
    type: 'NumberLiteral',
    value
  }
}

export function createStringNode (value: string): AstStringNode {
  return {
    type: 'StringLiteral',
    value
  }
}