import { validate } from "./validate.js";

test("no-alt-text: should return errors", async () => {
  let result = await validate("![]()");
  expect(result).toBe("- Images should have alternate text (alt text) at line 1");
  result = await validate('<img src="cat.png">');
  expect(result).toBe("- Images should have alternate text (alt text) at line 1");
  result = await validate('<img alt src="cat.png">');
  expect(result).toBe("- Images should have alternate text (alt text) at line 1");
  result = await validate('<img src="cat.png" width="10px">');
  expect(result).toBe("- Images should have alternate text (alt text) at line 1");
});
test("no-default-alt-text: should return errors", async () => {
  let result = await validate("![Cleanshot 2020-01-01 at 12.00.00.png]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate("![Clean shot 2020-12-01 @12x]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate("![Clean shot 2020-12-01 @12x]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );

  result = await validate("![Screen Shot 2020-01-01 at 12.00.00.png]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate("![Screenshot 2020-01-01 at 12.00.00.png]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate("![Screencast 2020-01-01 at 12.00.00.png]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate("![image]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate("![Image]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate("Check this: ![Image]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate("My awesome ![image]()");
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate('Check this out: <img alt="image" src="cat.png">');
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate('<img alt="image" src="cat.png">');
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate('<img alt="" src="cat.png">');
  expect(result).toBe(
    "- Please provide an alternative text for the image. at line 1"
  );
  result = await validate("<img alt='' src='cat.png'>");
  expect(result).toBe(
    "- Please provide an alternative text for the image. at line 1"
  );
  result = await validate(
    '<img alt="Screen shot 2020-01-01 at 12.00.00.png" src="cat.png">'
  );
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate(
    '<img alt="Screen Shot 2020-01-01 at 12.00.00.png" src="cat.png">'
  );
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate(
    '<img alt="Screenshot 2020-01-01 at 12.00.00.png" src="cat.png">'
  );
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  result = await validate(
    '<img alt="CleanShot 2020-01-01 @12x" src="cat.png">'
  );
  result = await validate('<img alt="Screencast 2020-01-01 @12x" src="cat.png">');
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
  expect(result).toBe(
    "- Images should have meaningful alternative text (alt text) at line 1"
  );
});


test("no-generic-link-text: should return errors", async () => {
  const config = `
  no-default-alt-text: true,
  no-alt-text: true,
  no-empty-alt-text: true,
  no-generic-link-text: true,`

  // default configuration does not check for improper links
  const result = await validate("[Learn more](https://docs.github.com)", config);
  expect(result).toBe("- Avoid using generic link text like `Learn more` or `Click here` at line 1");
});


test("no-alt-text: should not return errors", async () => {
  let result = await validate("```![]()```");
  expect(result).toBe("");
});

test("no-generic-link-text: should not return errors", async () => {
  // default configuration does not check for improper links
  const result = await validate("[Learn more](https://docs.github.com)");
  expect(result).toBe("");
});

test("no-default-alt-text: should not return errors", async () => {
  let result = await validate("![Mona Lisa, the Octocat](cat.png)");
  expect(result).toBe("");
  result = await validate(
    "![Screen shot of Submit button with updated color contrast.]()"
  );
  expect(result).toBe("");
  result = await validate("![Image of a cat]()");
  expect(result).toBe("");
  result = await validate("![Screenshot of the new GitHub home page]()");
  expect(result).toBe("");
  result = await validate(
    '<img alt="Screenshot of the new danger button with a dark red shade" src="test.png">'
  );
  expect(result).toBe("");
  result = await validate(
    '<img alt="Clean shot of the scenery" src="test.png">'
  );
  expect(result).toBe("");
  result = await validate('<img src="cat.png" alt="Mona Lisa, the Octocat" >');
  expect(result).toBe("");
  result = await validate('<img alt="Mona Lisa, the Octocat" src="cat.png">');
  expect(result).toBe("");
  result = await validate(
    '```<img alt="CleanShot 2020-01-01 @12x" src="cat.png">```'
  );
  expect(result).toBe("");
  result = await validate("```![Image]()```");
  expect(result).toBe("");
});
