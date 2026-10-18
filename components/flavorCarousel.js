import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Scoop from './scoop'
import { formatearPrecio } from '../data/sabores'
import styles from '../styles/carousel.module.css'

const DURACION = 3800

// [top, left, rotación, color, retraso] de las chispas que flotan de fondo
const CHISPAS_FONDO = [
  ['12%', '6%', 20, '#ff6b9a', 0],
  ['22%', '46%', -40, '#ffd93d', 0.6],
  ['72%', '4%', 60, '#6bc5ff', 1.2],
  ['84%', '40%', -10, '#8be08b', 0.3],
  ['8%', '88%', 35, '#b388ff', 0.9],
  ['60%', '94%', -55, '#ff9f43', 1.5],
  ['44%', '2%', 80, '#ffffff', 0.4],
  ['92%', '74%', 15, '#ff6b9a', 1.1],
]

const variantesScoop = {
  entra: (dir) => ({ x: dir * 220, rotate: dir * 30, scale: 0.6, opacity: 0 }),
  centro: { x: 0, rotate: 0, scale: 1, opacity: 1 },
  sale: (dir) => ({ x: dir * -220, rotate: dir * -30, scale: 0.6, opacity: 0 }),
}

const variantesTexto = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.03 } },
  salida: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
}

const variantesLetra = {
  oculto: { y: '100%', opacity: 0, rotate: 8 },
  visible: { y: 0, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } },
  salida: { y: '-60%', opacity: 0, transition: { duration: 0.15 } },
}

const FlavorCarousel = ({ sabores }) => {
  const [[indice, dir], setEstado] = useState([0, 1])
  const [pausado, setPausado] = useState(false)
  const idTexto = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const sabor = sabores[indice]
  const total = sabores.length

  const ir = (nuevo, direccion) => setEstado([(nuevo + total) % total, direccion])

  useEffect(() => {
    if (pausado) return
    const t = setTimeout(() => setEstado(([i]) => [(i + 1) % total, 1]), DURACION)
    return () => clearTimeout(t)
  }, [indice, pausado, total])

  return (
    <motion.section
      className={styles.hero}
      animate={{ backgroundColor: sabor.fondo }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrusel"
      aria-label="Sabores destacados"
    >
      {CHISPAS_FONDO.map(([top, left, rot, color, delay]) => (
        <motion.span
          key={`${top}-${left}`}
          className={styles.chispa}
          style={{ top, left, backgroundColor: color, rotate: rot }}
          animate={{ y: [0, -18, 0], rotate: [rot, rot + 40, rot] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
          aria-hidden="true"
        />
      ))}

      <div className={`contenedor ${styles.grid}`}>
        <div className={styles.texto}>
          <AnimatePresence mode="wait">
            <motion.span
              key={`tag-${sabor.id}`}
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {sabor.etiqueta} · Sabor {indice + 1} de {total}
            </motion.span>
          </AnimatePresence>

          <h1 className={styles.nombre} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={sabor.id}
                className={styles.palabras}
                variants={variantesTexto}
                initial="oculto"
                animate="visible"
                exit="salida"
              >
                {sabor.nombre.split(' ').map((palabra, p) => (
                  <span key={p} className={styles.palabra}>
                    {palabra.split('').map((letra, l) => (
                      <motion.span key={l} className={styles.letra} variants={variantesLetra}>
                        {letra}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.span>
            </AnimatePresence>
          </h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${sabor.id}`}
              className={styles.detalle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
              exit={{ opacity: 0, y: -8 }}
            >
              <p className={styles.descripcion}>{sabor.contenido}</p>
              <p className={styles.precio}>
                {formatearPrecio(sabor.precio)} <span>/ bola</span>
              </p>
            </motion.div>
          </AnimatePresence>

          <div className={styles.acciones}>
            <motion.span whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
              <Link href="/tienda" className="btn btnPrimario">Ver el menú</Link>
            </motion.span>
            <motion.button
              type="button"
              className="btn btnSecundario"
              onClick={() => ir(indice + 1, 1)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Siguiente sabor →
            </motion.button>
          </div>

          <div className={styles.selector} role="tablist" aria-label="Elegir sabor">
            {sabores.map((s, i) => (
              <motion.button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === indice}
                aria-label={s.nombre}
                className={styles.mini}
                style={{ backgroundColor: s.fondo }}
                onClick={() => ir(i, i >= indice ? 1 : -1)}
                whileHover={{ y: -6, rotate: -8 }}
                whileTap={{ scale: 0.9 }}
              >
                {i === indice && <motion.span layoutId="mini-ring" className={styles.miniRing} />}
                <Scoop sabor={s} chispas={false} cereza={false} className={styles.miniScoop} />
              </motion.button>
            ))}
          </div>

          <div className={styles.progreso} aria-hidden="true">
            <motion.div
              key={`${indice}-${pausado}`}
              className={styles.progresoBarra}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: pausado ? 0 : 1 }}
              transition={{ duration: pausado ? 0.3 : DURACION / 1000, ease: 'linear' }}
            />
          </div>
        </div>

        <div className={styles.escena}>
          <motion.div
            className={styles.blob}
            animate={{
              backgroundColor: sabor.light,
              borderRadius: [
                '42% 58% 63% 37% / 41% 44% 56% 59%',
                '58% 42% 38% 62% / 55% 38% 62% 45%',
                '42% 58% 63% 37% / 41% 44% 56% 59%',
              ],
              rotate: [0, 8, 0],
            }}
            transition={{
              backgroundColor: { duration: 0.9 },
              borderRadius: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
          <motion.div
            className={styles.anillo}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            className={styles.sello}
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100">
              <defs>
                <path id={`circulo-${idTexto}`} d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text>
                <textPath href={`#circulo-${idTexto}`} textLength="236" lengthAdjust="spacing">100% ARTESANAL · HECHO HOY · </textPath>
              </text>
            </svg>
            <motion.span className={styles.selloCentro} animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}>
              ★
            </motion.span>
          </motion.div>

          <motion.div
            className={styles.sombra}
            animate={{ scaleX: [1, 0.8, 1], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={sabor.id}
              className={styles.scoopWrap}
              custom={dir}
              variants={variantesScoop}
              initial="entra"
              animate="centro"
              exit="sale"
              transition={{ type: 'spring', stiffness: 140, damping: 16 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) ir(indice + 1, 1)
                else if (info.offset.x > 60) ir(indice - 1, -1)
              }}
            >
              <motion.div
                animate={{ y: [0, -18, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Scoop sabor={sabor} className={styles.scoop} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}

export default FlavorCarousel
