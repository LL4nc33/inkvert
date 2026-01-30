import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'

let ffmpeg: FFmpeg | null = null
let currentProgress: ((p: number) => void) | undefined

export async function getFFmpeg(onProgress?: (p: number) => void): Promise<FFmpeg> {
  currentProgress = onProgress

  if (ffmpeg && ffmpeg.loaded) return ffmpeg

  ffmpeg = new FFmpeg()

  ffmpeg.on('progress', ({ progress }) => {
    currentProgress?.(20 + progress * 70)
  })

  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  })

  return ffmpeg
}
