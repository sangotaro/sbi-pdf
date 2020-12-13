import childProcess from "child_process";
import path from "path";
import { promisify } from "util";

import Ajv from "ajv";

import { schema } from "./schemas/gaikoku-kabushiki-haito";
import { extract as extractGaikokuKabushikiHaito } from "./table-extractors/gaikoku-kabushiki-haito";

const dirname = path.dirname(new URL(import.meta.url).pathname);
const exec = promisify(childProcess.exec);

function isGaikokuKabushikiHaito(tables: unknown) {
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

// TODO: any やめる
export async function extract(pdfFile: string): Promise<any> {
  const jar = path.join(
    dirname,
    "../lib/tabula-1.0.4-jar-with-dependencies.jar"
  );
  const { stdout } = await exec(
    `java -jar ${jar} -g -l -f JSON -p all ${pdfFile}`
  );
  const tables = JSON.parse(stdout);

  if (isGaikokuKabushikiHaito(tables)) {
    return await extractGaikokuKabushikiHaito(tables);
  }
}
