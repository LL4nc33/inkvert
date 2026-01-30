import { FileCategory } from '../converters/types'

export interface FormatInfo {
  extension: string
  label: string
  mimeType: string
  category: FileCategory
  inputOnly?: boolean
}

export const FORMAT_REGISTRY: Record<string, FormatInfo> = {
  // Images
  png: { extension: 'png', label: 'PNG', mimeType: 'image/png', category: 'image' },
  jpg: { extension: 'jpg', label: 'JPEG', mimeType: 'image/jpeg', category: 'image' },
  jpeg: { extension: 'jpg', label: 'JPEG', mimeType: 'image/jpeg', category: 'image' },
  webp: { extension: 'webp', label: 'WebP', mimeType: 'image/webp', category: 'image' },
  gif: { extension: 'gif', label: 'GIF', mimeType: 'image/gif', category: 'image' },
  svg: { extension: 'svg', label: 'SVG', mimeType: 'image/svg+xml', category: 'image' },
  avif: { extension: 'avif', label: 'AVIF', mimeType: 'image/avif', category: 'image' },
  ico: { extension: 'ico', label: 'ICO', mimeType: 'image/x-icon', category: 'image' },
  bmp: { extension: 'bmp', label: 'BMP', mimeType: 'image/bmp', category: 'image' },
  tiff: { extension: 'tiff', label: 'TIFF', mimeType: 'image/tiff', category: 'image' },
  tif: { extension: 'tiff', label: 'TIFF', mimeType: 'image/tiff', category: 'image' },
  heic: { extension: 'heic', label: 'HEIC', mimeType: 'image/heic', category: 'image' },
  heif: { extension: 'heic', label: 'HEIC', mimeType: 'image/heic', category: 'image' },
  psd: { extension: 'psd', label: 'PSD', mimeType: 'image/vnd.adobe.photoshop', category: 'image' },
  tga: { extension: 'tga', label: 'TGA', mimeType: 'image/x-tga', category: 'image' },
  qoi: { extension: 'qoi', label: 'QOI', mimeType: 'image/qoi', category: 'image' },
  jfif: { extension: 'jfif', label: 'JFIF', mimeType: 'image/jpeg', category: 'image' },
  apng: { extension: 'apng', label: 'APNG', mimeType: 'image/apng', category: 'image' },
  cur: { extension: 'cur', label: 'CUR', mimeType: 'image/x-icon', category: 'image' },
  pbm: { extension: 'pbm', label: 'PBM', mimeType: 'image/x-portable-bitmap', category: 'image' },
  pgm: { extension: 'pgm', label: 'PGM', mimeType: 'image/x-portable-graymap', category: 'image' },
  ppm: { extension: 'ppm', label: 'PPM', mimeType: 'image/x-portable-pixmap', category: 'image' },
  pnm: { extension: 'pnm', label: 'PNM', mimeType: 'image/x-portable-anymap', category: 'image' },
  pcx: { extension: 'pcx', label: 'PCX', mimeType: 'image/x-pcx', category: 'image' },
  exr: { extension: 'exr', label: 'EXR', mimeType: 'image/x-exr', category: 'image' },
  dds: { extension: 'dds', label: 'DDS', mimeType: 'image/vnd-ms.dds', category: 'image' },
  // RAW formats (input only)
  nef: { extension: 'nef', label: 'NEF', mimeType: 'image/x-nikon-nef', category: 'image', inputOnly: true },
  cr2: { extension: 'cr2', label: 'CR2', mimeType: 'image/x-canon-cr2', category: 'image', inputOnly: true },
  dng: { extension: 'dng', label: 'DNG', mimeType: 'image/x-adobe-dng', category: 'image', inputOnly: true },
  arw: { extension: 'arw', label: 'ARW', mimeType: 'image/x-sony-arw', category: 'image', inputOnly: true },

  // Audio
  mp3: { extension: 'mp3', label: 'MP3', mimeType: 'audio/mpeg', category: 'audio' },
  wav: { extension: 'wav', label: 'WAV', mimeType: 'audio/wav', category: 'audio' },
  flac: { extension: 'flac', label: 'FLAC', mimeType: 'audio/flac', category: 'audio' },
  ogg: { extension: 'ogg', label: 'OGG', mimeType: 'audio/ogg', category: 'audio' },
  aac: { extension: 'aac', label: 'AAC', mimeType: 'audio/aac', category: 'audio' },
  m4a: { extension: 'm4a', label: 'M4A', mimeType: 'audio/mp4', category: 'audio' },
  opus: { extension: 'opus', label: 'Opus', mimeType: 'audio/opus', category: 'audio' },
  aiff: { extension: 'aiff', label: 'AIFF', mimeType: 'audio/aiff', category: 'audio' },
  wma: { extension: 'wma', label: 'WMA', mimeType: 'audio/x-ms-wma', category: 'audio' },
  ac3: { extension: 'ac3', label: 'AC3', mimeType: 'audio/ac3', category: 'audio' },
  wv: { extension: 'wv', label: 'WavPack', mimeType: 'audio/x-wavpack', category: 'audio' },
  amr: { extension: 'amr', label: 'AMR', mimeType: 'audio/amr', category: 'audio' },

  // Documents
  docx: { extension: 'docx', label: 'DOCX', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', category: 'document' },
  md: { extension: 'md', label: 'Markdown', mimeType: 'text/markdown', category: 'document' },
  html: { extension: 'html', label: 'HTML', mimeType: 'text/html', category: 'document' },
  rtf: { extension: 'rtf', label: 'RTF', mimeType: 'application/rtf', category: 'document' },
  txt: { extension: 'txt', label: 'Plain Text', mimeType: 'text/plain', category: 'document' },
  csv: { extension: 'csv', label: 'CSV', mimeType: 'text/csv', category: 'document' },
  json: { extension: 'json', label: 'JSON', mimeType: 'application/json', category: 'document' },
  epub: { extension: 'epub', label: 'EPUB', mimeType: 'application/epub+zip', category: 'document' },
  odt: { extension: 'odt', label: 'ODT', mimeType: 'application/vnd.oasis.opendocument.text', category: 'document' },

  // Video
  mp4: { extension: 'mp4', label: 'MP4', mimeType: 'video/mp4', category: 'video' },
  webm: { extension: 'webm', label: 'WebM', mimeType: 'video/webm', category: 'video' },
  mkv: { extension: 'mkv', label: 'MKV', mimeType: 'video/x-matroska', category: 'video' },
  avi: { extension: 'avi', label: 'AVI', mimeType: 'video/x-msvideo', category: 'video' },
  mov: { extension: 'mov', label: 'MOV', mimeType: 'video/quicktime', category: 'video' },
  flv: { extension: 'flv', label: 'FLV', mimeType: 'video/x-flv', category: 'video' },
  mpg: { extension: 'mpg', label: 'MPG', mimeType: 'video/mpeg', category: 'video' },
  mpeg: { extension: 'mpg', label: 'MPEG', mimeType: 'video/mpeg', category: 'video' },
  m4v: { extension: 'm4v', label: 'M4V', mimeType: 'video/x-m4v', category: 'video' },
  '3gp': { extension: '3gp', label: '3GP', mimeType: 'video/3gpp', category: 'video' },
  ts: { extension: 'ts', label: 'TS', mimeType: 'video/mp2t', category: 'video' },
  wmv: { extension: 'wmv', label: 'WMV', mimeType: 'video/x-ms-wmv', category: 'video' },
}

export function getFormatsByCategory(category: FileCategory): FormatInfo[] {
  return Object.values(FORMAT_REGISTRY).filter(f => f.category === category)
}

export function getOutputFormats(category: FileCategory): FormatInfo[] {
  const seen = new Set<string>()
  return getFormatsByCategory(category).filter(f => {
    if (f.inputOnly) return false
    if (seen.has(f.extension)) return false
    seen.add(f.extension)
    return true
  })
}

export function detectCategory(file: File): FileCategory | null {
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (!ext) return null
  return FORMAT_REGISTRY[ext]?.category ?? null
}

export function getExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() ?? ''
}
