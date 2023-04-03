import type { AppProps } from 'next/app'
import { Lato } from 'next/font/google'
import 'styles/globals.css'

const font = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  )
}
