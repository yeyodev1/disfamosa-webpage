import banosData from '@/data/gallery/banos/projects.json'
import closetsData from '@/data/gallery/closets/projects.json'
import cocinasData from '@/data/gallery/cocinas/projects.json'
import especialesData from '@/data/gallery/especiales/projects.json'
import lavanderiasData from '@/data/gallery/lavanderias/projects.json'
import type { CategoryPresentation, GalleryCategory, GalleryCategoryId, GalleryImage } from '@/types/gallery'

export const categoryPresentation: CategoryPresentation[] = [
  {
    id: 'cocinas',
    name: 'Cocinas',
    description: 'Espacios precisos donde diseño, circulación y almacenamiento trabajan juntos.',
    route: '/proyectos/cocinas',
  },
  {
    id: 'banos',
    name: 'Baños',
    description: 'Mobiliario a medida para ambientes íntimos, funcionales y duraderos.',
    route: '/proyectos/banos',
  },
  {
    id: 'closets',
    name: 'Closets',
    description: 'Organización personalizada que aprovecha cada centímetro disponible.',
    route: '/proyectos/closets',
  },
  {
    id: 'especiales',
    name: 'Especiales',
    description: 'Soluciones únicas para salas, oficinas, bares y espacios singulares.',
    route: '/proyectos/especiales',
  },
  {
    id: 'lavanderias',
    name: 'Lavanderías',
    description: 'Orden y resistencia para convertir áreas de servicio en espacios eficientes.',
    route: '/proyectos/lavanderias',
  },
]

export const galleryCategories: Record<GalleryCategoryId, GalleryCategory> = {
  banos: banosData as GalleryCategory,
  closets: closetsData as GalleryCategory,
  cocinas: cocinasData as GalleryCategory,
  especiales: especialesData as GalleryCategory,
  lavanderias: lavanderiasData as GalleryCategory,
}

export function getCategoryCover(categoryId: GalleryCategoryId): GalleryImage | undefined {
  return galleryCategories[categoryId].projects
    .flatMap((project) => project.images)
    .find((image) => image.published && image.secureUrl && image.orientation === 'landscape')
}

export function getCategoryPresentation(categoryId: string): CategoryPresentation | undefined {
  return categoryPresentation.find((category) => category.id === categoryId)
}
