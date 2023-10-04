import { validate } from "./validate.js";

test("no-alt-text: should return errors", async () => {
  let result = await validate("![]()");
  expect(result[0]).toBe("Images should have alternate text (alt text)");
  // expect(result[0]).toBe("Images should have alternate text (alt text)");
  // result = await validate('<img src="cat.png">');
  // expect(result[0]).toBe("Images should have alternate text (alt text)");
  // result = await validate('<img alt src="cat.png">');
  // expect(result[0]).toBe("Images should have alternate text (alt text)");
  // result = await validate('<img src="cat.png" width="10px">');
  // expect(result[0]).toBe("Images should have alternate text (alt text)");
});
test("no-default-alt-text: should return errors", async () => {
  let result = await validate("![Cleanshot 2020-01-01 at 12.00.00.png]()");
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate("![Clean shot 2020-12-01 @12x]()");
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate("![Clean shot 2020-12-01 @12x]()");
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );

  result = await validate("![Screen Shot 2020-01-01 at 12.00.00.png]()");
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate("![Screenshot 2020-01-01 at 12.00.00.png]()");
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate("![image]()");
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate("![Image]()");
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate("Check this: ![Image]()");
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate("My awesome ![image]()");
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate('Check this out: <img alt="image" src="cat.png">');
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate('<img alt="image" src="cat.png">');
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  // result = await validate('<img alt="" src="cat.png">');
  // expect(result[0]).toBe(
  //   "Images should have meaningful alternative text (alt text)"
  // );
  // result = await validate("<img alt='' src='cat.png'>");
  // expect(result[0]).toBe(
  //   "Images should have meaningful alternative text (alt text)"
  // );
  result = await validate(
    '<img alt="Screen shot 2020-01-01 at 12.00.00.png" src="cat.png">'
  );
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate(
    '<img alt="Screen Shot 2020-01-01 at 12.00.00.png" src="cat.png">'
  );
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate(
    '<img alt="Screenshot 2020-01-01 at 12.00.00.png" src="cat.png">'
  );
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
  result = await validate(
    '<img alt="CleanShot 2020-01-01 @12x" src="cat.png">'
  );
  expect(result[0]).toBe(
    "Images should have meaningful alternative text (alt text)"
  );
});

test("no-alt-text: should not return errors", async () => {
  let result = await validate("```![]()```");
  expect(result.length).toBe(0);
});

test("no-default-alt-text: should not return errors", async () => {
  let result = await validate("![Mona Lisa, the Octocat](cat.png)");
  expect(result.length).toBe(0);
  result = await validate(
    "![Screen shot of Submit button with updated color contrast.]()"
  );
  expect(result.length).toBe(0);
  result = await validate("![Image of a cat]()");
  expect(result.length).toBe(0);
  result = await validate("![Screenshot of the new GitHub home page]()");
  expect(result.length).toBe(0);
  result = await validate(
    '<img alt="Screenshot of the new danger button with a dark red shade" src="test.png">'
  );
  expect(result.length).toBe(0);
  result = await validate(
    '<img alt="Clean shot of the scenery" src="test.png">'
  );
  expect(result.length).toBe(0);
  result = await validate('<img src="cat.png" alt="Mona Lisa, the Octocat" >');
  expect(result.length).toBe(0);
  result = await validate('<img alt="Mona Lisa, the Octocat" src="cat.png">');
  expect(result.length).toBe(0);
  // result = await validate(
  //   '```<img alt="CleanShot 2020-01-01 @12x" src="cat.png">```'
  // );
  // expect(result.length).toBe(0);
  // result = await validate("```![Image]()```");
  //expect(result.length).toBe(0);
});
