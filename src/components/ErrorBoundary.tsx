import { Component, ReactNode } from 'react'
import { Layout } from '@oidanice/ink-ui'
import Logo from './Logo'
import Footer from './Footer'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout headerLeft={<Logo />} footer={<Footer />}>
          <div className="flex flex-col items-center gap-4 mt-8 font-mono text-sm text-center">
            <p className="font-serif text-xl">Something went wrong</p>
            <p className="text-xs text-secondary">
              {this.state.error?.message ?? 'An unexpected error occurred'}
            </p>
            <a
              href="/"
              style={{ textDecoration: 'underline', textUnderlineOffset: '2px', color: 'inherit' }}
            >
              Back to Home
            </a>
          </div>
        </Layout>
      )
    }
    return this.props.children
  }
}
