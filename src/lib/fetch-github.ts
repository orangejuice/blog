"use server"
import {graphql} from "@octokit/graphql"
import {giscusConfig} from "@/site"
import {createAppAuth} from "@octokit/auth-app"
import {format} from "@/lib/utils"
import {unstable_cache as cache} from "next/cache"
import axios from "axios"
import {importPKCS8, SignJWT} from "jose"

export const getInstallationId = async (repo: string): Promise<string> => {
  const now = Math.floor(Date.now() / 1000)
  const token = await new SignJWT()
    .setProtectedHeader({alg: "RS256"})
    .setIssuedAt(now)
    .setIssuer(process.env.GITHUB_APP_ID!)
    .setExpirationTime(now + 600)
    .sign(await importPKCS8(process.env.GITHUB_PRIVATE_KEY!.replaceAll("\\n", "\n"), "RS256"))

  const url = `https://api.github.com/repos/${repo}/installation`

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  })

  return (await response.data as {id: number}).id.toString()
}

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_PRIVATE_KEY!,
  installationId: await getInstallationId(giscusConfig.repo)
})
const graphqlWithAuth = graphql.defaults({request: {hook: auth.hook}})

interface DiscussionNode {
  number: number
  title: string
  comments: {
    totalCount: number
  }
  reactions: {
    totalCount: number
  }
}

export const fetchDiscussions = async ({repo, category, titles}: {repo: string, category: string, titles: string[]}): Promise<{[slug: string]: DiscussionNode}> => {
  console.log(format(new Date(), {datetime: true}), "[github]fetchDiscussions")
  const buildQueryWithAliases = () =>
    titles.map((title, index) => {
      const query = `repo:${repo} category:${category} in:title ${title}`
      return `
        discussion${index}: search(type: DISCUSSION, first: 1, query: "${query}") {
          nodes {
            ...DiscussionDetails
          }
        }`
    }).join("\n")

  const query = `
    query {
      ${buildQueryWithAliases()}
    }
    fragment DiscussionDetails on Discussion {
      title
      number
      comments {
        totalCount
      }
      reactions {
        totalCount
      }
   }`

  try {
    const data: {[queryNo: string]: {[nodes: string]: DiscussionNode[]}} = await graphqlWithAuth(query)
    const result: {[slug: string]: DiscussionNode} = {}

    Object.values(data).map(nodes => nodes["nodes"]).flatMap((queryResult, index) => {
      if (queryResult[0]) result[titles[index]] = queryResult[0]
    })
    return result
  } catch (error) {
    console.error("Error fetching discussion details:", error)
    throw error
  }
}

interface ActivityNode {
  number: number;
  title: string;
  comments: {
    totalCount: number;
    nodes: Array<{
      author: {
        login: string;
        avatarUrl: string;
      };
      body: string;
      bodyText: string;
      createdAt: string;
    }>;
  };
  reactions: {
    totalCount: number;
    nodes: Array<{
      content: string;
      user: {
        login: string;
        avatarUrl: string;
      };
      createdAt: string;
    }>;
  };
}

export const fetchLatestActivities = async ({repo, category, count}: {repo: string, category: string, count: number}) => {
  console.log(format(new Date(), {datetime: true}), "[github]fetchLatestActivities")
  const query = `
    query {
      discussion: search(type: DISCUSSION, first: ${count}, query: "repo:${repo} category:${category}") {
        nodes {
          ...DiscussionDetails
        }
      }
    }
    fragment DiscussionDetails on Discussion {
      title
      number
      comments(last: 1) {
        totalCount
        nodes {
          author {
            login
            avatarUrl
          }
          body
          bodyText
          createdAt
        }
      }
      reactions(last: 1) {
        totalCount
        nodes {
          content
          user {
            login
            avatarUrl
          }
          createdAt
        }
      }
    }`

  try {
    const data: {discussion: {nodes: ActivityNode[]}} = await graphqlWithAuth(query)
    const slugActivity: {[slug: string]: ActivityNode} = {}

    data.discussion.nodes.forEach((queryResult) => {
      if (queryResult) slugActivity[queryResult.title.slice(3)] = queryResult  //remove 'zh/' locale part
    })
    return slugActivity
  } catch (error) {
    console.error("Error fetching latest discussions:", error)
    throw error
  }
}

export type Discussion = PartialBy<DiscussionNode, "number" | "title">
export type Activity = ActivityNode


interface CommentNode {
  number: number;
  title: string;
  comments: {
    totalCount: number;
    nodes: Array<{
      id: string
      author: {
        login: string;
        avatarUrl: string;
      };
      body: string;
      bodyText: string;
      createdAt: string;
    }>;
  }
}

export const fetchGuestbookComments = cache(async ({repo, category, title}: {repo: string, category: string, title: string}) => {
  console.log(format(new Date(), {datetime: true}), "[github]fetchGuestbookComments")
  const query = `
    query {
      discussion: search(type: DISCUSSION, first: 1, query: "repo:${repo} category:${category} in:title ${title}") {
        nodes {
          ...DiscussionDetails
        }
      }
    }
    fragment DiscussionDetails on Discussion {
      title
      number
      comments(last: 50) {
        totalCount
        nodes {
          id
          author {
            login
            avatarUrl
          }
          body
          bodyText
          createdAt
        }
      }
    }`
  try {
    const data: {discussion: {nodes: CommentNode[]}} = await graphqlWithAuth(query)
    return data.discussion.nodes.flatMap(discuss => discuss.comments.nodes)
  } catch (error) {
    console.error("Error fetching latest discussions:", error)
    throw error
  }
})
export type Comment = CommentNode["comments"]["nodes"][number]
export type fetchGuestbookCommentsResponse = ReturnType<typeof fetchGuestbookComments>

// export type DiscussionData = Awaited<ReturnType<typeof fetchDiscussions>>

// console.log(await fetchDiscussions({
//   repo: giscusConfig.repo,
//   category: giscusConfig.category!,
//   titles: ["title", "2020-06-21-revolutionary-witness-monologue-of-alan-rickman", "zh/2020-06-21-revolutionary-witness-monologue-of-alan-rickman"]
// }))
