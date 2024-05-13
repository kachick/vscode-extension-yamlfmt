# Maintainer Notes

## Tests

The test suit requires runs in electron and therefore some system packages are
required to support GUI apps. The easiest way to get everything required is to
install google-chrome, since electron uses chromium under the hood. On WSL2 this
can be done by following [these instructions](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps#install-google-chrome-for-linux).

> **Note** The very first test run, after populating .vscode-test, always fails.
> Afterwards the tests work as expected.

## Releases

1. Bump version in package.json
2. Push tag as `v0.4.2`, now not sync with the package.json
3. Wait for complete the GitHub Actions
