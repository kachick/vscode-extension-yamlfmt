# VS Code Extension - yamlfmt

- This repository is archived.

## Usage

The binary must exist in the system path.

```bash
code --install-extension kachick.vscode-yamlfmt
```

Add these config in your settings.json

```json
{
  "editor.formatOnSave": true,
  "[yaml]": {
    "editor.defaultFormatter": "kachick.vscode-yamlfmt"
  },
  "[github-actions-workflow]": {
    "editor.defaultFormatter": "kachick.vscode-yamlfmt"
  }
}
```

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

## Thanks

This repository is now forked for my use, the original is [bluebrown/vscode-extension-yamlfmt](https://github.com/bluebrown/vscode-extension-yamlfmt)
