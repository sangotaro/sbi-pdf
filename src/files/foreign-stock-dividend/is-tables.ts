import Ajv from "ajv";

import { schema } from "./schema";

export function isTables(tables: unknown): boolean {
  if (!Array.isArray(tables)) {
    return false;
  }
  if (tables.length % 2 !== 0) {
    return false;
  }
  const ajv = new Ajv();
  for (const [index, table] of tables.entries()) {
    const validate = ajv.compile(
      index % 2 === 0 ? schema.table0 : schema.table1
    );
    const valid = validate(table.data);
    if (!valid) {
      return false;
    }
  }
  return true;
}
