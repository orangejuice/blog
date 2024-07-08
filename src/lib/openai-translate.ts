import OpenAI from "openai"
import {ChatCompletionCreateParams, ChatCompletionMessageParam} from "openai/resources/chat/completions"
import {jsonrepair} from "jsonrepair"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

type CreativeWorkInput = {
  title: string
  subtitle: string
  category: "movie" | "tv show" | "book"
  comment: string
  history?: string[]
}

type CreativeWorkOutput = Omit<CreativeWorkInput, "category"> & {
  slug: string
  history?: string[]
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// @ts-ignore
export async function translateCreativeWork(input: CreativeWorkInput): Promise<CreativeWorkOutput> {
  const functionDefinition: ChatCompletionCreateParams.Function = {
    name: "translate_creative_work",
    description: "Translate creative work details from Chinese to English",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Translated title of the creative work. Use well-known English title if available."
        },
        subtitle: {
          type: "string",
          description: "Translated subtitle or metadata of the creative work"
        },
        comment: {
          type: "string",
          description: "Translated comment about the creative work"
        },
        history: {
          type: "array",
          items: {type: "string"},
          description: "Array of translated historical comments"
        }
      },
      required: ["title", "subtitle", "comment"]
    }
  }

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are a professional translator from Chinese to English, specializing in creative works."
    },
    {
      role: "user",
      content: `Translate the following creative work details from Chinese to English. 
      The work is a ${input.category}.
      Title: ${input.title}
      Subtitle: ${input.subtitle}
      Comment: ${input.comment}
      History Comments: ${input.history ? JSON.stringify(input.history) : "Not provided"}
      
      For well-known creative work names or person names, use the well-known English translation. 
      For names without well-known translations, make the best effort to translate properly.
      If any part is already in English, keep it as is.
      If history comments are provided, translate each comment and return them as an array in the same order.`
    }
  ]

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messages,
    functions: [functionDefinition],
    function_call: {name: "translate_creative_work"}
  })

  const functionCall = response.choices[0].message.function_call

  try {
    if (functionCall && functionCall.arguments) {
      const result: Omit<CreativeWorkOutput, "slug"> = JSON.parse(jsonrepair(functionCall.arguments))
      const slug = generateSlug(result.title)
      return {...result, slug}
    } else {
      throw new Error("Failed to get proper translation from OpenAI")
    }
  } catch (error) {
    console.error(functionCall && jsonrepair(functionCall.arguments))
    throw error
  }
}
