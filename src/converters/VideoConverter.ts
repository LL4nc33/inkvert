import { fetchFile } from '@ffmpeg/util'
import { Converter } from './types'
import { getMimeType } from '../lib/mime'
import { getExtension } from '../lib/formats'
import { getVideoDuration } from '../lib/fileUtils'
import { getFFmpeg } from '../lib/ffmpegInstance'

const MAX_DURATION = 90

export const videoConverter: Converter = {
  async convert(file, outputFormat, settings, onProgress) {
    const duration = await getVideoDuration(file)
    if (duration > MAX_DURATION) {
      throw new Error(`Video is ${Math.round(duration)}s — exceeds ${MAX_DURATION}s limit`)
    }

    onProgress?.(5)
    const ff = await getFFmpeg(onProgress)
    onProgress?.(15)

    const inputExt = getExtension(file.name)
    const inputName = `input.${inputExt}`
    const outputName = `output.${outputFormat}`

    await ff.writeFile(inputName, await fetchFile(file))

    const args = ['-i', inputName]

    if (settings.video.crf) {
      args.push('-crf', String(settings.video.crf))
    }
    if (settings.video.maxResolution !== 'keep') {
      const height = settings.video.maxResolution === '720' ? 720 : 1080
      args.push('-vf', `scale=-2:${height}`)
    }
    if (settings.video.bitrate) {
      args.push('-b:v', `${settings.video.bitrate}k`)
    }

    args.push('-y', outputName)

    await ff.exec(args)

    const data = await ff.readFile(outputName)
    onProgress?.(100)

    await ff.deleteFile(inputName)
    await ff.deleteFile(outputName)

    return new Blob([data as BlobPart], { type: getMimeType(outputFormat) })
  },
}
