{
  inputs = {
    # How to update the revision
    #   - `nix flake update --commit-lock-file` # https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-flake-update.html
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        formatter = pkgs.nixfmt-rfc-style;
        devShells.default =
          with pkgs;
          mkShell {
            buildInputs = [
              # For Nix environments
              # https://github.com/NixOS/nix/issues/730#issuecomment-162323824
              bashInteractive
              nil
              nixfmt-rfc-style

              nodejs_20
              yamlfmt
              deno
              dprint
              typos
            ];
          };
      }
    );
}
