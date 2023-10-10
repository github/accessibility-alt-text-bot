import markdownlint from "markdownlint";
import markdownlintGitHub from "@github/markdownlint-github";

export const validate = (markdown) =>
  markdownlint
    .sync({
      strings: {
        content: markdown,
      },
      config: {
        default: false,
        "no-default-alt-text": true,
        "no-alt-text": true,
        "no-empty-alt-text": true,
      },
      handleRuleFailures: true,
      customRules: markdownlintGitHub,
    })
    .content?.map((error) => {
      return error.ruleDescription;
    }) ?? [];
