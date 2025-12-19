import fs from "fs"
import path from "path"

// CONFIG
const PUBLIC_DIR = path.join(process.cwd(), "public")
const CODE_DIRS = ["src", "app", "components", "styles"]
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".svg"]

// --- Helpers ---
function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      walk(fullPath, fileList)
    } else {
      fileList.push(fullPath)
    }
  }
  return fileList
}

// --- Step 1: Collect all images in public ---
const allImages = walk(PUBLIC_DIR)
  .filter(file => IMAGE_EXTENSIONS.includes(path.extname(file)))
  .map(file => file.replace(PUBLIC_DIR, "").replace(/\\/g, "/"))

console.log(`📸 Found ${allImages.length} images in /public`)

// --- Step 2: Collect all code text ---
let codeText = ""
for (const dir of CODE_DIRS) {
  const fullDir = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullDir)) continue

  const files = walk(fullDir)
  for (const file of files) {
    if (/\.(js|ts|jsx|tsx|css)$/.test(file)) {
      codeText += fs.readFileSync(file, "utf8")
    }
  }
}

// --- Step 3: Check usage ---
const unusedImages = allImages.filter(img => !codeText.includes(img))

// --- Output ---
console.log("\n🧹 Unused image candidates:\n")
unusedImages.forEach(img => console.log(img))

console.log(`\n✅ ${unusedImages.length} unused image(s) detected`)
console.log("⚠️ This is a DRY RUN. No files were deleted.")
