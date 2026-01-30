import { useNavigate, Link } from 'react-router-dom'
import { Layout, DarkModeToggle, Divider } from '@oidanice/kindle-ui'
import { useConversion } from '../context/ConversionContext'
import FileCard from '../components/FileCard'
import BatchActions from '../components/BatchActions'
import DropZone from '../components/DropZone'

export default function Convert() {
  const navigate = useNavigate()
  const { files, addFiles, removeFile, clearAll, updateFile, setOutputFormat } = useConversion()
  const isConverting = files.some(f => f.status === 'converting')

  const handleFilesAdded = (newFiles: File[]) => {
    addFiles(newFiles)
  }

  const convertFile = async (id: string) => {
    // Placeholder — converter integration comes in Task 6
    updateFile(id, { status: 'converting', progress: 0 })
  }

  const convertAll = () => {
    files.filter(f => f.status === 'queued').forEach(f => convertFile(f.id))
  }

  if (files.length === 0) {
    navigate('/')
    return null
  }

  return (
    <Layout
      title="inkvert"
      headerRight={
        <div className="flex items-center gap-4">
          <Link to="/settings" className="font-mono text-xs" style={{ color: 'var(--text)' }}>
            Settings
          </Link>
          <DarkModeToggle />
        </div>
      }
      footer={<span>powered by kindle-ui</span>}
    >
      <div className="flex flex-col gap-4">
        <BatchActions
          fileCount={files.filter(f => f.status === 'queued').length}
          onConvertAll={convertAll}
          onClearAll={clearAll}
          isConverting={isConverting}
        />

        <Divider />

        {files.map(file => (
          <FileCard
            key={file.id}
            file={file}
            onRemove={() => removeFile(file.id)}
            onConvert={() => convertFile(file.id)}
            onFormatChange={(fmt) => setOutputFormat(file.id, fmt)}
          />
        ))}

        <Divider spacing="sm" />

        <DropZone onFilesAdded={handleFilesAdded} />
      </div>
    </Layout>
  )
}
