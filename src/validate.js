// import { remark } from "remark";
// import { noAltText } from "./rules/no-alt-text.js";
// import { reporter } from "vfile-reporter";

// export const validate = async (markdown) => {
//   const file = await remark().use(noAltText).process(markdown);

//   return reporter(file);
// };

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
      },
      handleRuleFailures: true,
      customRules: markdownlintGitHub,
    })
    .content?.map((error) => {
      return error.ruleDescription;
    }) ?? [];
