import { useCallback } from 'react'
import { useConversion } from '../context/ConversionContext'
import { getConverter } from '../converters/registry'
import { downloadBlob } from '../lib/download'

export function useConverter() {
  const { files, updateFile, settings } = useConversion()

  const convertFile = useCallback(async (fileId: string) => {
    const file = files.find(f => f.id === fileId)
    if (!file || file.status !== 'queued') return

    updateFile(fileId, { status: 'converting', progress: 0 })

    try {
      const converter = await getConverter(file.category)
      const result = await converter.convert(
        file.file,
        file.outputFormat,
        settings,
        (progress) => updateFile(fileId, { progress })
      )

      updateFile(fileId, { status: 'done', progress: 100, result })

      if (settings.general.autoDownload) {
        const outputName = file.name.replace(/\.[^.]+$/, `.${file.outputFormat}`)
        downloadBlob(result, outputName)
      }
    } catch (err) {
      updateFile(fileId, {
        status: 'error',
        error: err instanceof Error ? err.message : 'Conversion failed',
      })
    }
  }, [files, updateFile, settings])

  const convertAll = useCallback(() => {
    files.filter(f => f.status === 'queued').forEach(f => convertFile(f.id))
  }, [files, convertFile])

  return { convertFile, convertAll }
}
