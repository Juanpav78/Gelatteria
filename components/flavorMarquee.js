import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion'
import Scoop from './scoop'
import styles from '../styles/marquee.module.css'

// Cinta infinita de sabores. Se desacelera al pasar el cursor.
const FlavorMarquee = ({ items, velocidad = 60, reversa = false, onSelect }) => {
  const x = useMotionValue(0)
  const pista = useRef(null)
  const lento = useRef(false)
  const reducido = useReducedMotion()

  // Repite la lista para que siempre cubra la pantalla y luego la duplica para el bucle
  const base = items.length < 8 ? [...items, ...items, ...items] : items
  const lista = [...base, ...base]

  useAnimationFrame((_, delta) => {
    const mitad = pista.current ? pista.current.scrollWidth / 2 : 0
    if (!mitad || reducido) return
    const paso = (lento.current ? velocidad * 0.15 : velocidad) * (delta / 1000) * (reversa ? 1 : -1)
    let siguiente = x.get() + paso
    if (siguiente <= -mitad) siguiente += mitad
    if (siguiente > 0) siguiente -= mitad
    x.set(siguiente)
  })

  return (
    <div
      className={styles.marquee}
      onMouseEnter={() => (lento.current = true)}
      onMouseLeave={() => (lento.current = false)}
    >
      <motion.div ref={pista} className={styles.pista} style={{ x }}>
        {lista.map((sabor, i) => {
          const contenido = (
            <>
              <motion.span
                className={styles.icono}
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: (i % 5) * 0.2 }}
              >
                <Scoop sabor={sabor} chispas={false} />
              </motion.span>
              <span className={styles.nombre}>{sabor.nombre}</span>
            </>
          )
          const props = {
            className: styles.chip,
            style: { backgroundColor: sabor.fondo, color: sabor.acento },
            whileHover: { scale: 1.08, rotate: i % 2 ? 3 : -3 },
            'aria-hidden': i >= base.length || undefined,
          }
          return onSelect ? (
            <motion.button key={i} type="button" {...props} tabIndex={i >= base.length ? -1 : 0} onClick={() => onSelect(sabor)}>
              {contenido}
            </motion.button>
          ) : (
            <motion.div key={i} {...props}>
              {contenido}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default FlavorMarquee
