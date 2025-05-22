import angular from "angular-eslint";
import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import importPlugin from 'eslint-plugin-import';
import jasminePlugin from "eslint-plugin-jasmine";
import tsdocPlugin from "eslint-plugin-tsdoc";
import unicornPlugin from 'eslint-plugin-unicorn';

export default tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      unicornPlugin.configs.recommended,
      ...angular.configs.tsRecommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
    ],
    plugins: {
      jasmine: jasminePlugin,
      tsdoc: tsdocPlugin
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: ["./tsconfig.json"],
        createDefaultProgram: true,
      },
      globals: {
        ...globals.builtin,
        ...globals.jasmine,
        ...globals.node,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/component-max-inline-declarations": "error",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case"
        }
      ],
      "@angular-eslint/no-attribute-decorator": "error",
      "@angular-eslint/no-forward-ref": "error",
      "@angular-eslint/no-lifecycle-call": "error",
      "@angular-eslint/no-pipe-impure": "error",
      "@angular-eslint/no-queries-metadata-property": "error",
      "@angular-eslint/prefer-output-readonly": "error",
      "@angular-eslint/use-component-view-encapsulation": "error",
      "@angular-eslint/use-pipe-decorator": "off",

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"]
        }
      ],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "decorated-field",
            "private-field",
            "public-field",
            "constructor",
            "decorated-method",
            "private-method",
            "public-method",
          ]
        }
      ],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-extraneous-class": [
        "error",
        {
          "allowEmpty": true,
          "allowStaticOnly": true
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/unbound-method": ["error", { ignoreStatic: true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ],

      "block-spacing": ["error", "always"],
      "brace-style": ["error", "1tbs"],
      "comma-dangle": ["error", "always-multiline"],
      "complexity": ["error", { max: 20 }],
      "curly": "error",
      "eol-last": ["error", "always"],
      "indent": ["error", 2],
      "max-lines": ["error", 400],
      "max-len": ["error", { code: 140, ignoreComments: true }],
      "multiline-ternary": ["error", "always-multiline"],
      "no-console": ["error", { "allow": ["warn", "error"] }],
      "no-debugger": "error",
      "no-duplicate-case": "error",
      "no-duplicate-imports": "error",
      "no-else-return": "error",
      "no-empty": "error",
      "no-extra-bind": "error",
      "no-extra-semi": "error",
      "no-fallthrough": "error",
      "no-lonely-if": "error",
      "no-multi-spaces": "error",
      "no-new-func": "error",
      "no-plusplus": "error",
      "no-redeclare": "error",
      "no-restricted-syntax": ["error", "ForInStatement"],
      "no-return-await": "error",
      "no-sequences": "error",
      "no-shadow": "off",
      "no-sparse-arrays": "error",
      "no-template-curly-in-string": "error",
      "no-undef": "warn",
      "no-underscore-dangle": "off",
      "no-unneeded-ternary": "error",
      "no-void": "error",
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return"
        },
        {
          blankLine: "always",
          prev: "case",
          next: "case"
        },
        {
          blankLine: "always",
          prev: "const",
          next: "*"
        },
        {
          blankLine: "any",
          prev: "const",
          next: "const"
        },
        {
          blankLine: "always",
          prev: "*",
          next: "let"
        },
        {
          blankLine: "any",
          prev: "let",
          next: "let"
        },
        {
          blankLine: "always",
          prev: "block",
          next: "*"
        }
      ],
      "prefer-arrow-callback": "error",
      "prefer-object-spread": "error",
      "prefer-template": "error",
      "quotes": ["error", "single"],
      "require-await": "off",
      "semi": ["error", "always"],
      "space-before-blocks": "error",
      "space-in-parens": ["error", "never"],
      "spaced-comment": ["error", "always"],
      "yoda": "error",

      "tsdoc/syntax": "warn",

      "import/namespace": ["error"],
      "import/no-duplicates": ["error"],
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "tsconfig.json"
        }
      }
    }
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);