import * as fs from "fs"
import * as path from "path"
import yaml from "yaml"
import {translateCreativeWork} from "@/lib/openai-translate"
import matter from "gray-matter"

const OUTPUT_DIR = "data/activity"


const sanitizeContent = (content: string): string => {
  return content.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

async function traverse(dir: string) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const dict = path.join(dir, file)
    const stat = fs.statSync(dict)

    if (stat.isDirectory() && fs.existsSync(path.join(dict, "record.md")) && !fs.existsSync(path.join(dict, "record.en.md"))) {
      const fileContents = fs.readFileSync(path.join(dict, "record.md"), "utf8")
      const {data, content} = matter(fileContents)

      const translated = await translateCreativeWork({
        title: data.title, subtitle: data.douban.subtitle, category: data.category, comment: content
      })

      const enFrontmatter = {
        title: translated.title, category: data.category, status: data.status, rating: data.rating, year: data.year, date: data.date,
        douban: {
          rating: data.douban.rating,
          subtitle: translated.subtitle
        }
      }
      const str = "---\n".concat(yaml.stringify(enFrontmatter), "---\n\n")
        .concat(sanitizeContent(translated.comment ?? ""), "\n")

      fs.writeFileSync(path.join(dict, "record.en.md"), str, "utf8")

      console.log(dict, "translated")
    }
  }
}

void traverse(path.join(process.cwd(), OUTPUT_DIR))
