import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { Converter } from './types'
import { getMimeType } from '../lib/mime'
import { getExtension } from '../lib/formats'

let ffmpeg: FFmpeg | null = null

async function getFFmpeg(onProgress?: (p: number) => void): Promise<FFmpeg> {
  if (ffmpeg && ffmpeg.loaded) return ffmpeg

  ffmpeg = new FFmpeg()

  if (onProgress) {
    ffmpeg.on('progress', ({ progress }) => {
      onProgress(20 + progress * 70)
    })
  }

  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  })

  return ffmpeg
}

export const audioConverter: Converter = {
  async convert(file, outputFormat, settings, onProgress) {
    onProgress?.(5)
    const ff = await getFFmpeg(onProgress)
    onProgress?.(15)

    const inputExt = getExtension(file.name)
    const inputName = `input.${inputExt}`
    const outputName = `output.${outputFormat}`

    await ff.writeFile(inputName, await fetchFile(file))

    await ff.exec([
      '-i', inputName,
      '-b:a', `${settings.audio.bitrate}k`,
      '-ar', String(settings.audio.sampleRate),
      '-y',
      outputName,
    ])

    const data = await ff.readFile(outputName)
    onProgress?.(100)

    await ff.deleteFile(inputName)
    await ff.deleteFile(outputName)

    return new Blob([data as BlobPart], { type: getMimeType(outputFormat) })
  },
}
