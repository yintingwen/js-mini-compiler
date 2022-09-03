import { expect, test } from "vitest";
import compiler from "../src/compiler";

test('compiler', () => {
  expect(compiler('(add 2 (subtract 4 2))')).toBe(`add(2, subtract(4, 2));`);
})