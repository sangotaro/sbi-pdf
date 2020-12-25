import assert from "assert";

import { purifyInt } from "../purify-int";

describe("purifyInt", () => {
  test("半角数字はそのまま Int に変換", () => {
    assert.strictEqual(purifyInt("123"), 123);
  });
  test("半角スペース、カンマは空文字に変換して Int に変換", () => {
    assert.strictEqual(purifyInt(" 1 , 2 3 4 "), 1234);
  });
  test("先頭が半角数字なら Int に変換", () => {
    assert.strictEqual(purifyInt("1234あいうえお"), 1234);
  });
  test("Int に変換できない場合は NaN", () => {
    assert.strictEqual(purifyInt("あいうえお"), NaN);
  });
});
