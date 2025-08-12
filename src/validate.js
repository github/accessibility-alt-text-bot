import markdownIt from "markdown-it";
import { lint } from "markdownlint/sync";
import yaml from "js-yaml";
const markdownItFactory = () => markdownIt({ html: true });

export const validate = (markdown, config) => {
  const configObject = yaml.load(config);
  return (
    lint({
      strings: {
        content: markdown,
      },
      config: config
        ? { default: false, ...configObject }
        : {
            default: false,
            "no-default-alt-text": true,
            "no-alt-text": true,
            "no-empty-alt-text": true,
          },
      handleRuleFailures: true,
      markdownItFactory,
      customRules: ["@github/markdownlint-github"],
    }).content?.map((error) => {
      return `- ${error.ruleDescription} at line ${error.lineNumber}`;
    }) ?? []
  ).join("\n");
};
