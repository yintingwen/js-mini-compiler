import { test, expect } from 'vitest'
import tokenizer, { NAME_REG, NUMBER_REG, getValueType } from '../src/tokenizer'

test.skip('regexp', () => {
  expect(NAME_REG.test('a12Bc')).toBe(true)
  expect(NUMBER_REG.test('123')).toBe(true)
})

test.skip('getValueType', () => {
  expect(getValueType('a12Bc')).toBe('name')
  expect(getValueType('123')).toBe('number')
  expect(getValueType('(')).toBe('paren')
})

test.skip('paren', () => {
  const code = '('
  const tokens = [{ type: 'paren', value: '(' }]

  expect(tokenizer(code)).toEqual(tokens)
})

test('add', () => {
  const code = 'add'
  const tokens = [{ type: 'name', value: 'add' }]

  expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
  const code = '22'
  const tokens = [{ type: 'number', value: '22' }]

  expect(tokenizer(code)).toEqual(tokens)
})

test('easyTokenize', () => {
  const code = `(add 1 2)`
  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '1' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('tokenize', () => {
  const code = `(add 2 (subtract 4 2))`
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

  expect(tokenizer(code)).toEqual(tokens)
})
