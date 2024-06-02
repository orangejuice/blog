/* 2024-05-27 */
const fs = require("fs")
const path = require("path")

function findAndRenameMdFiles(dir) {
  fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    files.forEach((file) => {
      const fullPath = path.join(dir, file.name)

      if (file.isDirectory()) {
        findAndRenameMdFiles(fullPath)
      } else if (file.isFile() && path.extname(file.name) === ".md") {
        const fileName = path.basename(file.name, ".md")
        const fileParts = fileName.split(".")

        let newFileName
        if (fileName === "index") {
          newFileName = "post.en.md"
        } else if (fileParts.length === 2 && fileParts[0] === "index") {
          const lang = fileParts[1]
          newFileName = `post.${lang}.md`
        }

        if (newFileName) {
          const newPath = path.join(dir, newFileName)
          fs.rename(fullPath, newPath, (err) => {
            if (err) {
              console.error(`Error renaming file ${fullPath} to ${newPath}: ${err.message}`)
            } else {
              console.log(`Renamed ${fullPath} to ${newPath}`)
            }
          })
        }
      }
    })
  })
}

findAndRenameMdFiles(__dirname)
