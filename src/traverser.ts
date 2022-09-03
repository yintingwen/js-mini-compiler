import { AstRootNode, AstNode, AstCallNode } from './parser'

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

export default function traverser (ast: AstRootNode, visitor: Visitor) {
  const traverserArray = (array: AstNode[], parent: AstNode) => {
    array.forEach(child => {
      traverserNode(child, parent)
    })
  }

  const traverserNode = (node: AstNode, parent?: AstNode) => {
    const methods = visitor[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverserArray((node as AstRootNode).body, node)
        break
      case 'CallExpression':
        traverserArray((node as AstCallNode).params, node)
        break
      case 'NumberLiteral':
      case 'StringLiteral':
        break
      default:
        throw new TypeError(node.type)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverserNode(ast, undefined)
}