import fs from "fs";
import { isAbsolute, join } from "path";
import { promisify } from "util";

import { Command } from "@oclif/command";
import expandTilde from "expand-tilde";

const readdir = promisify(fs.readdir);

export abstract class Base extends Command {
  async findFiles(pathString: string): Promise<string[]> {
    const path = expandTilde(pathString);
    const absolutePath = isAbsolute(path) ? path : join(process.cwd(), path);
    if (!fs.existsSync(absolutePath)) {
      this.error(`${absolutePath} does not exist`);
    }

    let files: string[] = [];
    if (fs.statSync(absolutePath).isDirectory()) {
      files = (await readdir(absolutePath))
        .map((file) => join(absolutePath, file))
        .filter((file) => fs.statSync(file).isFile() && /.*\.pdf$/.test(file));
    } else if (/.*\.pdf$/.test(path)) {
      files = [path];
    }

    if (files.length === 0) {
      this.warn("there is no pdf file");
      this.exit();
    }
    this.debug(`${files.length} pdf files found`);

    return files;
  }
}
