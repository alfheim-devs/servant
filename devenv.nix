{ pkgs, ... }:

{
  packages = with pkgs; [
    nodePackages.typescript-language-server
    nodePackages.vscode-json-languageserver
  ];
  
  languages.javascript = {
    enable = true;
    npm.enable = true;
    pnpm.enable = true;
  };

  services.postgres.enable = true;
  
  git-hooks.hooks = {
    eslint.enable = true;
    prettier.enable = true;
  };
}
