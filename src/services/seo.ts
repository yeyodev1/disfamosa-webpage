import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { menuPreviews } from '@/config/menuPreviews'
import { cloudinaryImageUrl } from '@/services/cloudinaryImage'

interface SeoData {
  title: string
  description: string
  image?: string
}

const siteName = 'Disfamosa'
const siteUrl = ((import.meta.env.VITE_SITE_URL as string | undefined) || 'https://disfamosa.example').replace(/\/+$/, '')
const defaultImage = cloudinaryImageUrl(menuPreviews.cocinas.url, {
  width: 1200,
  height: 630,
  crop: 'fill',
  quality: 'auto:good',
})

const categorySeo: Record<string, SeoData> = {
  cocinas: {
    title: 'Cocinas a medida en Guayaquil',
    description: 'Proyectos de cocinas personalizadas diseñadas y fabricadas por Disfamosa en Guayaquil.',
    image: menuPreviews.cocinas.url,
  },
  banos: {
    title: 'Muebles de baño a medida en Guayaquil',
    description: 'Mobiliario personalizado para baños con diseño, calidad y funcionalidad.',
    image: menuPreviews.banos.url,
  },
  closets: {
    title: 'Closets a medida en Guayaquil',
    description: 'Diseño y fabricación de closets personalizados que aprovechan cada espacio.',
    image: menuPreviews.closets.url,
  },
  especiales: {
    title: 'Mobiliario especial y personalizado',
    description: 'Soluciones de mobiliario a medida para salas, oficinas, bares y espacios comerciales.',
    image: menuPreviews.especiales.url,
  },
  lavanderias: {
    title: 'Muebles de lavandería a medida',
    description: 'Mobiliario funcional y resistente para lavanderías y áreas de servicio.',
    image: menuPreviews.lavanderias.url,
  },
}

function routeSeo(route: RouteLocationNormalizedLoaded): SeoData {
  if (route.name === 'gallery') return categorySeo[String(route.params.category)] ?? categorySeo.cocinas

  const pages: Record<string, SeoData> = {
    home: {
      title: 'Mobiliario a medida en Guayaquil',
      description: 'Diseño, fabricación e instalación de cocinas, baños, closets y mobiliario personalizado desde 1996.',
    },
    about: {
      title: 'Nosotros | Diseño y fabricación desde 1996',
      description: 'Conoce la historia de Disfamosa, empresa de mobiliario personalizado fundada por Laura Plaza y Manuel Mantilla en Guayaquil.',
      image: menuPreviews.especiales.url,
    },
    projects: {
      title: 'Proyectos de mobiliario personalizado',
      description: 'Explora proyectos de cocinas, baños, closets, lavanderías y mobiliario especial realizados por Disfamosa.',
      image: menuPreviews.closets.url,
    },
    contact: {
      title: 'Contacto | Inicia tu proyecto',
      description: 'Cuéntanos sobre tu proyecto de mobiliario personalizado y recibe el contacto de un asesor de Disfamosa.',
    },
  }

  return pages[String(route.name)] ?? pages.home
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

export function updateSeo(route: RouteLocationNormalizedLoaded) {
  const seo = routeSeo(route)
  const canonicalUrl = `${siteUrl}${route.path === '/' ? '' : route.path}`
  const image = seo.image
    ? cloudinaryImageUrl(seo.image, { width: 1200, height: 630, crop: 'fill', quality: 'auto:good' })
    : defaultImage
  const fullTitle = `${seo.title} | ${siteName}`

  document.title = fullTitle
  document.documentElement.lang = 'es'
  setMeta('meta[name="description"]', 'name', 'description', seo.description)
  setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large')
  setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
  setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description)
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
  setMeta('meta[property="og:image"]', 'property', 'og:image', image)
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description)
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = canonicalUrl

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#business`,
    name: siteName,
    url: siteUrl,
    image,
    description: 'Diseño, fabricación e instalación de mobiliario personalizado para espacios residenciales y comerciales.',
    foundingDate: '1996',
    founder: [
      { '@type': 'Person', name: 'Laura Plaza' },
      { '@type': 'Person', name: 'Manuel Mantilla' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Guayaquil',
      addressCountry: 'EC',
    },
    areaServed: { '@type': 'Country', name: 'Ecuador' },
    knowsAbout: ['Cocinas a medida', 'Muebles de baño', 'Closets', 'Mobiliario personalizado'],
  }
  let script = document.head.querySelector<HTMLScriptElement>('#disfamosa-structured-data')
  if (!script) {
    script = document.createElement('script')
    script.id = 'disfamosa-structured-data'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(structuredData)
}
