import assert from "assert";

import { BaseError } from "../error";

describe("BaseError", () => {
  test("インスタンス化", () => {
    const e = new BaseError("Message!");
    assert(e instanceof BaseError);
    assert.strictEqual(e.message, "Message!");
  });
});
