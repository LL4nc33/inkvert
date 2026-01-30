import { Card, Button, Badge, Progress } from '@oidanice/kindle-ui'
import { ConverterFile } from '../converters/types'
import { formatFileSize } from '../lib/fileUtils'
import { downloadBlob } from '../lib/download'
import FormatSelector from './FormatSelector'

interface FileCardProps {
  file: ConverterFile
  onRemove: () => void
  onConvert: () => void
  onFormatChange: (format: string) => void
}

const STATUS_LABELS: Record<string, string> = {
  queued: 'queued',
  converting: 'converting',
  done: 'done',
  error: 'error',
}

export default function FileCard({ file, onRemove, onConvert, onFormatChange }: FileCardProps) {
  const handleDownload = () => {
    if (file.result) {
      const outputName = file.name.replace(/\.[^.]+$/, `.${file.outputFormat}`)
      downloadBlob(file.result, outputName)
    }
  }

  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-sm truncate">{file.name}</p>
          <p className="font-mono text-xs text-secondary">
            {formatFileSize(file.size)}
            {file.duration != null && ` · ${Math.round(file.duration)} sec`}
            {file.status === 'done' && file.result && (
              <> → {formatFileSize(file.result.size)}
                {' '}({Math.round((1 - file.result.size / file.size) * 100)}% smaller)
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={file.status === 'done' ? 'solid' : 'outline'}>
            {STATUS_LABELS[file.status]}
          </Badge>
          <Button variant="ghost" onClick={onRemove} aria-label="Remove file">
            ×
          </Button>
        </div>
      </div>

      {file.status === 'converting' && (
        <Progress value={file.progress} label={`${Math.round(file.progress)}%`} />
      )}

      {file.status === 'queued' && (
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-xs text-secondary">Convert to:</span>
          <div className="flex-1">
            <FormatSelector
              category={file.category}
              inputFormat={file.inputFormat}
              value={file.outputFormat}
              onChange={onFormatChange}
            />
          </div>
          <Button onClick={onConvert}>Convert</Button>
        </div>
      )}

      {file.status === 'done' && file.result && (
        <Button onClick={handleDownload}>Download</Button>
      )}

      {file.status === 'error' && file.error && (
        <p className="font-mono text-xs" style={{ color: 'var(--text)' }}>
          {file.error}
        </p>
      )}
    </Card>
  )
}
