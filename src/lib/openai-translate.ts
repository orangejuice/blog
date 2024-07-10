import {ChatCompletionMessageParam, ChatCompletionTool} from "openai/resources/chat/completions"
import {jsonrepair} from "jsonrepair"
import {OpenAI} from "openai"

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

type Input = {
  title: string
  subtitle: string
  category: string
  comment: string
  history?: string[]
}

type Output = Omit<Input, "category"> & {history?: string[]}

// @ts-ignore
export async function translateCreativeWork(input: Input): Promise<Output> {
  const functionDefinition: (history: boolean) => ChatCompletionTool = (history) => ({
    type: "function",
    function: {
      name: "output_translate_result",
      description: "This function accepts the translated Book, Movie or TV Show details as parameters",
      parameters: {
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
        required: history ? ["title", "subtitle", "comment", "history"] : ["title", "subtitle", "comment"]
      }
    }
  })

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are a professional translator from Chinese to English, specializing in Book, Movie and TV Shows."
    },
    {
      role: "user",
      content: `Translate the following creative work details from Chinese to English. 
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
If history comments are provided as an array, you must translate each comment and return them as an array in the original order within 'history' property.`
    }
  ]

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: messages,
    tools: [functionDefinition(!!input.history)],
    tool_choice: "required"
  })

  const toolCalls = response.choices[0].message.tool_calls
  const argument = toolCalls && toolCalls[0].function.arguments
  try {
    if (argument) {
      return JSON.parse(jsonrepair(argument))
    } else {
      throw new Error("Failed to get proper translation from OpenAI")
    }
  } catch (error) {
    console.error(argument && jsonrepair(argument))
    throw error
  }
}
