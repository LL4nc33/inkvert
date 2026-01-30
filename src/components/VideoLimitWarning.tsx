import { Card } from '@oidanice/kindle-ui'

export default function VideoLimitWarning() {
  return (
    <Card className="font-mono text-xs text-center">
      Video exceeds 90 second limit for client-side conversion.
    </Card>
  )
}
