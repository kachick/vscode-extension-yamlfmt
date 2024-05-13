"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_path_1 = require("node:path");
const vscode = __importStar(require("vscode"));
const yamlformattedLanguages = [
    "yaml",
    "github-actions-workflow", // Provided in https://github.com/github/vscode-github-actions
];
const provider = {
    provideDocumentFormattingEdits(document) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const config = vscode.workspace.getConfiguration("", document.uri);
        const baseArgs = config.get("yamlfmt.args", []).filter(arg => arg !== "-in");
        const args = [...baseArgs, "-in"];
        const result = (0, node_child_process_1.spawnSync)("yamlfmt", args, {
            cwd: workspaceFolder ? workspaceFolder.uri.fsPath : (0, node_path_1.dirname)(document.uri.fsPath),
            input: document.getText(),
        });
        if (result.error) {
            console.error(result.error);
            const prefix = "spawnSync ";
            vscode.window.showErrorMessage(result.error.message.startsWith(prefix)
                ? result.error.message.substring(prefix.length)
                : result.error.message);
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
        const range = new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end);
        return [vscode.TextEdit.replace(range, result.stdout.toString())];
    },
};
function activate() {
    for (const lang of yamlformattedLanguages) {
        vscode.languages.registerDocumentFormattingEditProvider(lang, provider);
    }
}
function deactivate() { }
module.exports = {
    activate,
    deactivate,
};
