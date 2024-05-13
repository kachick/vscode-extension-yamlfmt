import os from "os";
import path from "path";

import { runTests } from "@vscode/test-electron";

import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../");

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, "./suite/index.ts");

    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: ["--user-data-dir", path.join(os.tmpdir(), "yamlfmt-test")],
    });
  } catch (err) {
    console.error("Failed to run tests", err);
    process.exit(1);
  }
}

main();
