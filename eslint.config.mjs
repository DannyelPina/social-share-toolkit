import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist/"] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/recommended"],
	{
		languageOptions: {
			globals: globals.browser,
		},
	},
	{
		files: ["**/*.vue"],
		languageOptions: {
			parserOptions: { parser: tseslint.parser },
		},
	},
	{
		files: ["src/react/**/*.{ts,tsx}"],
		plugins: { "react-hooks": reactHooks },
		rules: reactHooks.configs.recommended.rules,
	},
	// Must stay last: turns off rules that conflict with Prettier
	prettier,
);
