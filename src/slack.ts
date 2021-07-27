import type { Context, Issue } from './types'

function getSimpleMarkdownBlock(text: string) {
    return {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text,
        },
    }
}

/*
 * Posts updates to slack as a single thread.
 */
export default async function postToSlack(
    context: Context,
    lastWeekIssues: Map<string, Issue[]>,
    lastWeekPRs: Map<string, Issue[]>,
): Promise<void> {
    const messageCommonConfig = {
        channel: context.channel,
        unfurl_links: false,
    }

    const { ts: threadId } = await context.slack.chat.postMessage({
        ...messageCommonConfig,
        blocks: [
            getSimpleMarkdownBlock(
                ":tada: Here's your weekly Open Source update!",
            ),
        ],
    })

    const messages = []

    // Latest issues
    const issuesBlocks = [
        getSimpleMarkdownBlock('💬 Issues created in the last week:'),
    ]
    for (const [repoName, issues] of lastWeekIssues.entries()) {
        if (!issues.length) continue

        issuesBlocks.push(
            getSimpleMarkdownBlock(`*${repoName}*`),
            ...issues.map((issue: Issue) =>
                getSimpleMarkdownBlock(`<${issue.url}|${issue.title}>`),
            ),
        )
    }

    messages.push(issuesBlocks)

    const PRBlocks = [
        getSimpleMarkdownBlock('🔨 Pull requests opened in the last week:'),
    ]
    for (const [repoName, issues] of lastWeekPRs.entries()) {
        if (!issues.length) continue

        PRBlocks.push(
            getSimpleMarkdownBlock(`*${repoName}*`),
            ...issues.map((issue: Issue) =>
                getSimpleMarkdownBlock(`<${issue.url}|${issue.title}>`),
            ),
        )
    }

    messages.push(PRBlocks)
    for (const message of messages) {
        await context.slack.chat.postMessage({
            ...messageCommonConfig,
            blocks: message,
            thread_ts: threadId,
        })
    }
}
