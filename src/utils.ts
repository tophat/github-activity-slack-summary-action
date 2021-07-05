import type { Issue, Repository } from './types'

const MILLIS_IN_DAY = 1000 * 3600 * 24

function getIssueDaySinceLastUpdate(issue: Issue): number {
    const updated = new Date(issue.updatedAt)

    return (Date.now() - updated.getTime()) / MILLIS_IN_DAY
}

export function sortIssuesByLastUpdate(first: Issue, second: Issue): number {
    return getIssueDaySinceLastUpdate(first) >=
        getIssueDaySinceLastUpdate(second)
        ? 1
        : -1
}

export function getIssuesFromLastWeekByRepository(
    repos: Repository[],
): Map<string, Issue[]> {
    const issues = new Map<string, Issue[]>()
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(new Date().getDate() - 7)
    for (const repo of repos) {
        issues.set(repo.fullName, getNewIssuesSince(oneWeekAgo, repo.issues))
    }

    return issues
}

export function getPRsFromLastWeekByRepository(
    repos: Repository[],
): Map<string, Issue[]> {
    const issues = new Map<string, Issue[]>()
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(new Date().getDate() - 7)
    for (const repo of repos) {
        issues.set(
            repo.fullName,
            getNewIssuesSince(oneWeekAgo, repo.pullRequests),
        )
    }

    return issues
}

function getNewIssuesSince(date: Date, issues: Issue[]): Issue[] {
    return issues.filter((issue: Issue) => {
        const createdAt = new Date(issue.createdAt)

        return createdAt >= date
    })
}
