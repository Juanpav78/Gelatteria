import { Baloo_2, Lobster } from 'next/font/google'
import { MotionConfig } from 'framer-motion'
import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/globals.css'

const baloo = Baloo_2({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' })
const lobster = Lobster({ subsets: ['latin'], weight: '400', display: 'swap' })

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --fontText: ${baloo.style.fontFamily};
          --fontTitle: ${lobster.style.fontFamily};
        }
      `}</style>
      <MotionConfig reducedMotion="user">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </MotionConfig>
    </>
  )
}
