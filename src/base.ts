import fs from "fs";
import os from "os";
import { isAbsolute, join } from "path";
import { promisify } from "util";

import { Command, flags } from "@oclif/command";
import { cli } from "cli-ux";
import expandTilde from "expand-tilde";
import pLimit from "p-limit";

import { tabula } from "./tabula";

const readdir = promisify(fs.readdir);

export abstract class Base<T> extends Command {
  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    json: flags.boolean({ description: "output in json format" }),
  };

  static args = [{ name: "path", default: "." }];

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

  async extractTables(pdfFile: string): Promise<unknown[]> {
    let result;
    try {
      result = await tabula(`-g -l -f JSON -p all ${pdfFile}`);
    } catch (error) {
      this.error("tabula failed");
    }
    const tables = JSON.parse(result);
    this.debug(`PDF (${pdfFile}) 内のテーブル数: ${tables.length}`);
    return tables;
  }

  abstract extractItems(tables: unknown[]): Promise<T[]>;

  async batchExtract(files: string[]): Promise<T[]> {
    const bar = cli.progress();
    bar.start(files.length, 0);
    const limit = pLimit(os.cpus().length - 1);
    return (
      await Promise.all(
        files.map((f) =>
          limit(async () => {
            const tables = await this.extractTables(f);
            const items = await this.extractItems(tables);
            bar.increment();
            return items;
          })
        )
      ).finally(() => bar.stop())
    ).flat();
  }
}
