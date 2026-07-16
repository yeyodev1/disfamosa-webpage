export type GalleryCategoryId = 'banos' | 'closets' | 'cocinas' | 'especiales' | 'lavanderias'

export interface GalleryImage {
  sourceFilename: string
  projectId: string
  secureUrl: string | null
  width: number
  height: number
  format: string
  orientation: 'landscape' | 'portrait' | 'square'
  alt: string
  featured: boolean
  published: boolean
  sortOrder: number
  qualityScore?: number
  analysis?: string
}

export interface GalleryProject {
  id: string
  name: string
  images: GalleryImage[]
  sortOrder: number
}

export interface GalleryCategory {
  categoryId: GalleryCategoryId
  name: string
  projectCount: number
  imageCount: number
  projects: GalleryProject[]
}

export interface CategoryPresentation {
  id: GalleryCategoryId
  name: string
  description: string
  route: string
}
