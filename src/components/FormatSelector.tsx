import { Select } from '@oidanice/ink-ui'
import { FileCategory } from '../converters/types'
import { getOutputFormats } from '../lib/formats'

interface FormatSelectorProps {
  category: FileCategory
  inputFormat: string
  value: string
  onChange: (format: string) => void
}

export default function FormatSelector({ category, inputFormat, value, onChange }: FormatSelectorProps) {
  const formats = getOutputFormats(category)

  return (
    <Select value={value} onChange={e => onChange(e.target.value)}>
      {formats.map(f => (
        <option key={f.extension} value={f.extension}>
          {f.label}{f.extension === inputFormat ? ' (same)' : ''}
        </option>
      ))}
    </Select>
  )
}
