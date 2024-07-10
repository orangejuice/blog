import {jsonrepair} from "jsonrepair"
import {Anthropic} from "@anthropic-ai/sdk"
import {MessageParam, Tool} from "@anthropic-ai/sdk/resources/messages"

const claude = new Anthropic({apiKey: process.env.OPENAI_API_KEY})

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
  const functionDefinition: Tool = {
    name: "translate",
    description: "Translate Book, Movie or TV Show details from Chinese to English",
    input_schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Translated title. Use well-known English title if available."
        },
        subtitle: {
          type: "string",
          description: "Translated subtitle of the Book, Movie or TV Show"
        },
        comment: {
          type: "string",
          description: "Translated comment of the Book, Movie or TV Show"
        },
        history: {
          type: "array",
          items: {type: "string"},
          description: "Array of translated history comments"
        }
      },
      required: ["title", "subtitle", "comment"]
    }
  }

  const messages: MessageParam[] = [
    {
      role: "user",
      content: `Translate the following creative work details from Chinese to English. 
      The work is a ${input.category}.
      Title: ${input.title}
      Subtitle: ${input.subtitle}
      Comment: ${input.comment}
      History Comments: ${input.history ? JSON.stringify(input.history) : "Not provided"}
      
      For well-known Book, Movie, TV Show names or person names, use the well-known English name. 
      For names without well-known corresponding translation, make the best effort to translate properly.
      If any part is already in English, keep it as is.
      If history comments are provided, translate each comment and return them as an array in the same order.`
    }
  ]

  const response = await claude.messages.create({
    model: "claude-3-5-sonnet-20240620",
    messages: messages,
    system: "You are a professional translator from Chinese to English, specializing in creative works.",
    max_tokens: Infinity,
    tools: [functionDefinition],
    tool_choice: {name: "translate", type: "tool"}
  })

  const argument = response.content[0].type == "tool_use" && response.content[0].input as string
  try {
    if (argument) {
      const result: Omit<CreativeWorkOutput, "slug"> = JSON.parse(jsonrepair(argument))
      const slug = generateSlug(result.title)
      return {...result, slug}
    } else {
      throw new Error("Failed to get proper translation from OpenAI")
    }
  } catch (error) {
    console.error(argument && jsonrepair(argument))
    throw error
  }
}
