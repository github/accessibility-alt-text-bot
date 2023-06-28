#!/bin/bash

source flag-alt-text.sh
source assert.sh

# true

declare -a should_be_true=(
    # markdown
    '![Cleanshot 2020-01-01 at 12.00.00.png]'
    '![Clean shot 2020-12-01 @12x]'
    "![Clean shot 2020-12-01 @12x]"
    "![Screen Shot 2020-01-01 at 12.00.00.png]"
    "![Screenshot 2020-01-01 at 12.00.00.png]"
    "![image]"
    "![Image]"
    "![]"
    "Check this: ![Image]"
    "My awesome ![image]"
    'Check this out: <img alt="image" src="cat.png">'
    # html
    '<img alt="image" src="cat.png">'
    '<img alt="" src="cat.png">'
    "<img alt='' src='cat.png'>"
    # TODO: add flag for these cases
    # "<img src="cat.png">"
    # '<img alt src="cat.png">'
    # '<img src="cat.png" width="10px">'
    '<img alt="Screen shot 2020-01-01 at 12.00.00.png" src="cat.png">'
    '<img alt="Screen Shot 2020-01-01 at 12.00.00.png" src="cat.png">'
    '<img alt="Screenshot 2020-01-01 at 12.00.00.png" src="cat.png">'
    '<img alt="CleanShot 2020-01-01 @12x" src="cat.png">'
)

declare -a should_be_false=(
    # markdown
    "![Screenshot of the new GitHub home page]"
    "![Screen shot of Submit button with updated color contrast.]"
    "![Image of a cat]"
    # html
    '<img src="cat.png" alt="Mona Lisa, the Octocat" >'
    '<img alt="Mona Lisa, the Octocat" src="cat.png">'
    '<img alt="Screenshot of the new danger button with a dark red shade" src="test.png">'
    '<img alt="Clean shot of the scenery" src="test.png">'
)

echo "******Expecting true:*******"
for i in "${should_be_true[@]}"; do
    echo "Testing: $i"
    assert_true "$(flagAltText "$i")" "$i must be true"
    # if [ $? == 1 ]; then
    #     exit 1
    # fi

done

echo "******Expecting false:*******"
for i in "${should_be_false[@]}"; do
    echo "Testing: $i"
    assert_false "$(flagAltText "$i")" "$i must be false"
    # if [ $? == 1 ]; then
    #     exit 1
    # fi
done
