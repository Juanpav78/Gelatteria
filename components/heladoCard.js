import Image from 'next/image'
import { motion } from 'framer-motion'
import Scoop from './scoop'
import { formatearPrecio } from '../data/sabores'
import styles from '../styles/tienda.module.css'

export const variablesSabor = (h) => ({ '--fondo': h.fondo, '--color': h.color, '--acento': h.acento })

export const tarjetaVariants = {
  oculto: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 110, damping: 16 } },
}

const HeladoCard = ({ helado, onSelect }) => {
  const { id, nombre, contenido, precio, img, etiqueta } = helado

  return (
    <motion.button
      type="button"
      layoutId={`helado-${id}`}
      variants={tarjetaVariants}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(helado)}
      className={styles.card}
      style={variablesSabor(helado)}
    >
      <div className={styles.visual}>
        {img ? (
          <Image src={img} alt={nombre} fill sizes="(max-width: 700px) 100vw, 33vw" className={styles.foto} unoptimized={!img.includes('res.cloudinary.com')} />
        ) : (
          <div className={styles.scoop}>
            <Scoop sabor={helado} />
          </div>
        )}
        {etiqueta && <span className={styles.tag}>{etiqueta}</span>}
      </div>
      <div className={styles.info}>
        <h3>{nombre}</h3>
        <p className={styles.desc}>{contenido}</p>
        <div className={styles.pie}>
          <span className={styles.precio}>{formatearPrecio(precio)}</span>
          <span className={styles.ver}>Ver más →</span>
        </div>
      </div>
    </motion.button>
  )
}

export default HeladoCard
