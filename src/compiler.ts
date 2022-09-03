import tokenizer from "./tokenizer"
import parser from "./parser"
import transformer from "./transformer"
import codeGenerator from "./codeGenerator"

export default function compiler (code: string): string {
  const tokens = tokenizer(code)
  const ast = parser(tokens)
  const newAst = transformer(ast)
  const output = codeGenerator(newAst)

  return output
}