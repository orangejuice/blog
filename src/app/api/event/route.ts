import {NextRequest, NextResponse} from "next/server"

const clientConnections = new Map<string, ReadableStreamDefaultController[]>()

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")
  if (!slug) return NextResponse.json({error: "slug is required"}, {status: 400})

  const stream = new ReadableStream({
    start(controller) {
      if (clientConnections.has(slug)) clientConnections.get(slug)?.push(controller)
      else clientConnections.set(slug, [controller])

      const keepAlive = setInterval(() => {
        controller.enqueue(new TextEncoder().encode(": keepalive\n\n"))
      }, 30000)

      request.signal.addEventListener("abort", () => {
        clearInterval(keepAlive)
        const connections = clientConnections.get(slug)
        connections?.splice(connections.indexOf(controller), 1)
      })
    }
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    }
  })
}


export async function POST(request: NextRequest) {
  const body = await request.json()
  const {slug} = body

  clientConnections.get(slug)?.forEach(controller => {
    controller?.enqueue(new TextEncoder().encode(`data: created\n\n`))
  })

  return NextResponse.json({status: "Message sent"})
}
