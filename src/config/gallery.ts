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
    coverUrl: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226646/disfamosa/gallery/cocinas/ip/cocina-ip.jpg',
  },
  {
    id: 'banos',
    name: 'Baños',
    description: 'Mobiliario a medida para ambientes íntimos, funcionales y duraderos.',
    route: '/proyectos/banos',
    coverUrl: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226603/disfamosa/gallery/banos/iv/bano-iv2.jpg',
  },
  {
    id: 'closets',
    name: 'Closets',
    description: 'Organización personalizada pensando siempre en la funcionalidad.',
    route: '/proyectos/closets',
    coverUrl: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226622/disfamosa/gallery/closets/iv/closet-iv11.jpg',
  },
  {
    id: 'especiales',
    name: 'Especiales',
    description: 'Soluciones únicas para dormitorios, alacenas y otros espacios singulares.',
    route: '/proyectos/especiales',
  },
  {
    id: 'lavanderias',
    name: 'Lavanderías',
    description: 'Orden y resistencia para convertir áreas de servicio en espacios eficientes.',
    route: '/proyectos/lavanderias',
    coverUrl: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226676/disfamosa/gallery/lavanderias/ag/lavanderia-ag2.jpg',
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
  const presentation = categoryPresentation.find((c) => c.id === categoryId)
  if (presentation?.coverUrl) {
    const foundImage = galleryCategories[categoryId].projects
      .flatMap((project) => project.images)
      .find((image) => image.secureUrl === presentation.coverUrl)
    if (foundImage) return foundImage

    return {
      secureUrl: presentation.coverUrl,
      alt: presentation.name,
      published: true,
    } as GalleryImage
  }

  return galleryCategories[categoryId].projects
    .flatMap((project) => project.images)
    .find((image) => image.published && image.secureUrl && image.orientation === 'landscape')
}

export function getCategoryPresentation(categoryId: string): CategoryPresentation | undefined {
  return categoryPresentation.find((category) => category.id === categoryId)
}
