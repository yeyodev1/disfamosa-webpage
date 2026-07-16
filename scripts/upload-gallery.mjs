import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const CATEGORY_CONFIG = [
  { directory: 'BAÑOS', id: 'banos', name: 'Baños', singular: 'Baño' },
  { directory: 'CLOSETS', id: 'closets', name: 'Closets', singular: 'Closet' },
  { directory: 'COCINAS', id: 'cocinas', name: 'Cocinas', singular: 'Cocina' },
  { directory: 'ESPECIALES', id: 'especiales', name: 'Especiales', singular: 'Especial' },
  { directory: 'LAVANDERIAS', id: 'lavanderias', name: 'Lavanderías', singular: 'Lavandería' },
]

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg'])
const catalogOnly = process.argv.includes('--catalog-only')
const sourceDir = process.env.GALLERY_SOURCE_DIR
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDir, '..')
const outputRoot = path.join(projectRoot, 'src', 'data', 'gallery')

function normalizeText(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function normalizeId(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function naturalCompare(left, right) {
  return left.localeCompare(right, 'es', { numeric: true, sensitivity: 'base' })
}

async function findCategoryDirectory(expectedName) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true })
  const expectedId = normalizeId(expectedName)
  const match = entries.find((entry) => entry.isDirectory() && normalizeId(entry.name) === expectedId)

  if (!match) {
    throw new Error(`Missing category directory: ${expectedName}`)
  }

  return path.join(sourceDir, match.name)
}

function projectStem(filename, category) {
  const extension = path.extname(filename)
  const stem = path.basename(filename, extension).trim()
  const categoryPrefix = new RegExp(`^${normalizeText(category.singular)}\\s+`, 'i')
  return normalizeText(stem).replace(categoryPrefix, '').trim()
}

function splitVariant(stem) {
  if (/^img[\s_-]*\d+$/i.test(stem)) {
    return { root: stem, variant: null }
  }

  const match = stem.match(/^(.*?)[\s_-]*(\d+)$/)
  if (!match || !/[a-z]/i.test(match[1])) {
    return { root: stem, variant: null }
  }

  return { root: match[1].trim(), variant: Number(match[2]) }
}

function assignProjectStems(files, category) {
  const stems = files.map((filename) => projectStem(filename, category))
  const normalizedStems = new Set(stems.map(normalizeId))
  const rootCounts = new Map()

  for (const stem of stems) {
    const { root, variant } = splitVariant(stem)
    if (variant !== null) {
      const rootId = normalizeId(root)
      rootCounts.set(rootId, (rootCounts.get(rootId) ?? 0) + 1)
    }
  }

  return files.map((filename, index) => {
    const stem = stems[index]
    const { root, variant } = splitVariant(stem)
    const rootId = normalizeId(root)
    const isVariant = variant !== null && (normalizedStems.has(rootId) || (rootCounts.get(rootId) ?? 0) > 1)

    return {
      filename,
      projectLabel: isVariant ? root : stem,
      projectId: normalizeId(isVariant ? root : stem),
      variant: isVariant ? variant : null,
    }
  })
}

function readJpegDimensions(buffer, filename) {
  if (buffer.length < 4 || buffer.readUInt16BE(0) !== 0xffd8) {
    throw new Error(`Unsupported or invalid JPEG: ${filename}`)
  }

  let offset = 2
  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }

    const marker = buffer[offset + 1]
    offset += 2
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue
    }

    if (offset + 2 > buffer.length) break
    const segmentLength = buffer.readUInt16BE(offset)
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)
    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      }
    }

    if (segmentLength < 2) break
    offset += segmentLength
  }

  throw new Error(`Could not read JPEG dimensions: ${filename}`)
}

function orientation(width, height) {
  if (width === height) return 'square'
  return width > height ? 'landscape' : 'portrait'
}

function imageSlug(filename) {
  return normalizeId(path.basename(filename, path.extname(filename)))
}

function uniqueImageSlugs(items) {
  const counts = new Map()
  for (const item of items) {
    const slug = imageSlug(item.filename)
    counts.set(slug, (counts.get(slug) ?? 0) + 1)
  }

  return new Map(items.map((item) => {
    const slug = imageSlug(item.filename)
    if (counts.get(slug) === 1) return [item.filename, slug]
    const suffix = createHash('sha1').update(item.filename).digest('hex').slice(0, 8)
    return [item.filename, `${slug}-${suffix}`]
  }))
}

function cloudinarySignature(parameters, apiSecret) {
  const payload = Object.entries(parameters)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return createHash('sha1').update(`${payload}${apiSecret}`).digest('hex')
}

