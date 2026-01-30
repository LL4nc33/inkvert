import { Converter } from './types'
import { getMimeType } from '../lib/mime'

export const documentConverter: Converter = {
  async convert(file, outputFormat, _settings, onProgress) {
    onProgress?.(10)

    const inputExt = file.name.split('.').pop()?.toLowerCase() ?? ''
    let content: string

    if (inputExt === 'docx') {
      const mammoth = await import('mammoth')
      const buffer = await file.arrayBuffer()
      if (outputFormat === 'html') {
        const result = await mammoth.convertToHtml({ arrayBuffer: buffer })
        content = result.value
      } else if (outputFormat === 'md' || outputFormat === 'txt') {
        const result = await mammoth.extractRawText({ arrayBuffer: buffer })
        content = result.value
      } else {
        throw new Error(`Cannot convert DOCX to ${outputFormat}`)
      }
    } else if (inputExt === 'md') {
      const text = await file.text()
      if (outputFormat === 'html') {
        const showdown = await import('showdown')
        const converter = new showdown.Converter()
        content = converter.makeHtml(text)
      } else if (outputFormat === 'txt') {
        content = text
      } else {
        throw new Error(`Cannot convert MD to ${outputFormat}`)
      }
    } else if (inputExt === 'html') {
      const text = await file.text()
      if (outputFormat === 'txt' || outputFormat === 'md') {
        const div = document.createElement('div')
        div.innerHTML = text
        content = div.textContent ?? ''
      } else {
        throw new Error(`Cannot convert HTML to ${outputFormat}`)
      }
    } else {
      content = await file.text()
    }

    onProgress?.(80)

    if (outputFormat === 'html' && !content.startsWith('<!DOCTYPE')) {
      content = `<!DOCTYPE html>\n<html><head><meta charset="utf-8"><title>${file.name}</title></head><body>\n${content}\n</body></html>`
    }

    onProgress?.(100)
    return new Blob([content], { type: getMimeType(outputFormat) })
  },
}
