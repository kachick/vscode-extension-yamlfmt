const path = require("path");
const os = require("os");
const fs = require("fs");

const { runTests } = require("@vscode/test-electron");

// The folder containing the Extension Manifest package.json
// Passed to `--extensionDevelopmentPath`
const extensionDevelopmentPath = path.resolve(__dirname, "../");

// The path to the extension test script
// Passed to --extensionTestsPath
const extensionTestsPath = path.resolve(__dirname, "./suite/index");

const projectConfigPath = path.join(extensionDevelopmentPath, ".yamlfmt");
const backupConfigPath = `${projectConfigPath}.bak`;

async function main() {
  fs.renameSync(projectConfigPath, backupConfigPath);

  let exitCode = 1;

  try {
    // Download VS Code, unzip it and run the integration test
    exitCode = await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: ["--user-data-dir", path.join(os.tmpdir(), "yamlfmt-test")],
    });
  } catch (err) {
    console.error("Failed to run tests", err);
  }

  fs.renameSync(backupConfigPath, projectConfigPath);

  process.exit(exitCode);
}

main();
