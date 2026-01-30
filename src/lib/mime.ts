import { FORMAT_REGISTRY } from './formats'

export function getMimeType(extension: string): string {
  return FORMAT_REGISTRY[extension.toLowerCase()]?.mimeType ?? 'application/octet-stream'
}
