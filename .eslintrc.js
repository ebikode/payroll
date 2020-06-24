module.exports = {
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "eslint-config-prettier"
  ],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    semi: ["error", "always"],
    "no-console": ["error", { allow: ["warn", "error", "log"] }]
  }
};
