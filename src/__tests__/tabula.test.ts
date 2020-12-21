import assert from "assert";

import { tabula } from "../tabula";

describe("tabula", (): void => {
  test("-v option", async (): Promise<void> => {
    const result = await tabula("-v");
    assert.match(result, /tabula.+/);
  });

  test("throw TabulaError", async (): Promise<void> => {
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
