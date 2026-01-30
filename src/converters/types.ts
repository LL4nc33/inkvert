export type FileCategory = 'image' | 'audio' | 'document' | 'video'

export type ConversionStatus = 'queued' | 'converting' | 'done' | 'error'

export interface ConverterFile {
  id: string
  file: File
  name: string
  size: number
  category: FileCategory
  inputFormat: string
  outputFormat: string
  status: ConversionStatus
  progress: number
  result?: Blob
  error?: string
  duration?: number
}

export interface ConversionSettings {
  image: {
    quality: number
    maxWidth: number | null
  }
  audio: {
    bitrate: number
    sampleRate: number
  }
  video: {
    crf: number
    maxResolution: 'keep' | '720' | '1080'
    bitrate: number | null
  }
  general: {
    autoDownload: boolean
  }
}

export const DEFAULT_SETTINGS: ConversionSettings = {
  image: { quality: 85, maxWidth: null },
  audio: { bitrate: 192, sampleRate: 44100 },
  video: { crf: 23, maxResolution: 'keep', bitrate: null },
  general: { autoDownload: false },
}

export interface Converter {
  convert(
    file: File,
    outputFormat: string,
    settings: ConversionSettings,
    onProgress?: (progress: number) => void
  ): Promise<Blob>
}
