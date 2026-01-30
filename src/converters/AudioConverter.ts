import { fetchFile } from '@ffmpeg/util'
import { Converter } from './types'
import { getMimeType } from '../lib/mime'
import { getExtension } from '../lib/formats'
import { getFFmpeg } from '../lib/ffmpegInstance'

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
