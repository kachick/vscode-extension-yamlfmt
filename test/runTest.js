const path = require("path");
const os = require("os");
const fs = require("fs");

const { runTests } = require("@vscode/test-electron");

const projectConfigPath = "yamlfmt.yml";
const backupConfigPath = `${projectConfigPath}.bak`;

// The folder containing the Extension Manifest package.json
// Passed to `--extensionDevelopmentPath`
const extensionDevelopmentPath = path.resolve(__dirname, "../");

// The path to the extension test script
// Passed to --extensionTestsPath
const extensionTestsPath = path.resolve(__dirname, "./suite/index");

async function main() {
  let exitcode = 1;

  fs.renameSync(projectConfigPath, backupConfigPath);

  try {
    // Download VS Code, unzip it and run the integration test
    exitcode = await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: ["--user-data-dir", path.join(os.tmpdir(), "yamlfmt-test")],
    });
  } catch (err) {
    console.error("Failed to run tests", err);
  } finally {
    fs.renameSync(backupConfigPath, projectConfigPath);
  }

  process.exit(exitcode);
}

main();
