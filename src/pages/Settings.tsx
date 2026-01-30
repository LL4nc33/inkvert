import { Link } from 'react-router-dom'
import { Layout, DarkModeToggle, Button, Input, Select, Divider } from '@oidanice/kindle-ui'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import { useConversion } from '../context/ConversionContext'

export default function Settings() {
  const { settings, updateSettings, resetSettings } = useConversion()

  return (
    <Layout
      headerLeft={<Logo />}
      headerRight={<DarkModeToggle />}
      footer={<Footer />}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">Settings</h2>
          <Link to="/" className="font-mono text-xs" style={{ color: 'var(--text)' }}>
            Back
          </Link>
        </div>

        <Divider />

        <section>
          <h3 className="font-mono text-xs text-secondary mb-4">IMAGES</h3>
          <div className="flex flex-col gap-3">
            <Input
              label="Quality (1-100)"
              type="number"
              min={1}
              max={100}
              value={settings.image.quality}
              onChange={e => updateSettings({
                image: { ...settings.image, quality: Number(e.target.value) },
              })}
            />
            <Select
              label="Max width"
              value={String(settings.image.maxWidth ?? 'none')}
              onChange={e => updateSettings({
                image: {
                  ...settings.image,
                  maxWidth: e.target.value === 'none' ? null : Number(e.target.value),
                },
              })}
            >
              <option value="none">No limit</option>
              <option value="800">800px</option>
              <option value="1200">1200px</option>
              <option value="1920">1920px</option>
              <option value="3840">3840px</option>
            </Select>
          </div>
        </section>

        <Divider />

        <section>
          <h3 className="font-mono text-xs text-secondary mb-4">AUDIO</h3>
          <div className="flex flex-col gap-3">
            <Select
              label="Bitrate"
              value={String(settings.audio.bitrate)}
              onChange={e => updateSettings({
                audio: { ...settings.audio, bitrate: Number(e.target.value) },
              })}
            >
              <option value="64">64 kbps</option>
              <option value="128">128 kbps</option>
              <option value="192">192 kbps</option>
              <option value="256">256 kbps</option>
              <option value="320">320 kbps</option>
            </Select>
            <Select
              label="Sample rate"
              value={String(settings.audio.sampleRate)}
              onChange={e => updateSettings({
                audio: { ...settings.audio, sampleRate: Number(e.target.value) },
              })}
            >
              <option value="44100">44100 Hz</option>
              <option value="48000">48000 Hz</option>
            </Select>
          </div>
        </section>

        <Divider />

        <section>
          <h3 className="font-mono text-xs text-secondary mb-4">VIDEO</h3>
          <div className="flex flex-col gap-3">
            <Input
              label="Quality (CRF 18-28)"
              type="number"
              min={18}
              max={28}
              value={settings.video.crf}
              onChange={e => updateSettings({
                video: { ...settings.video, crf: Number(e.target.value) },
              })}
            />
            <Select
              label="Max resolution"
              value={settings.video.maxResolution}
              onChange={e => updateSettings({
                video: { ...settings.video, maxResolution: e.target.value as 'keep' | '720' | '1080' },
              })}
            >
              <option value="keep">Keep original</option>
              <option value="720">720p</option>
              <option value="1080">1080p</option>
            </Select>
          </div>
        </section>

        <Divider />

        <section>
          <h3 className="font-mono text-xs text-secondary mb-4">GENERAL</h3>
          <label className="flex items-center gap-2 font-mono text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.autoDownload}
              onChange={e => updateSettings({
                general: { ...settings.general, autoDownload: e.target.checked },
              })}
            />
            Auto-download when done
          </label>
        </section>

        <Divider />

        <Button variant="ghost" onClick={resetSettings}>
          Reset to defaults
        </Button>
      </div>
    </Layout>
  )
}
