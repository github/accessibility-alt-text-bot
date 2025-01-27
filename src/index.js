import { validate } from "./validate.js";

const [content] = process.argv.slice(2);
const [config] = process.argv.slice(3);


const run = async () => {
  console.log((await validate(content, config)));
};

run();
