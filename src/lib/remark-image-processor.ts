import {visit} from "unist-util-visit"
import {Node} from "unist"
import sharp from "sharp"
import path from "path"
import crypto from "crypto"
import * as fs from "node:fs"

interface ImageNode extends Node {
  tagName: string;
  properties: {
    src: string;
    width?: number;
    height?: number;
    blurDataURL?: string;
  };
}

interface Options {
  publicDir: string;
}

export default function rehypeImageProcessor(options: Options) {
  return async function transformer(tree: Node, file: any) {
    const promises: Promise<void>[] = []

    visit(tree, "element", (node: ImageNode) => {
      if (node.tagName === "img" && node.properties && node.properties.src) {
        const promise = processImage(node, file.path, options.publicDir)
        promises.push(promise)
      }
    })

    await Promise.all(promises)
  }
}

async function processImage(node: ImageNode, filePath: string, publicDir: string) {
  try {
    const originalSrc = node.properties.src
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
    if (width == undefined || height == undefined) return

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

    node.properties.src = "/" + path.relative(path.join(process.cwd(), "public"), newPath)
    node.properties.width = resizedWidth
    node.properties.height = resizedHeight
    node.properties.blurDataURL = blurDataURL
  } catch (error) {
    console.error("Error processing image:", error)
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

function generateFileHash(filePath: string) {
  const fileBuffer = fs.readFileSync(filePath)
  const hashSum = crypto.createHash("sha256")
  hashSum.update(fileBuffer)
  return hashSum.digest("hex")
}
