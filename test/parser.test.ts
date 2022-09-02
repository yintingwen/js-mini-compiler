import { test, expect } from "vitest";
import parser from '../src/parser'
import { Token } from "../src/tokenizer";

test('number', () => {
  const token: Token[] = [{ type: 'number', value: '22' }]
  const ast = {
    type: 'Program',
    body: [
      {
        type: 'NumberLiteral',
        value: '22'
      }
    ]
  }

  expect(parser(token)).toEqual(ast)
})

test('callExpression', () => {
  const tokens: Token[] = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'number', value: '4' },
    { type: 'paren', value: ')' },
  ]

  const ast = {
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
            type: 'NumberLiteral',
            value: '4',
          }
        ]
      }
    ]
  }

  expect(parser(tokens)).toEqual(ast)
})

test('double callExpression', () => {
  const tokens: Token[] = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'number', value: '4' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'delete' },
    { type: 'number', value: '3' },
    { type: 'number', value: '5' },
    { type: 'paren', value: ')' },
  ]

  const ast = {
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
            type: 'NumberLiteral',
            value: '4',
          }
        ]
      },
      {
        type: 'CallExpression',
        name: 'delete',
        params: [
          {
            type: 'NumberLiteral',
            value: '3',
          },
          {
            type: 'NumberLiteral',
            value: '5',
          }
        ]
      }
    ]
  }

  expect(parser(tokens)).toEqual(ast)
})

test('parser', () => {
  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' },
  ]

  const ast = {
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

  expect(parser(tokens)).toEqual(ast)
})