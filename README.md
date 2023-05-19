# Accessibility-alt-text-bot

This action supports accessible content sharing on GitHub by leaving an automated reminder whenever an image is shared on a GitHub Issue or Pull request without meaningful alternative text (alt text).
Alternative text helps convey the context of the image to those who use assistive technologies such as a screen reader and removes accessibility barriers.

For guidance on setting alternative text, see [Alternative text for images on Primer](https://primer.style/design/guides/accessibility/alternative-text-for-images).

Images on GitHub default to using the filename as alt text. This action flags when the alt text has not been updated from the default:

<img width="758" alt="Screenshot of an automated actions comment on a GitHub issue that says, 'Uh oh! @monalisa, the image you shared is missing helpful alt text...' and contains instructions for setting alt text" src="https://github.com/github/accessibility-alt-text-bot/assets/16447748/c61cc9c6-f8c8-4bfb-becb-a155c2c9711d">

**Note**: Ordinarily, setting `alt=""` will mark images as decorative. However, GitHub currently renders all images as a link. To avoid rendering links with no names, we recommend always setting alt text on images in GitHub.

## How to add this action to your repo

Copy this workflow into any repo you want the accessibility-alt-text-bot to run in.

```yml
name: Accessibility-alt-text-bot
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
    if: ${{ github.event.issue || github.event.pull_request }}
    steps:
      - name: Get action 'github/accessibility-alt-text-bot'
        uses: github/accessibility-alt-text-bot
```

### Action stability

To ensure you stay on a stable version of this action consider locking the action to a specific version.

```yml
       uses: github/accessibility-alt-text-bot@v1.0.0
```

Replace the ref value with any commit hash.

## License

This project is licensed under the terms of the MIT open source license. Please refer to [MIT](./LICENSE.txt) for the full terms.

## Maintainers

See [CODEOWNERS](.github/CODEOWNERS).

## Support

TODO: Be explicit about support expectations.

## Acknowledgement

Please read [Contributing Guide](./CONTRIBUTING.md) for more information.
