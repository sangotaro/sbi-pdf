import Ajv from "ajv";

import { Table0, Table1, schema } from "./schema";

/**
 * TODO: [Table0, Table1, ...] のような交互配列は typescript で表現できない
 * File として構造化した方がいいかも
 */
export function isTables(tables: unknown): tables is (Table0 | Table1)[] {
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
    const valid = validate(table);
    if (!valid) {
      // console.log(validate.errors);
      return false;
    }
  }
  return true;
}
