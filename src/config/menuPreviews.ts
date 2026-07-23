import type { GalleryCategoryId } from '@/types/gallery'

interface MenuPreview {
  url: string
  alt: string
  imageCount: number
}

export const menuPreviews: Record<GalleryCategoryId, MenuPreview> = {
  cocinas: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226646/disfamosa/gallery/cocinas/ip/cocina-ip.jpg',
    alt: 'Cocina blanca de alto brillo con dos frentes paralelos y cubiertas de piedra clara',
    imageCount: 58,
  },
  banos: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226603/disfamosa/gallery/banos/iv/bano-iv2.jpg',
    alt: 'Mueble flotante blanco de doble lavabo con espejos arqueados retroiluminados y armarios laterales',
    imageCount: 25,
  },
  closets: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226622/disfamosa/gallery/closets/iv/closet-iv11.jpg',
    alt: 'Closet IV - imagen 11',
    imageCount: 72,
  },
  especiales: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226662/disfamosa/gallery/especiales/alacena-iv/alacena-iv.jpg',
    alt: 'Alacena gris en U con repisas abiertas y cajones',
    imageCount: 19,
  },
  lavanderias: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226676/disfamosa/gallery/lavanderias/ag/lavanderia-ag2.jpg',
    alt: 'Lavandería lineal con gabinetes blancos, cubierta de madera y amplio lavadero',
    imageCount: 8,
  },
}
