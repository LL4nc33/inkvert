import { Button } from '@oidanice/kindle-ui'

interface BatchActionsProps {
  fileCount: number
  onConvertAll: () => void
  onClearAll: () => void
  isConverting: boolean
}

export default function BatchActions({ fileCount, onConvertAll, onClearAll, isConverting }: BatchActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-sm">{fileCount} file{fileCount !== 1 ? 's' : ''} queued</span>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onClearAll} disabled={isConverting}>
          Clear All
        </Button>
        <Button onClick={onConvertAll} disabled={isConverting}>
          {isConverting ? 'Converting...' : 'Convert All'}
        </Button>
      </div>
    </div>
  )
}
