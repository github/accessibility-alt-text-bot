import { remark } from "remark";
import { noAltText } from "./rules/no-alt-text.js";
import { reporter } from "vfile-reporter";

export const validate = async (markdown) => {
  const file = await remark().use(noAltText).process(markdown);

  return reporter(file);
};
