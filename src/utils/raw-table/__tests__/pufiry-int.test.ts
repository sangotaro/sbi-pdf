import { purifyInt } from "../purify-int";

describe("purifyInt", (): void => {
  test("半角数字はそのまま変換", (): void => {
    expect(purifyInt("123")).toBe(123);
  });
  test("半角スペース、カンマは空文字に変換して Int に変換", (): void => {
    expect(purifyInt(" 1 , 2 3 4 ")).toBe(1234);
  });
  test("先頭が半角数字なら Int に変換", (): void => {
    expect(purifyInt("1234あいうえお")).toBe(1234);
  });
  test("Int に変換できない場合は NaN", (): void => {
    expect(purifyInt("あいうえお")).toBe(NaN);
  });
});
