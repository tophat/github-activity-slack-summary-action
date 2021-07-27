# Github activity summaries, but on Slack! ✨
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Eager to keep your Slack workspace in-the-loop about what's going on in your Github projects? This action might come handy! With minimal setup, this action will post weekly summaries of what has been going on around your Github organization in a Slack channel or your choice. It's a top-notch way of coordinating around issues that need attention!

## Setup

Create a repository and add an action to it:

```
on:
  schedule:
    # Run every Monday at 9AM
    - cron: '0 9 * * 1'


jobs:
  spread-the-news:
    runs-on: ubuntu-latest
    steps:
      - uses: tophat/github-activity-slack-summary-action@master
        with:
          # Org to build the summary about
          org: 'myCoolOrg'
          # Where to post the update
          slack-channel: 'engineering'
          # Token used to fetch Github API data
          github-token: ${{ secrets.GITHUB_TOKEN }}
          # Token with 'chat:write' privileges
          slack-token: ${{ secrets.SLACK_TOKEN }}
```

To know more about how to schedule actions, read
[here](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#scheduled-events).

## Local development

This action reads from Github's API and posts to Slack channels. As such, you will need to [set up a Slack
workspace](https://slack.com/intl/en-ca/help/articles/206845317-Create-a-Slack-workspace) where your instance of the bot
can post, [give it the permissions it needs](https://api.slack.com/bot-users#installing-bot) (which should only be
`chat:write`) and grab both your Slack app's [bot token](https://api.slack.com/authentication/token-types#bot) and a
personal access token with minimal scope (it should only be able to read public repository metadata, unless you are
reporting on private repositories) from Github.

Using tools such as [act](https://github.com/nektos/act), you can then execute the action and provide the tokens you
have generated earlier as secret values that Github would otherwise manage.

With `act`, this would result in running

```
act -s GITHUB_TOKEN=<token> -s SLACK_TOKEN=<token>
```

at the root of the repository. The action should now run locally!

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.karnov.club/"><img src="https://avatars.githubusercontent.com/u/6210361?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marc Cataford</b></sub></a><br /><a href="https://github.com/tophat/github-activity-slack-summary-action/commits?author=mcataford" title="Code">💻</a> <a href="#infra-mcataford" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
