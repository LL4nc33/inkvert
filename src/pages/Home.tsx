import { useNavigate } from 'react-router-dom'
import { Layout, DarkModeToggle, Divider } from '@oidanice/kindle-ui'
import DropZone from '../components/DropZone'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import { useConversion } from '../context/ConversionContext'

export default function Home() {
  const navigate = useNavigate()
  const { addFiles } = useConversion()

  const handleFilesAdded = (files: File[]) => {
    const added = addFiles(files)
    if (added.length > 0) {
      navigate('/convert')
    }
  }

  return (
    <Layout
      headerLeft={<Logo />}
      headerRight={<DarkModeToggle />}
      footer={<Footer />}
    >
      <div className="flex flex-col items-center gap-8 mt-8">
        <DropZone onFilesAdded={handleFilesAdded} />

        <Divider spacing="lg" />

        <div className="font-mono text-xs text-secondary text-center space-y-2">
          <p>all processing happens in your browser.</p>
          <p>no uploads. no servers. no tracking.</p>
          <p className="mt-4">video limit: 90 seconds max</p>
        </div>
      </div>
    </Layout>
  )
}
