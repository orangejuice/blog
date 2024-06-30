import * as fs from "fs"
import * as path from "path"
import {format} from "@/lib/utils"
import PQueue from "p-queue"
import yaml from "yaml"
// @ts-ignore
import tofu from "./tofu.json"

const OUTPUT_DIR = "data/activity"

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR)
}

const sanitizeFilename = (title: string): string => {
  return title.replace(/[\/\\?%*:|' "<>]/g, "-")
}

const sanitizeContent = (content: string): string => {
  return content.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const queue = new PQueue({concurrency: 10})

for (const interest of (tofu as Record<any, any>).interest) {
  try {
    const category = interest.type
    const status = interest.status == "mark" ? "todo" : interest.status
    if (!["movie", "book"].includes(category)) continue

    const title = interest.interest.subject.title
    const doubanSubtitle = interest.interest.subject.card_subtitle ?? ""
    const doubanIntro = interest.interest.subject.intro
    const doubanRating = interest.interest.subject.rating.value ?? ""
    const doubanLink = interest.interest.subject.url
    const doubanID = interest.interest.subject.id ?? ""
    const createdDate = interest.interest.create_time
    const rating = interest.interest.rating?.value ?? 0
    const comment = interest.interest.comment
    const cover = interest.interest.subject.cover_url

    const formattedDate = format(createdDate, {date: true})
    const dict = `${formattedDate}-${sanitizeFilename(title)}`
    if (!fs.existsSync(path.join(OUTPUT_DIR, dict))) {
      fs.mkdirSync(path.join(OUTPUT_DIR, dict))
    }
    const filePath = path.join(OUTPUT_DIR, dict, "record.md")

    cover && queue.add(() => downloadImage(cover, path.join(OUTPUT_DIR, dict)))

    const frontmatter = {
      title, category, status, rating, date: createdDate,
      douban: {id: doubanID, title, subtitle: doubanSubtitle, intro: doubanIntro, rating: doubanRating, cover, link: doubanLink}
    }
    const content = "---\n".concat(yaml.stringify(frontmatter)).concat("---\n\n")
      .concat(sanitizeContent(comment ?? ""))

    fs.writeFileSync(filePath, content, "utf8")

  } catch (err) {
    console.log(interest)
    throw err
  }
}

queue.on("completed", result => {
  console.log(result.join(" | "))
})

async function downloadImage(url: string, destDir: string) {
  const urlPath = new URL(url).pathname
  const fileExt = path.extname(urlPath)
  const destPath = path.join(destDir, `cover${fileExt}`)
  const destPathWebP = path.join(destDir, `cover.webp`)

  if (fs.existsSync(destPath) || fs.existsSync(destPathWebP)) return [destPath]

  return await fetch(url).then((async (response) => {
    if (response.ok) {
      fs.writeFileSync(destPath, Buffer.from(await response.arrayBuffer()))
      return [destPath, "downloaded"]
    } else return [destPath, `HTTP error ${response.status}`]
  }))
}
