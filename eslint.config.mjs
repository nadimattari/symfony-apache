import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  { languageOptions: { globals: globals.browser } },
  ...pluginVue.configs["flat/essential"],
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": "warn"
    }
  },
  {
    ignores: ["node_modules/", "public/build/", "vendor/"]
  }
];