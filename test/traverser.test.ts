import { test, expect } from "vitest";
import { AstRootNode } from "../src/parser";
import traverser from "../src/traverser";

test('traverse', () => {
  const ast: AstRootNode = {
    type: 'Program',
    body: [
      {
        type: 'CallExpression',
        name: 'add',
        params: [
          {
            type: 'NumberLiteral',
            value: '2',
          },
          {
            type: 'CallExpression',
            name: 'subtract',
            params: [
              {
                type: 'NumberLiteral',
                value: '4',
              },
              {
                type: 'NumberLiteral',
                value: '2',
              }
            ]
          }
        ]
      }
    ]
  }

  const callArray: any[] = [];
  const options = {
    Program: {
      enter(node, parent) {
        callArray.push(['program-enter', node.type, parent?.type]);
      },
      exit(node, parent) {
        callArray.push(['program-exit', node.type, parent?.type]);
      }
    },
    CallExpression: {
      enter(node, parent) {
        callArray.push(['call-enter', node.type, parent?.type]);
      },
      exit(node, parent) {
        callArray.push(['call-exit', node.type, parent?.type]);
      }
    },
    NumberLiteral: {
      enter(node, parent) {
        callArray.push(['number-enter', node.type, parent?.type]);
      },
      exit(node, parent) {
        callArray.push(['number-exit', node.type, parent?.type]);
      }
    }
  }

  traverser(ast, options)

  expect(callArray).toEqual([
    ['program-enter', 'Program', undefined],
    ['call-enter', 'CallExpression', 'Program'],
    ['number-enter', 'NumberLiteral', 'CallExpression'],
    ['number-exit', 'NumberLiteral', 'CallExpression'],
    ['call-enter', 'CallExpression', 'CallExpression'],
    ['number-enter', 'NumberLiteral', 'CallExpression'],
    ['number-exit', 'NumberLiteral', 'CallExpression'],
    ['number-enter', 'NumberLiteral', 'CallExpression'],
    ['number-exit', 'NumberLiteral', 'CallExpression'],
    ['call-exit', 'CallExpression', 'CallExpression'],
    ['call-exit', 'CallExpression', 'Program'],
    ['program-exit', 'Program', undefined],
  ])
})