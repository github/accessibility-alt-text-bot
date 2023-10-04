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
      config: markdownlintGitHub.init({
        default: false,
        "no-default-alt-text": true,
        "no-alt-text": true,
        "no-generic-link-text": false,
      }),
      handleRuleFailures: true,
      customRules: markdownlintGitHub,
    })
    .content?.map((error) => {
      // console.log(`warning: ${error.ruleDescription}`);
      return error.ruleDescription;
    }) ?? [];
