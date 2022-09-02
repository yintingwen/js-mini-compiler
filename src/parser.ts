import { Token } from "./tokenizer"

type AstNodeType = 'Program' | 'CallExpression' | 'NumberLiteral' | 'StringLiteral'

interface AstNode {
  type: AstNodeType;
  name?: string;
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

export function createCallExpression(value: string): AstCallExpression {
  return {
    type: 'CallExpression',
    name: value,
    params: [],
  }
}