import { FileCategory, Converter } from './types'

const converters: Partial<Record<FileCategory, () => Promise<Converter>>> = {
  image: async () => (await import('./ImageConverter')).imageConverter,
  audio: async () => (await import('./AudioConverter')).audioConverter,
  document: async () => (await import('./DocumentConverter')).documentConverter,
}

export async function getConverter(category: FileCategory): Promise<Converter> {
  const loader = converters[category]
  if (!loader) throw new Error(`No converter available for: ${category}`)
  return loader()
}
