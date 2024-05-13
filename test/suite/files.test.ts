import fs from "node:fs";
import { platform } from "node:os";
import path from "node:path";
import { window } from "vscode";
import { caseDirTest } from "./lib.js";

suite("files", () => {
  const casesDir = path.join(__dirname, "testdata", "files");
  const testCases = fs.readdirSync(casesDir).filter(entry => fs.statSync(path.join(casesDir, entry)).isDirectory());

  for (const tc of testCases) {
    if (tc === "config-xdg" && platform() === "win32") {
      window.showInformationMessage("skipping XDG_CONFIG_HOME test due to windows platform!");
      continue;
    }

    test(tc, async () => {
      const dirPath = path.join(casesDir, tc);
      await caseDirTest(dirPath);
    });
  }
});
