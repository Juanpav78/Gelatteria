import Head from 'next/head'
import { motion } from 'framer-motion'

const Layout = ({ children, title = '', description = '' }) => {
  return (
    <>
      <Head>
        <title>{`${title} - Gelatteria`}</title>
        <meta name="description" content={description} />
      </Head>
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </>
  )
}

export default Layout
