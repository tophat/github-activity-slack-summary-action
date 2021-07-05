import * as github from '@actions/github'
import { WebClient } from '@slack/web-api'

export interface Context {
    octokit: ReturnType<typeof github.getOctokit>
    slack: WebClient
    org: string
    channel: string
}

export interface Issue {
    createdAt: string
    updatedAt: string
    num: number
    comments: number
    title: string
    url: string
    repoName: string
}

export interface Repository {
    stars: number
    watchers: number
    issues: Issue[]
    pullRequests: Issue[]
    fullName: string
}
