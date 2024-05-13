import { before } from "mocha";
import { assert } from "node:console";
import fs from "node:fs";
import path from "node:path";
import vscode from "vscode";
import { assertIsDefined, caseDirTest, sleep } from "./lib.js";

suite("workspace", () => {
  const casesDir = path.join(__dirname, "testdata", "workspace");
  const testCases = fs.readdirSync(casesDir).filter(entry => fs.statSync(path.join(casesDir, entry)).isDirectory());

  before(async () => {
    vscode.workspace.updateWorkspaceFolders(
      0,
      null,
      ...testCases.map(tc => ({ uri: vscode.Uri.file(path.join(casesDir, tc)) })),
    );
    await sleep(5000);
  });

  for (const tc of testCases) {
    test(tc, async () => {
      const wsf = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(path.join(casesDir, tc)));
      assertIsDefined(wsf);
      await caseDirTest(wsf.uri.fsPath);
    });
  }
});
