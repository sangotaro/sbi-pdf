import childProcess from "child_process";
import path from "path";
import { promisify } from "util";

import { BaseError } from "./utils/error";

const dirname = __dirname;
const exec = promisify(childProcess.exec);

export class TabulaError extends BaseError {}

export async function tabula(args: string): Promise<string> {
  const jar = path.join(dirname, "../tabula/build/libs/tabula-all.jar");
  try {
    const { stdout } = await exec(`java -jar ${jar} ${args}`);
    return stdout;
  } catch (e) {
    if (e.stderr === "Error: Error: End-of-File, expected line\n") {
      throw new TabulaError("unknown file");
    }
    throw new TabulaError("unexpected");
  }
}
