import {revalidatePath} from "next/cache"
import {NextRequest, NextResponse} from "next/server"
import {format} from "@formkit/tempo"


export async function POST(request: NextRequest) {
  revalidatePath("/", "layout")
  console.log(format(new Date(), "YYYY-MM-DD HH:mm:ss"), "[cache]revalidate")

  return NextResponse.json("Success!", {status: 200})
}
