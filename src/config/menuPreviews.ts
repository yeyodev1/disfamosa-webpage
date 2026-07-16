import type { GalleryCategoryId } from '@/types/gallery'

interface MenuPreview {
  url: string
  alt: string
  imageCount: number
}

export const menuPreviews: Record<GalleryCategoryId, MenuPreview> = {
  cocinas: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226634/disfamosa/gallery/cocinas/at/cocina-at.jpg',
    alt: 'Cocina blanca lineal con isla de granito y electrodomésticos integrados',
    imageCount: 58,
  },
  banos: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226599/disfamosa/gallery/banos/cs/bano-cs.jpg',
    alt: 'Mueble flotante doble en madera clara con lavabos sobre encimera',
    imageCount: 25,
  },
  closets: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226611/disfamosa/gallery/closets/aa/closet-aa.jpg',
    alt: 'Closet amplio a medida con almacenamiento abierto e iluminación integrada',
    imageCount: 72,
  },
  especiales: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226662/disfamosa/gallery/especiales/alacena-iv/alacena-iv.jpg',
    alt: 'Alacena gris en U con repisas abiertas y cajones',
    imageCount: 19,
  },
  lavanderias: {
    url: 'https://res.cloudinary.com/xq12mihk/image/upload/v1784226675/disfamosa/gallery/lavanderias/aa/lavanderia-aa2.jpg',
    alt: 'Lavandería completa con gabinetes de madera y mesones de granito',
    imageCount: 8,
  },
}
