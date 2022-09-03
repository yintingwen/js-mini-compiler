import { expect, test } from "vitest";
import { AstRootNode } from "../src/parser";
import transformer from "../src/transformer";

test("transform", () => {
  const originAST: AstRootNode = {
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

  const transformAST = {
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

  expect(transformer(originAST)).toEqual(transformAST);
})