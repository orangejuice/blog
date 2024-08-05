import {generateObject} from "ai"
import {z} from "zod"
import {openai} from "@ai-sdk/openai"


type Input = {
  title: string
  subtitle: string
  category: string
  comment: string
  history?: string[]
}

export async function translateWork(input: Input) {
  const {object} = await generateObject({
    model: openai("gpt-4-turbo"),
    system: "You are a professional translator from Chinese to English, specializing in Book, Movie and TV Shows.",
    prompt: `
Translate the following creative work details from Chinese to English. 
The work is a ${input.category}.

# Title
${input.title}

# Subtitle
${input.subtitle}

# Comment
${input.comment}

# History Comments
${input.history ? JSON.stringify(input.history) : "Not provided"}

For well-known Book, Movie, TV Show names or person names, use the well-known English name. 
For names without well-known corresponding translation, make the best effort to translate properly.
If any part is already in English, keep it as is.
If history comments are provided as an array, you must translate each comment and return them as an array in the original order within 'history' property.
`,
    schema: z.object({
      title: z.string(),
      subtitle: z.string(),
      comment: z.string(),
      history: z.array(z.string()).optional().describe("Array of translated history comments")
    })
  })
  return object
}
