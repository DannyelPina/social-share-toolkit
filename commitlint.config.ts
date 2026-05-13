import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "chore", "doc"],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-case": [2, "always", "lower-case"],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+):\s(.+)$/,
      headerCorrespondence: ["type", "subject"],
    },
  },
};

export default config;