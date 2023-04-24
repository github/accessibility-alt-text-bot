# Accessibility-alt-text-bot

An action to remind users to add alt text to their issue descriptions and comments.

## How to add this action to your repo

Copy this workflow into any repo you want the Accessibility-alt-text-bot to run in.

## Action stability

To ensure you stay on a stable version of this action consider locking the action to a specific version.

```       
       uses: github/accessibility-alt-text-bot@4a94d0359143b44dab2e392616a02f88c30329df
```    

Replace the ref value with any commit hash.

```
name: Test Accessibility-alt-text-bot
on: 
  issues:
    types: [opened, edited]
  pull_request:
    types: [opened, edited]
  issue_comment:
    types: [created, edited]

jobs:
  accessibility_alt_text_bot:
    name: Check alt text is set on issue or pull requests
    runs-on: ubuntu-latest
    if: ${{ github.event.issue || github.event.pull_request && github.event.comment.user.login != 'accessibility-bot' }}
    steps:
      - name: Get private action 'github/accessibility-alt-text-bot'
        uses: github/accessibility-alt-text-bot
```

## Future work

Due to time restraints this action does not have any tests. An easy way to test this would be to move the bash script in `action.yml` to its own file and create test cases with mock comments.


## License 

This project is licensed under the terms of the MIT open source license. Please refer to [MIT](./LICENSE.txt) for the full terms.


## Maintainers 

See [CODEOWNERS](./CODEOWNERS)

## Support

TODO: Be explicit about support expectations.

## Acknowledgement

Please read [Contributing Guide](./CONTRIBUTING.md) for more information.