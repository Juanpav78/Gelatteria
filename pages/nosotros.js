import Image from 'next/image'
import { motion } from 'framer-motion'
import Layout from '../components/layout'
import Scoop from '../components/scoop'
import { sabores } from '../data/sabores'
import imgNosotros from '../public/img/imgNosotros.jpg'
import imgLocal from '../public/img/imgLocalHelados2.jpg'
import styles from '../styles/nosotros.module.css'

const datos = [
  { valor: '12', texto: 'años batiendo helado' },
  { valor: '40+', texto: 'sabores creados' },
  { valor: '100%', texto: 'ingredientes naturales' },
]

const deslizar = (x) => ({
  initial: { opacity: 0, x },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { type: 'spring', stiffness: 80, damping: 18 },
})

const Nosotros = () => {
  return (
    <Layout title="Nosotros" description="Conoce la historia de Gelatteria, heladería artesanal.">
      <section className="contenedor seccion">
        <div className={styles.contenido}>
          <motion.div className={styles.fotos} {...deslizar(-60)}>
            <div className={styles.fotoPrincipal}>
              <Image src={imgNosotros} alt="Equipo de Gelatteria" fill placeholder="blur" sizes="(max-width: 1000px) 100vw, 50vw" priority />
            </div>
            <motion.div className={styles.fotoSecundaria} whileHover={{ rotate: 0, scale: 1.05 }}>
              <Image src={imgLocal} alt="Nuestro local" fill placeholder="blur" sizes="20rem" />
            </motion.div>
            <motion.div
              className={styles.scoopFlotante}
              animate={{ y: [0, -16, 0], rotate: [-6, 6, -6] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <Scoop sabor={sabores[0]} />
            </motion.div>
          </motion.div>

          <motion.div className={styles.texto} {...deslizar(60)}>
            <span className="eyebrow">Nuestra historia</span>
            <h1 className={`titulo ${styles.tituloIzq}`}>Sobre nosotros</h1>
            <p>
              Gelatteria nació en una pequeña cocina con una máquina de helado prestada y una idea fija: que cada bola
              supiera exactamente a lo que promete. Fresa que sabe a fresa, chocolate que sabe a cacao.
            </p>
            <p>
              Hoy seguimos batiendo en pequeños lotes cada mañana, probando combinaciones nuevas cada temporada y
              recibiendo a los clientes como si fueran parte de la familia, porque la mayoría ya lo son.
            </p>
          </motion.div>
        </div>

        <div className={styles.datos}>
          {datos.map((d, i) => (
            <motion.div
              key={d.texto}
              className={styles.dato}
              style={{ backgroundColor: sabores[i + 4].fondo }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: i * 0.12 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <span className={styles.valor} style={{ color: sabores[i + 4].acento }}>{d.valor}</span>
              <span>{d.texto}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Nosotros
