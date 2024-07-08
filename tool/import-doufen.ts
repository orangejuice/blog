import * as fs from "fs"
import * as path from "path"
import PQueue from "p-queue"
import yaml from "yaml"
// @ts-ignore
import tofu from "./tofu.json"
import {translateCreativeWork} from "@/lib/openai-translate"

const OUTPUT_DIR = "data/activity"

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR)
}

const sanitizeFilename = (title: string): string => {
  return title.toLowerCase().replace(/[\/\\?%*:|' "<>,&.~，：]/g, "-").replace(/-+/g, "-")
}

const sanitizeContent = (content: string): string => {
  return content.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const queue = new PQueue({concurrency: 10})

queue.on("completed", result => {
  console.log(result.join(" | "))
})

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
    const year = interest.interest.subject.year || interest.interest.subject.pubdate[0]
    const doubanID = interest.interest.subject.id ?? ""
    const createdDate = interest.interest.create_time?.concat("+08:00")
    const rating = interest.interest.rating?.value ?? 0
    const comment = interest.interest.comment
    const cover = interest.interest.subject.cover_url
    const history: {date: string, comment: string, rating: number, status: string}[] | undefined = interest.history ? [] : undefined

    history && Object.entries(interest.history).forEach(([_, {comment, rating, status, create_time}]: any) => {
      history.push({date: create_time, comment, rating: rating?.value, status: status == "mark" ? "todo" : status})
    })

    const dict = `${category}-${sanitizeFilename(title + (year ? `-${year.match(/\d{4}/)[0]}` : ""))}`
    if (!fs.existsSync(path.join(OUTPUT_DIR, dict))) {
      fs.mkdirSync(path.join(OUTPUT_DIR, dict))
    }

    if (title == "未知电影") {
      console.log(dict, doubanID)
      continue
    }

    cover && queue.add(() => downloadImage(cover, path.join(OUTPUT_DIR, dict)))

    const frontmatter = {
      title, category, status, rating, year, date: createdDate,
      douban: {
        id: doubanID, title, subtitle: doubanSubtitle, intro: doubanIntro, rating: doubanRating, cover,
        link: doubanLink, history
      }
    }

    if (!fs.existsSync(path.join(OUTPUT_DIR, dict, "record.en.md"))) {
      const historyToTranslate = (history && history.filter(h => !!h.comment).length > 0) ? history.filter(h => !!h.comment).map(h => h.comment) : undefined
      const translated = await translateCreativeWork({
        title, subtitle: doubanSubtitle, category, comment,
        history: historyToTranslate
      })
      let historyTranslated = history
      if (history && historyToTranslate) {
        let i = 0
        historyTranslated = history.map(h => {
          if (h.comment) {
            if (!translated.history?.[i]) throw Error("translation failed")
            return {...h, comment: translated.history[i++]}
          }
          return h
        })
      }
      const enFrontmatter = {
        title: translated.title, category, status, rating, year, date: createdDate,
        douban: {
          rating: doubanRating,
          subtitle: translated.subtitle,
          history: historyTranslated
        }
      }
      const content = "---\n".concat(yaml.stringify(enFrontmatter), "---\n\n")
        .concat(sanitizeContent(translated.comment ?? ""), "\n")

      fs.writeFileSync(path.join(OUTPUT_DIR, dict, "record.en.md"), content, "utf8")
    }

    const content = "---\n".concat(yaml.stringify(frontmatter), "---\n\n")
      .concat(sanitizeContent(comment ?? ""), "\n")

    fs.writeFileSync(path.join(OUTPUT_DIR, dict, "record.md"), content, "utf8")
    // execSync(`git add "${path.join(OUTPUT_DIR, dict, "record.md")}"`, {stdio: "inherit"})
    // execSync(`git add "${path.join(OUTPUT_DIR, dict, "record.en.md")}"`, {stdio: "inherit"})
  } catch (err) {
    console.log(interest)
    throw err
  }
}

async function downloadImage(url: string, destDir: string) {
  const urlPath = new URL(url).pathname
  const fileExt = path.extname(urlPath)
  const destPath = path.join(destDir, `cover${fileExt}`)
  const destPathWebP = path.join(destDir, `cover.webp`)

  if (fs.existsSync(destPath) || fs.existsSync(destPathWebP)) return [destPath]

  return await fetch(url).then((async (response) => {
    if (response.ok) {
      fs.writeFileSync(destPath, Buffer.from(await response.arrayBuffer()))
      // execSync(`git add "${destPath}"`, {stdio: "inherit"})
      return [destPath, "downloaded"]
    } else return [destPath, `HTTP error ${response.status}`]
  }))
}
