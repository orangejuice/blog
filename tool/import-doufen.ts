import * as xlsx from "xlsx"
import * as fs from "fs"
import * as path from "path"
import {format} from "@/lib/utils"

const EXCEL_FILE_PATH = "tool/data.xlsx"
const OUTPUT_DIR = "data/activity"

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR)
}

const workbook = xlsx.readFile(EXCEL_FILE_PATH)

const sanitizeFilename = (title: string): string => {
  return title.replace(/[\/\\?%*:|' "<>]/g, "-")
}

const sanitizeContent = (content: string): string => {
  return content.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName]
  const rows = xlsx.utils.sheet_to_json(sheet)
  const categoryMap = {
    "看过": "movie", "在看": "movie", "想看": "movie",
    "读过": "book", "在读": "book", "想读": "book"
  }
  const statusMap = {
    "看过": "done", "在看": "doing", "想看": "todo",
    "读过": "done", "在读": "doing", "想读": "todo"
  }

  if (!(sheetName in categoryMap)) continue

  rows.forEach((row: any) => {
    const title = row["标题"]
    const doubanIntro = row["简介"]
    const doubanRating = row["豆瓣评分"]
    const doubanLink = row["链接"]
    const doubanID = row["链接"].split("/").slice(-2)[0]
    const createdDate = row["创建时间"]
    const rating = row["我的评分"]
    const comment = row["评论"]
    // @ts-ignore
    const category = categoryMap[sheetName]
    // @ts-ignore
    const status = statusMap[sheetName]

    const formattedDate = format(createdDate, {date: true})
    const fileName = `${formattedDate}-${sanitizeFilename(title)}.md`
    const filePath = path.join(OUTPUT_DIR, fileName)

    const content = `---
title: "${title}"
category: "${category}"
status: "${status}"
rating: ${rating ?? ""}
date: "${createdDate}"
douban:
  intro: "${doubanIntro ?? ""}"
  rating: ${doubanRating ?? ""}
  link: "${doubanLink ?? ""}"
  id: "${doubanID ?? ""}"
---

${sanitizeContent(comment ?? "")}
`
    fs.writeFileSync(filePath, content, "utf8")
  })
}

console.log("done")
