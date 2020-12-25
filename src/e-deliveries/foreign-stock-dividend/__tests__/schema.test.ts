import assert from "assert";

import { schema } from "../schema";

describe("schema", () => {
  test("should have a value", () => {
    assert(schema);
  });
});
