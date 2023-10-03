import { validate } from "./validate.js";

const [content] = process.argv.slice(2);

const run = async () => {
  console.log((await validate(content)).includes("warning"));
};

run();
