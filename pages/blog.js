import { motion } from 'framer-motion'
import Layout from '../components/layout'
import Scoop from '../components/scoop'
import { sabores } from '../data/sabores'
import styles from '../styles/paginas.module.css'

const Blog = () => {
  return (
    <Layout title="Blog" description="Blog de Gelatteria: recetas, novedades y sabores de temporada.">
      <section className={`contenedor ${styles.pagina}`}>
        <div className={styles.scoops} aria-hidden="true">
          {[sabores[5], sabores[0], sabores[6]].map((s, i) => (
            <motion.div
              key={s.id}
              animate={{ y: [0, -20, 0], rotate: [-8, 8, -8] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
            >
              <Scoop sabor={s} />
            </motion.div>
          ))}
        </div>
        <span className="eyebrow">Blog</span>
        <h1 className="titulo">Se está congelando…</h1>
        <p>Pronto compartiremos recetas, historias de la cocina y los sabores de cada temporada.</p>
      </section>
    </Layout>
  )
}

export default Blog
