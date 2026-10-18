import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Scoop from './scoop'
import { variablesSabor } from './heladoCard'
import { formatearPrecio } from '../data/sabores'
import styles from '../styles/tienda.module.css'

const HeladoModal = ({ helado, onClose }) => {
  const { id, nombre, contenido, precio, img, etiqueta } = helado

  useEffect(() => {
    const alPresionar = (e) => e.key === 'Escape' && onClose()
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', alPresionar)
    return () => {
      document.body.style.overflow = overflowPrevio
      document.removeEventListener('keydown', alPresionar)
    }
  }, [onClose])

  return (
    <motion.div className={styles.fondo} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        layoutId={`helado-${id}`}
        className={styles.modal}
        style={variablesSabor(helado)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
      >
        <button type="button" className={styles.cerrar} onClick={onClose} aria-label="Cerrar" autoFocus>
          ×
        </button>
        <div className={styles.modalVisual}>
          {img ? (
            <Image src={img} alt={nombre} fill sizes="(max-width: 700px) 100vw, 50vw" className={styles.foto} unoptimized={!img.includes('res.cloudinary.com')} />
          ) : (
            <motion.div
              className={styles.modalScoop}
              animate={{ y: [0, -14, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Scoop sabor={helado} />
            </motion.div>
          )}
        </div>
        <motion.div
          className={styles.modalInfo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          {etiqueta && <span className={styles.tagInline}>{etiqueta}</span>}
          <h2 id="modal-titulo">{nombre}</h2>
          <p>{contenido}</p>
          <p className={styles.modalPrecio}>
            {formatearPrecio(precio)} <span>/ bola</span>
          </p>
          <motion.span whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contacto" className="btn btnPrimario">Pedir este sabor</Link>
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default HeladoModal
