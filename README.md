# Github activity summaries, but on Slack! ✨

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
