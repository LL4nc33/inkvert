import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConversionProvider } from './context/ConversionContext'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'

const Convert = lazy(() => import('./pages/Convert'))
const Settings = lazy(() => import('./pages/Settings'))

export default function App() {
  return (
    <ConversionProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<Suspense fallback={null}><Convert /></Suspense>} />
          <Route path="/settings" element={<Suspense fallback={null}><Settings /></Suspense>} />
        </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ConversionProvider>
  )
}
