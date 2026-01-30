import { useCallback, useRef, useState, DragEvent } from 'react'

interface DropZoneProps {
  onFilesAdded: (files: File[]) => void
}

export default function DropZone({ onFilesAdded }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) onFilesAdded(files)
  }, [onFilesAdded])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false)
  }, [])

  const handleClick = () => inputRef.current?.click()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length > 0) onFilesAdded(files)
    e.target.value = ''
  }

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const files = Array.from(e.clipboardData.files)
    if (files.length > 0) onFilesAdded(files)
  }, [onFilesAdded])

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onPaste={handlePaste}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="Drop files here or click to browse"
      className="cursor-pointer border border-primary p-12 text-center transition-colors duration-150"
      style={isDragOver ? { backgroundColor: 'var(--text)', color: 'var(--bg)' } : {}}
    >
      <p className="font-serif text-xl mb-4">
        {isDragOver ? 'drop files here' : 'drop files here or click to browse'}
      </p>
      <p className="font-mono text-xs text-secondary">
        images · audio · video · documents
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  )
}