async function uploadImage(filePath, publicId, credentials) {
  const parameters = {
    overwrite: 'true',
    public_id: publicId,
    timestamp: String(Math.floor(Date.now() / 1000)),
  }
  const form = new FormData()
  const bytes = await fs.readFile(filePath)

  form.set('file', new Blob([bytes]), path.basename(filePath))
  form.set('api_key', credentials.apiKey)
  form.set('overwrite', parameters.overwrite)
  form.set('public_id', parameters.public_id)
  form.set('timestamp', parameters.timestamp)
  form.set('signature', cloudinarySignature(parameters, credentials.apiSecret))

  const response = await fetch(`https://api.cloudinary.com/v1_1/${credentials.cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(`Cloudinary upload failed for ${path.basename(filePath)}: ${result.error?.message ?? response.statusText}`)
  }

  return result
}

async function existingImagesFor(categoryId) {
  const manifestPath = path.join(outputRoot, categoryId, 'projects.json')

  try {
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
    return new Map(
      manifest.projects.flatMap((project) => project.images).map((image) => [image.sourceFilename, image]),
    )
  } catch (error) {
    if (error.code === 'ENOENT') return new Map()
    throw error
  }
}

async function buildCategory(category, credentials) {
  const categorySourceDir = await findCategoryDirectory(category.directory)
  const existingImages = await existingImagesFor(category.id)
  const filenames = (await fs.readdir(categorySourceDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort(naturalCompare)
  const assignments = assignProjectStems(filenames, category)
  const slugs = uniqueImageSlugs(assignments)
  const grouped = new Map()

  for (const assignment of assignments) {
    const group = grouped.get(assignment.projectId) ?? {
      id: assignment.projectId,
      name: assignment.projectLabel,
      images: [],
    }
    group.images.push(assignment)
    grouped.set(assignment.projectId, group)
  }

  const projects = [...grouped.values()]
    .sort((left, right) => naturalCompare(left.name, right.name))

  for (const [projectIndex, project] of projects.entries()) {
    project.sortOrder = projectIndex + 1
    project.images.sort((left, right) => {
      if (left.variant !== null && right.variant !== null) return left.variant - right.variant
      if (left.variant === null && right.variant !== null) return -1
      if (left.variant !== null && right.variant === null) return 1
      return naturalCompare(left.filename, right.filename)
    })

    project.images = await Promise.all(project.images.map(async (assignment, imageIndex) => {
      const filePath = path.join(categorySourceDir, assignment.filename)
      const localDimensions = readJpegDimensions(await fs.readFile(filePath), assignment.filename)
      const publicId = `disfamosa/gallery/${category.id}/${project.id}/${slugs.get(assignment.filename)}`
      const uploaded = catalogOnly ? null : await uploadImage(filePath, publicId, credentials)
      const width = uploaded?.width ?? localDimensions.width
      const height = uploaded?.height ?? localDimensions.height
      const existing = existingImages.get(assignment.filename)

      return {
        sourceFilename: assignment.filename,
        projectId: project.id,
        secureUrl: uploaded?.secure_url ?? existing?.secureUrl ?? null,
        width,
        height,
        format: uploaded?.format ?? 'jpg',
        orientation: orientation(width, height),
        alt: existing?.alt ?? `${category.singular} ${project.name} - imagen ${imageIndex + 1}`,
        featured: existing?.featured ?? imageIndex === 0,
        published: existing?.published ?? true,
        sortOrder: imageIndex + 1,
        ...(existing?.qualityScore ? { qualityScore: existing.qualityScore } : {}),
        ...(existing?.analysis ? { analysis: existing.analysis } : {}),
      }
    }))
  }

  return {
    categoryId: category.id,
    name: category.name,
    projectCount: projects.length,
    imageCount: filenames.length,
    projects,
  }
}

async function main() {
  if (!sourceDir) {
    throw new Error('GALLERY_SOURCE_DIR is required')
  }

  const credentials = catalogOnly ? null : {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  }
  if (!catalogOnly && Object.values(credentials).some((value) => !value)) {
    throw new Error('CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are required')
  }

  const categories = []
  for (const category of CATEGORY_CONFIG) {
    const catalog = await buildCategory(category, credentials)
    const categoryOutputDir = path.join(outputRoot, category.id)
    await fs.writeFile(path.join(categoryOutputDir, 'projects.json'), `${JSON.stringify(catalog, null, 2)}\n`)
    categories.push({
      id: catalog.categoryId,
      name: catalog.name,
      projectCount: catalog.projectCount,
      imageCount: catalog.imageCount,
      dataPath: `./${catalog.categoryId}/projects.json`,
    })
  }

  const index = {
    projectCount: categories.reduce((total, category) => total + category.projectCount, 0),
    imageCount: categories.reduce((total, category) => total + category.imageCount, 0),
    categories,
  }
  await fs.writeFile(path.join(outputRoot, 'index.json'), `${JSON.stringify(index, null, 2)}\n`)
  console.log(`Generated ${index.imageCount} images in ${index.projectCount} projects across ${categories.length} categories${catalogOnly ? ' (catalog only)' : ''}.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
