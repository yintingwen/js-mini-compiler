import { expect, test } from "vitest";
import codeGenerator from '../src/codeGenerator'

test('codeGenerator', () => {
  const ast = {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'add',
          },
          arguments: [
            {
              type: 'NumberLiteral',
              value: '2',
            },
            {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'subtract',
              },
              arguments: [
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
      }
    ]   
  }

  expect(codeGenerator(ast)).toBe(`add(2, subtract(4, 2));`);
})