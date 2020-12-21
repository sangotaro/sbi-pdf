import assert from "assert";

import { purifyFloat } from "../purify-float";

describe("purifyFloat", (): void => {
  test("半角数字はそのまま Float に変換", (): void => {
    assert.strictEqual(purifyFloat("1.23"), 1.23);
  });
  test("半角数字はそのまま Float に変換", (): void => {
    assert.strictEqual(purifyFloat("1.0"), 1);
  });
  test("半角スペース、カンマは空文字に変換して Float に変換", (): void => {
    assert.strictEqual(purifyFloat(" 1 , 2 3 4 . 5 6 7 0 "), 1234.567);
  });
  test("先頭が半角数字なら Float に変換", (): void => {
    expect(purifyFloat("1.234あいうえお")).toBe(1.234);
  });
  test("Float に変換できない場合は NaN", (): void => {
    assert.strictEqual(purifyFloat("あいうえお"), NaN);
  });
});
