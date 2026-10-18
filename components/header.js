import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Logo from '../public/img/LogoHelado2.png'
import styles from '../styles/header.module.css'

const enlaces = [
  { href: '/', label: 'Inicio' },
  { href: '/tienda', label: 'Menú' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

const Header = () => {
  const { pathname } = useRouter()
  const [abierto, setAbierto] = useState(false)
  const [conScroll, setConScroll] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setConScroll(y > 20))

  return (
    <motion.header
      className={`${styles.header} ${conScroll || abierto ? styles.conScroll : ''}`}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setAbierto(false)}>
          <motion.span
            className={styles.logoImg}
            whileHover={{ rotate: [0, -14, 10, -6, 0], scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Image src={Logo} alt="Logo Gelatteria" width={52} height={52} priority />
          </motion.span>
          <span className={styles.logoText}>Gelatteria</span>
        </Link>

        <nav className={styles.nav} aria-label="Principal">
          {enlaces.map(({ href, label }) => {
            const activo = pathname === href
            return (
              <Link key={href} href={href} className={`${styles.link} ${activo ? styles.activo : ''}`}>
                {activo && (
                  <motion.span layoutId="nav-pill" className={styles.pill} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className={styles.linkText}>{label}</span>
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          onClick={() => setAbierto((a) => !a)}
        >
          <motion.span animate={abierto ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} />
          <motion.span animate={abierto ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }} />
          <motion.span animate={abierto ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} />
        </button>
      </div>

      <AnimatePresence>
        {abierto && (
          <motion.nav
            className={styles.mobileNav}
            aria-label="Móvil"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            {enlaces.map(({ href, label }, i) => (
              <motion.div key={href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * i } }}>
                <Link
                  href={href}
                  onClick={() => setAbierto(false)}
                  className={`${styles.mobileLink} ${pathname === href ? styles.mobileActivo : ''}`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
