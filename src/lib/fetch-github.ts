import jwt from "jsonwebtoken"
import {graphql} from "@octokit/graphql"
import {giscusConfig} from "@/site"


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

  return String((await response.json() as {id: number}).id)
}

const {createAppAuth} = await import("@octokit/auth-app")
const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_PRIVATE_KEY!,
  installationId: await getInstallationId(giscusConfig.repo)
})
const graphqlWithAuth = graphql.defaults({
  request: {
    hook: auth.hook
  }
})

interface DiscussionNode {
  number: number;
  title: string;
  comments: {
    totalCount: number;
  };
  reactions: {
    totalCount: number;
  };
}

interface FetchDiscussionsByCategoryArgs {
  repo: string;
  categoryId: string;
  first?: number; // Number of discussions to fetch, default to 100
}

interface DiscussionsByCategoryResponse {
  discussions: DiscussionNode[];
}

export const fetchDiscussions = async ({repo, categoryId, first = 100}: FetchDiscussionsByCategoryArgs): Promise<DiscussionsByCategoryResponse> => {
  try {
    const data = await graphqlWithAuth(`
query GetDiscussionsByCategory($repositoryOwner: String!, $repositoryName: String!, $categoryId: ID!, $first: Int!) {
  repository(owner: $repositoryOwner, name: $repositoryName) {
    discussions(first: $first, categoryId: $categoryId) {
      nodes {
        number
        title
        comments {
          totalCount
        }
        reactions {
          totalCount
        }
      }
    }
  }
}`, {
      repositoryOwner: repo.split("/")[0],
      repositoryName: repo.split("/")[1],
      categoryId,
      first
    })

    return {discussions: (data as any).repository.discussions.nodes}

  } catch (error) {
    console.error("Error fetching discussion details:", error)
    throw new Error("Failed to fetch discussion details")
  }
}

console.log(await fetchDiscussions({
  repo: giscusConfig.repo,
  categoryId: giscusConfig.categoryId!,
  first: 1
}))

// console.log((await graphqlWithAuth(`
// query GetDiscussionCategories($repositoryOwner: String!, $repositoryName: String!) {
//   repository(owner: $repositoryOwner, name: $repositoryName) {
//     discussionCategories(first: 100) {
//       nodes {
//         id
//         name
//         slug
//       }
//     }
//   }
// }
// `, {repositoryOwner: giscusConfig.repo.split("/")[0], repositoryName: giscusConfig.repo.split("/")[1]}))
// .repository.discussionCategories.nodes)

// console.log(await graphqlWithAuth(`
// query {
//   viewer {
//     login
//   }
// }`))
