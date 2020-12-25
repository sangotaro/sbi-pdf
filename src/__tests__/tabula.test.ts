import assert from "assert";

import { tabula } from "../tabula";

describe("tabula", (): void => {
  test("-v option", async () => {
    const result = await tabula("-v");
    assert.match(result, /tabula.+/);
  });

  test("throw TabulaError", async () => {
    await assert.rejects(
      async () => {
        await tabula("");
      },
      {
        name: "TabulaError",
      }
    );
  });
});
