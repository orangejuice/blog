import {visit} from "unist-util-visit"
import {Node} from "unist"
import sharp from "sharp"
import path from "path"
import crypto from "crypto"
import * as fs from "node:fs"
import lockfile from "proper-lockfile"

interface ImageNode extends Node {
  type: string;
  url: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

interface Options {
  publicDir: string;
}

interface ImageUpdate {
  original: string;
  newText: string;
}

export default function remarkImageProcessor(options: Options) {
  return async function transformer(tree: Node, file: any) {
    try {
      const promises: Promise<ImageUpdate | null>[] = []
      const imageUpdates: ImageUpdate[] = []
      const docFilePath = path.join(path.dirname(file.history[0]), file.data.rawDocumentData.sourceFileName)
      const release = lockfile.lockSync(docFilePath)

      visit(tree, "image", (node: ImageNode) => {
        if (node.url) {
          const promise = processImage(node, file.path, options.publicDir)
            .then(update => {
              if (update) imageUpdates.push(update)
              return update
            })
          promises.push(promise)
        }
      })

      if (path.dirname(file.history[0]).includes("/activity/")) {
        promises.push(serveCoverImages(path.dirname(file.history[0]), options.publicDir))
      }

      await Promise.all(promises)

      if (imageUpdates.length > 0) {
        updateMarkdownFile(docFilePath, imageUpdates)
      }

      // transform markdown image nodes to Jsx nodes to retain the custom attributes
      visit(tree, "image", (node: ImageNode, index, parent: any) => {
        if (node.width && node.height && node.blurDataURL) {
          const mdxNode = {
            type: "mdxJsxFlowElement",
            name: "img",
            attributes: [
              {type: "mdxJsxAttribute", name: "src", value: node.url},
              {type: "mdxJsxAttribute", name: "alt", value: node.alt || ""},
              {type: "mdxJsxAttribute", name: "width", value: node.width},
              {type: "mdxJsxAttribute", name: "height", value: node.height},
              {type: "mdxJsxAttribute", name: "placeholder", value: "blur"},
              {type: "mdxJsxAttribute", name: "blurDataURL", value: node.blurDataURL}
            ],
            children: [],
            data: {_mdxExplicitJsx: false} // true will not be captured by custom React Component
          }
          if (node.title) {
            mdxNode.attributes.push({type: "mdxJsxAttribute", name: "title", value: node.title})
          }
          parent.children.splice(index, 1, mdxNode)
        }
      })
      release()
    } catch (e: any) {
      if ("code" in e && e.code != "ELOCKED") {
        console.error(e)
        throw e
      }
    }
  }
}

async function processImage(node: ImageNode, filePath: string, publicDir: string): Promise<ImageUpdate | null> {
  try {
    const originalSrc = node.url
    const fileDir = path.dirname(filePath)

    // Check if the source is an online image
    const isOnlineImage = originalSrc.startsWith("http://") || originalSrc.startsWith("https://")
    let originalPath = isOnlineImage ? await downloadImage(originalSrc, fileDir) : path.resolve(fileDir, originalSrc)

    const fileExt = path.extname(originalPath)
    const fileNameHash = generateFileHash(originalPath)
    const newFileName = `${fileNameHash}${fileExt}`
    const newPath = path.join(publicDir, newFileName)

    // Read and process the image
    const image = sharp(originalPath)
    const metadata = await image.metadata()
    const {width, height} = metadata
    if (width == undefined || height == undefined) return null

    // Ensure the public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, {recursive: true})
    }

    // Resize the image if it's larger than the maximum width
    const maxWidth = 1200
    const resizedImage = width > maxWidth
      ? image.resize({width: maxWidth})
      : image

    // Compress the image to reduce file size
    await resizedImage
      .jpeg({quality: 80}) // Adjust quality to balance between size and quality
      .toFile(newPath)

    // Generate a small, blurred version of the image
    const blurDataURL = await image
      .resize(10) // Resize to small for blur effect
      .blur()
      .toBuffer()
      .then(data => `data:image/png;base64,${data.toString("base64")}`)

    // Get new dimensions after resizing
    const resizedMetadata = await resizedImage.metadata()
    const {width: resizedWidth, height: resizedHeight} = resizedMetadata

    node.url = "/" + path.relative(path.join(process.cwd(), "public"), newPath)
    node.width = resizedWidth
    node.height = resizedHeight
    node.blurDataURL = blurDataURL

    // Return update info if it was an online image
    if (isOnlineImage) {
      console.log(node)
      return {
        original: `![${node.alt}](${originalSrc})`,
        newText: `![${node.alt}](${path.relative(fileDir, originalPath)})`
      }
    }
    return null
  } catch (error) {
    console.error("Error processing image:", error)
    return null
  }
}

async function downloadImage(url: string, destDir: string): Promise<string> {
  const urlPath = new URL(url).pathname
  const filename = path.basename(urlPath)
  const destPath = path.join(destDir, filename)

  // Check if the file already exists
  if (fs.existsSync(destPath)) {
    return destPath
  }

  const response = await fetch(url).then(((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`)
    }
    return response.arrayBuffer()
  }))
  fs.writeFileSync(destPath, Buffer.from(response))
  return destPath
}

export function generateFileHash(filePath: string) {
  const fileBuffer = fs.readFileSync(filePath)
  const hashSum = crypto.createHash("sha256")
  hashSum.update(fileBuffer)
  return hashSum.digest("hex")
}

function updateMarkdownFile(filePath: string, updates: ImageUpdate[]) {
  let content = fs.readFileSync(filePath, "utf8")
  updates.forEach(update => content = content.replace(update.original, update.newText))
  fs.writeFileSync(filePath, content)
}

async function serveCoverImages(dir: string, publicDir: string) {
  for (const file of fs.readdirSync(dir)) {
    if (!file.startsWith("cover.")) continue

    const originalPath = path.join(dir, file)
    const fileExt = path.extname(originalPath)
    const fileNameHash = generateFileHash(originalPath)
    const newFileName = `${fileNameHash}${fileExt}`
    const newPath = path.join(publicDir, newFileName)
    if (!fs.existsSync(newPath)) {
      await sharp(originalPath).resize({width: 500}).jpeg({quality: 80}).toFile(newPath)
    }
  }
  return null
}
