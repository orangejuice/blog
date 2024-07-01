import * as fs from "fs"
import * as path from "path"

function renameFiles(dir: string): void {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      renameFiles(filePath) // Recursively process subdirectories
    } else if (stat.isFile()) {
      if (file.startsWith("cover.zh.")) {
        const newName = file.replace("cover.zh.", "cover.")
        const newPath = path.join(dir, newName)
        fs.renameSync(filePath, newPath)
        console.log(`Renamed: ${filePath} -> ${newPath}`)
      }
    }
  }
}

// Start the renaming process from the current directory
renameFiles(process.cwd())

console.log("Renaming process completed.")
