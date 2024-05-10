# VS Code Extension - yamlfmt

This repository is now forked for my use, the upstream is [bluebrown/vscode-extension-yamlfmt](https://github.com/bluebrown/vscode-extension-yamlfmt)

What are the differences in the features.

- Run formatter for GitHub action workflows

## Usage

**Note** The binary must exist in the system path.

### Configuration

If the file is not opened from a workspace, the extension will fallback to the
files parent directory as `cwd`. If that is not sufficient to pick up the right
config file, you can create a .yamlfmt at one of the common locations. i.e.
`~/config/yamlfmt/` or export `XDG_CONFIG_HOME`. Alternatively point to the
right at via the `-conf` flag, in your `settings.json`.

You can pass extra flags from the `settings.json`:

```json
{
  "yamlfmt.args": []
}
```

**Note** The flag `-in` is always appended to the args, since the current document is passed via stdin to yamlfmt.
