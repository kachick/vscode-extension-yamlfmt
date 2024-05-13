import { spawnSync } from "node:child_process";
import { dirname } from "node:path";
import * as vscode from "vscode";

const yamlformattedLanguages = [
  "yaml",
  "github-actions-workflow", // Provided in https://github.com/github/vscode-github-actions
];
const provider = {
  provideDocumentFormattingEdits(document: vscode.TextDocument) {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    const config = vscode.workspace.getConfiguration("", document.uri);

    const baseArgs = config.get("yamlfmt.args", []).filter(arg => arg !== "-in");
    const args = [...baseArgs, "-in"];

    const result = spawnSync("yamlfmt", args, {
      cwd: workspaceFolder ? workspaceFolder.uri.fsPath : dirname(document.uri.fsPath),
      input: document.getText(),
    });

    if (result.error) {
      console.error(result.error);
      const prefix = "spawnSync ";
      vscode.window.showErrorMessage(
        result.error.message.startsWith(prefix)
          ? result.error.message.substring(prefix.length)
          : result.error.message,
      );
      return [];
    }

    if (result.stderr.length > 0) {
      console.log(result.stderr.toString());
      vscode.window.showErrorMessage(result.stderr.toString());
      return [];
    }

    if (result.stdout.length < 1) {
      console.warn("yamlfmt's stdout buffer is empty");
      return [];
    }

    const range = new vscode.Range(
      document.lineAt(0).range.start,
      document.lineAt(document.lineCount - 1).range.end,
    );

    return [vscode.TextEdit.replace(range, result.stdout.toString())];
  },
};

function activate() {
  for (const lang of yamlformattedLanguages) {
    vscode.languages.registerDocumentFormattingEditProvider(lang, provider);
  }
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
