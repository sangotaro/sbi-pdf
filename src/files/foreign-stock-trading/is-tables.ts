import Ajv from "ajv";

import { Table, schema } from "./schema";

export function isTables(tables: unknown): tables is Table[] {
  if (!Array.isArray(tables)) {
    return false;
  }
  const ajv = new Ajv({ allErrors: true });
  for (const table of tables) {
    const validate = ajv.compile(schema.table);
    const valid = validate(table);
    if (!valid) {
      // TODO: debug code
      console.log(validate.errors);
      return false;
    }
  }
  return true;
}
