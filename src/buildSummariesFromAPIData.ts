import { sortIssuesByLastUpdate } from './utils'

import type { Issue, Repository } from './types'

export default function buildRepositorySummariesFromAPIData(
    reposData,
    issuesData,
): Repository[] {
    const repoSummaries: Repository[] = []

    for (const repoIndex in reposData) {
        const repo = reposData[repoIndex]
        const issues = issuesData[repoIndex]

        // Gather facts on repo issues
        const issueDetails: Issue[] = []
        const pullRequestDetails: Issue[] = []

        for (const issue of issues) {
            if (issue.state === 'closed')
                // Ignore closed issues.
                continue

            const isPullRequest = Boolean(issue.pull_request)

            const issueData = {
                createdAt: issue.created_at,
                updatedAt: issue.updated_at,
                num: issue.number,
                comments: issue.comments,
                title: issue.title,
                url: issue.html_url,
                repoName: repo.full_name,
            }

            if (isPullRequest) pullRequestDetails.push(issueData)
            else issueDetails.push(issueData)
        }

        const {
            full_name: fullName,
            stargazers_count: stars,
            watchers_count: watchers,
        } = repo

        issueDetails.sort(sortIssuesByLastUpdate)
        pullRequestDetails.sort(sortIssuesByLastUpdate)
        const repoSummary = {
            fullName,
            stars,
            watchers,
            issues: issueDetails,
            pullRequests: pullRequestDetails,
        }
        repoSummaries.push(repoSummary)
    }
    return repoSummaries
}
