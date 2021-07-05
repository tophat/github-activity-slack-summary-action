import type { Context } from './types'

export async function fetchOrgRepositoriesData(context: Context) {
    /*
     * Fetches all repository meta for the given org.
     */
    const { data } = await context.octokit.rest.repos.listForOrg({
        org: context.org,
    })

    return data
}

export async function fetchRepositoryIssuesData(
    context: Context,
    repoNames: string[],
) {
    /*
     * Fetches all issues (incl. PRs) for the given repositories, by fullname.
     */
    const issuesData = (
        await Promise.all(
            repoNames.map((repoFullName) => {
                const [owner, repoName] = repoFullName.split('/')
                return context.octokit.rest.issues.listForRepo({
                    owner,
                    repo: repoName,
                })
            }),
        )
    ).map((payload) => payload.data)

    return issuesData
}
