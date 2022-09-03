export default function codeGenerator(ast: any) {
  switch (ast.type) {
    case 'Program':
      return ast.body.map(codeGenerator).join('')
    case 'ExpressionStatement':
      return codeGenerator(ast.expression) + ';'
    case 'CallExpression':
      return `${ast.callee.name}(${ast.arguments.map(codeGenerator).join(', ')})`
    case 'NumberLiteral':
      return ast.value
    case 'StringLiteral':
      return `"${ast.value}"`
  }
}
