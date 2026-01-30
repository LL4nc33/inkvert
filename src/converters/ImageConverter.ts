import { initializeImageMagick, ImageMagick, MagickFormat } from '@imagemagick/magick-wasm'
import { Converter } from './types'
import { FORMAT_REGISTRY } from '../lib/formats'

let initialized = false

async function ensureInitialized(): Promise<void> {
  if (initialized) return

  const wasmUrl = new URL(
    '@imagemagick/magick-wasm/dist/magick.wasm',
    import.meta.url
  )
  await initializeImageMagick(wasmUrl)
  initialized = true
}

const FORMAT_MAP: Record<string, MagickFormat> = {
  png: MagickFormat.Png,
  jpg: MagickFormat.Jpg,
  jpeg: MagickFormat.Jpeg,
  webp: MagickFormat.WebP,
  gif: MagickFormat.Gif,
  bmp: MagickFormat.Bmp,
  tiff: MagickFormat.Tiff,
  tif: MagickFormat.Tif,
  avif: MagickFormat.Avif,
  ico: MagickFormat.Ico,
  heic: MagickFormat.Heic,
  heif: MagickFormat.Heif,
  psd: MagickFormat.Psd,
  tga: MagickFormat.Tga,
  qoi: MagickFormat.Qoi,
  svg: MagickFormat.Svg,
}

function getMagickFormat(format: string): MagickFormat {
  const f = FORMAT_MAP[format.toLowerCase()]
  if (!f) throw new Error(`Unsupported image format: ${format}`)
  return f
}

function getMimeType(format: string): string {
  return FORMAT_REGISTRY[format.toLowerCase()]?.mimeType ?? 'application/octet-stream'
}

export const imageConverter: Converter = {
  async convert(file, outputFormat, settings, onProgress) {
    onProgress?.(5)

    await ensureInitialized()
    onProgress?.(15)

    const arrayBuffer = await file.arrayBuffer()
    const inputData = new Uint8Array(arrayBuffer)
    onProgress?.(30)

    const magickFormat = getMagickFormat(outputFormat)
    const { quality, maxWidth } = settings.image

    const result = ImageMagick.read(inputData, (image) => {
      onProgress?.(50)

      image.quality = quality

      if (maxWidth && image.width > maxWidth) {
        const ratio = maxWidth / image.width
        const newHeight = Math.round(image.height * ratio)
        image.resize(maxWidth, newHeight)
      }

      onProgress?.(70)

      return image.write(magickFormat, (data) => {
        onProgress?.(90)
        return new Blob([new Uint8Array(data)], { type: getMimeType(outputFormat) })
      })
    })

    onProgress?.(100)
    return result
  },
}
