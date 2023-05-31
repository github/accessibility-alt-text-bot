# Accessibility-alt-text-bot

This action supports accessible content sharing on GitHub by leaving an automated reminder whenever an image is shared on a GitHub Issue, Pull request, or Discussion without meaningful alternative text (alt text).
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
  discussion:
    types: [created, edited]
  discussion_comment:
    types: [created, edited]

permissions:
  issues: write
  pull-requests: write
  discussions: write
  
jobs:
  accessibility_alt_text_bot:
    name: Check alt text is set on issue or pull requests
    runs-on: ubuntu-latest
    if: ${{ github.event.issue || github.event.pull_request || github.event.discussion }}
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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/inkblotty"><img src="https://avatars.githubusercontent.com/u/14206003?v=4?s=100" width="100px;" alt="Katie Foster"/><br /><sub><b>Katie Foster</b></sub></a><br /><a href="#ideas-inkblotty" title="Ideas, Planning, & Feedback">🤔</a> <a href="#a11y-inkblotty" title="Accessibility">️️️️♿️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kendallgassner"><img src="https://avatars.githubusercontent.com/u/15275462?v=4?s=100" width="100px;" alt="Kendall Gassner"/><br /><sub><b>Kendall Gassner</b></sub></a><br /><a href="https://github.com/kendallgassner/accessibility-alt-text-bot/commits?author=kendallgassner" title="Code">💻</a> <a href="#a11y-kendallgassner" title="Accessibility">️️️️♿️</a> <a href="https://github.com/kendallgassner/accessibility-alt-text-bot/commits?author=kendallgassner" title="Documentation">📖</a> <a href="#infra-kendallgassner" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/khiga8"><img src="https://avatars.githubusercontent.com/u/16447748?v=4?s=100" width="100px;" alt="Kate Higa"/><br /><sub><b>Kate Higa</b></sub></a><br /><a href="https://github.com/kendallgassner/accessibility-alt-text-bot/commits?author=khiga8" title="Code">💻</a> <a href="#a11y-khiga8" title="Accessibility">️️️️♿️</a> <a href="https://github.com/kendallgassner/accessibility-alt-text-bot/commits?author=khiga8" title="Documentation">📖</a> <a href="#infra-khiga8" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
