import * as github from '@actions/github'
import * as core from '@actions/core'
import { WebClient } from '@slack/web-api'

import {
    getIssuesFromLastWeekByRepository,
    getPRsFromLastWeekByRepository,
} from './utils'
import postToSlack from './slack'
import { fetchOrgRepositoriesData, fetchRepositoryIssuesData } from './github'
import buildRepositorySummariesFromAPIData from './buildSummariesFromAPIData'

async function openSourceUpdate() {
    // Gather facts from input
    const githubToken = core.getInput('github-token')
    const slackToken = core.getInput('slack-token')
    const org = core.getInput('org')
    const channel = core.getInput('slack-channel')

    // Build context
    const context = {
        octokit: github.getOctokit(githubToken),
        slack: new WebClient(slackToken),
        org,
        channel,
    }

    // Gather facts about target org
    const reposData = await fetchOrgRepositoriesData(context)
    const issuesData = await fetchRepositoryIssuesData(
        context,
        reposData.map((repo) => repo.full_name),
    )
    // Digest data
    const repoDetails = buildRepositorySummariesFromAPIData(
        reposData,
        issuesData,
    )

    // Get details to print out
    const lastWeekIssues = getIssuesFromLastWeekByRepository(repoDetails)
    const lastWeekPRs = getPRsFromLastWeekByRepository(repoDetails)

    await postToSlack(context, lastWeekIssues, lastWeekPRs)
}

openSourceUpdate()
    .catch((e) => {
        core.error(`Open source slack update failed with ${e}`)
    })
    .then(() => {
        core.info('Posted update successfully.')
    })
