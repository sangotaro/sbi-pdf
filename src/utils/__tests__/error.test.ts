import assert from "assert";

import { BaseError } from "../error";

describe("BaseError", (): void => {
  test("インスタンス化", (): void => {
    const e = new BaseError("Message!");
    assert(e instanceof BaseError);
    assert.strictEqual(e.message, "Message!");
  });
});
