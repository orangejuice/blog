import jwt from "jsonwebtoken"
import {graphql} from "@octokit/graphql"
import {giscusConfig} from "@/site"
import {createAppAuth} from "@octokit/auth-app"
import {unstable_cache as cache} from "next/cache"

export const getInstallationId = async (repo: string): Promise<string> => {
  const now = Math.floor(Date.now() / 1000)
  const payload = {iat: now, exp: now + 600, iss: process.env.GITHUB_APP_ID!}
  const token = jwt.sign(payload, process.env.GITHUB_PRIVATE_KEY!, {algorithm: "RS256"})
  const url = `https://api.github.com/repos/${repo}/installation`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json"
    }
  })

  return (await response.json() as {id: number}).id.toString()
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

interface FetchDiscussionsByCategoryArgs {
  repo: string
  category: string
  titles: string[]
}

export const fetchDiscussions = cache(async ({repo, category, titles}: FetchDiscussionsByCategoryArgs): Promise<{[slug: string]: DiscussionNode}> => {
  console.log("firing a new github call")
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
    throw new Error("Failed to fetch discussion details")
  }
})

export type Discussion = PartialBy<DiscussionNode, "number" | "title">
// export type DiscussionData = Awaited<ReturnType<typeof fetchDiscussions>>

// console.log(await fetchDiscussions({
//   repo: giscusConfig.repo,
//   category: giscusConfig.category!,
//   titles: ["title", "2020-06-21-revolutionary-witness-monologue-of-alan-rickman", "zh/2020-06-21-revolutionary-witness-monologue-of-alan-rickman"]
// }))
