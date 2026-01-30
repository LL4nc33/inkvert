import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Layout, DarkModeToggle, Divider } from '@oidanice/ink-ui'
import { useConversion } from '../context/ConversionContext'
import { useConverter } from '../hooks/useConverter'
import FileCard from '../components/FileCard'
import BatchActions from '../components/BatchActions'
import DropZone from '../components/DropZone'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

export default function Convert() {
  const navigate = useNavigate()
  const { files, addFiles, removeFile, clearAll, setOutputFormat } = useConversion()
  const { convertFile, convertAll } = useConverter()
  const isConverting = files.some(f => f.status === 'converting')

  const handleFilesAdded = (newFiles: File[]) => {
    addFiles(newFiles)
  }

  useEffect(() => {
    if (files.length === 0) navigate('/')
  }, [files.length, navigate])

  if (files.length === 0) return null

  return (
    <Layout
      headerLeft={<Logo />}
      headerRight={
        <div className="flex items-center gap-4">
          <Link to="/settings" className="font-mono text-xs" style={{ color: 'var(--text)' }}>
            Settings
          </Link>
          <DarkModeToggle />
        </div>
      }
      footer={<Footer />}
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
