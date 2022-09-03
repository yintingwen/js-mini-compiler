import { Token } from "./tokenizer"

export type AstNodeType = 'Program' | 'CallExpression' | 'NumberLiteral' | 'StringLiteral'

export interface AstNode {
  type: AstNodeType;
  name?: string;
  value?: string;
  params?: AstNode[];
  body?: AstNode[];
  _context?: any[];
}

export interface AstRootNode extends AstNode {
  type: 'Program';
  body: AstNode[];
}

export interface AstNumberNode extends AstNode {
  type: 'NumberLiteral';
}

export interface AstStringNode extends AstNode {
  type: 'StringLiteral';
}

export interface AstCallNode extends AstNode {
  name: string;
  params: AstNode[];
}

export default function parser(tokens: Token[]): AstRootNode {
  const ast = createRootNode()
  let current = 0
  let token: Token = tokens[current]
  const stack: AstNode[][] = [ast.body]

  while (current < tokens.length) {
    if (token.type !== 'paren') {
      stack[0].push(token.type === 'name' ? createStringNode(token.value) : createNumberNode(token.value))
    }

    if (token.type === 'paren' && token.value === '(') {
      const callExpression = createCallExpression(tokens[++current].value)
      stack[0].push(callExpression)
      stack.unshift(callExpression.params)
    }

    if (token.type === 'paren' && token.value === ')') {
      stack.shift()
    }

    token = tokens[++current]
  }

  return ast
}

export function createRootNode(body: AstNode[] = []): AstRootNode {
  return {
    type: 'Program',
    body
  }
}

export function createNumberNode(value: string): AstNumberNode {
  return {
    type: 'NumberLiteral',
    value
  }
}

export function createStringNode(value: string): AstStringNode {
  return {
    type: 'StringLiteral',
    value
  }
}

export function createCallExpression(value: string): AstCallNode {
  return {
    type: 'CallExpression',
    name: value,
    params: [],
  }
}