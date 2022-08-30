type TokenType = 'paren' | 'name' | 'number'

interface Token {
  type: 'paren' | 'name' | 'number';
  value: string;
}

export const NAME_REG = /^[a-z0-9]+$/i
export const NUMBER_REG = /^[0-9]+$/
export const SPACE_REG = /\s/

export function getValueType (value: string) {
  if (value === '(' || value === ')') {
    return 'paren'
  }
  if (NUMBER_REG.test(value)) {
    return 'number'
  }
  if (NAME_REG.test(value)) {
    return 'name'
  }

  throw new Error(`Unexpected token: ${value}`)
}

export function createToken (type: TokenType, value: string): Token {
  return {
    type,
    value,
  }
}

export default function tokenizer (code: string): Token[] { 
  const tokens: Token[] = []
  let current = 0 // 指针
  let char = '' // 当前字符
  let value = '' // 积累的值

  while (current < code.length) { 
    char = code[current]

    if (SPACE_REG.test(char)) {
      value && tokens.push(createToken(getValueType(value), value))
      value = ''
      current++
      continue
    }

    if (char === '(' || char === ')') {
      value && tokens.push(createToken(getValueType(value), value))
      tokens.push(createToken('paren', char))
      value = ''
      current++
      continue
    }

    value += char
    current++
  }

  tokens.push(createToken(getValueType(value), value))
  

  return tokens
}
