interface CloudinaryImageOptions {
  width: number
  height?: number
  crop?: 'fill' | 'fit' | 'limit'
  quality?: 'auto:eco' | 'auto:good'
}

function transformSegment(options: CloudinaryImageOptions): string {
  const parts = [
    'f_auto',
    `q_${options.quality ?? 'auto:eco'}`,
    `c_${options.crop ?? 'fill'}`,
    `w_${options.width}`,
  ]

  if (options.height) parts.push(`h_${options.height}`)
  if ((options.crop ?? 'fill') === 'fill') parts.push('g_auto')
  return parts.join(',')
}

export function cloudinaryImageUrl(source: string, options: CloudinaryImageOptions): string {
  if (!source.includes('/image/upload/')) return source
  return source.replace('/image/upload/', `/image/upload/${transformSegment(options)}/`)
}

export function cloudinarySrcset(
  source: string,
  widths: number[],
  options: Omit<CloudinaryImageOptions, 'width' | 'height'> = {},
): string {
  return widths
    .map((width) => `${cloudinaryImageUrl(source, { ...options, width })} ${width}w`)
    .join(', ')
}
