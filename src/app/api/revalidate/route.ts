import {revalidatePath} from "next/cache"
import {NextRequest, NextResponse} from "next/server"
import {format} from "@/lib/utils"

export async function POST(request: NextRequest) {
  revalidatePath("/", "layout")
  console.log(format(new Date()), "[cache]revalidate")

  return NextResponse.json("Success!", {status: 200})
}
