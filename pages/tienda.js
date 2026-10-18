import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '../components/layout'
import FlavorMarquee from '../components/flavorMarquee'
import HeladoCard from '../components/heladoCard'
import HeladoModal from '../components/heladoModal'
import { normalizarHelados, sabores } from '../data/sabores'
import styles from '../styles/tienda.module.css'

const Tienda = ({ helados, usandoDemo }) => {
  const [seleccionado, setSeleccionado] = useState(null)
  const cerrar = useCallback(() => setSeleccionado(null), [])

  return (
    <Layout title="Tienda" description="Menú de Gelatteria: helados artesanales frutales, clásicos y premium.">
      <section className={styles.cabecera}>
        <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          Nuestro menú
        </motion.span>
        <h1 className="titulo">Elige tu sabor</h1>
        <p>Toca cualquier helado para conocerlo mejor.</p>
      </section>

      <FlavorMarquee items={helados} velocidad={45} onSelect={setSeleccionado} />

      <section className={`contenedor ${styles.contenido}`}>
        {usandoDemo && process.env.NODE_ENV === 'development' && (
          <p className={styles.aviso}>La API no respondió: mostrando los sabores de demostración de data/sabores.js.</p>
        )}

        {helados.length > 0 ? (
          <motion.div
            className={styles.grid}
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ oculto: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {helados.map((helado) => (
              <HeladoCard key={helado.id} helado={helado} onSelect={setSeleccionado} />
            ))}
          </motion.div>
        ) : (
          <h2 className={styles.vacio}>No hay productos disponibles actualmente</h2>
        )}
      </section>

      <AnimatePresence>
        {seleccionado && <HeladoModal key={seleccionado.id} helado={seleccionado} onClose={cerrar} />}
      </AnimatePresence>
    </Layout>
  )
}

export default Tienda

export async function getStaticProps() {
  let helados = []
  try {
    const respuesta = await fetch(`${process.env.API_URL}helados?populate=img`, { signal: AbortSignal.timeout(5000) })
    if (respuesta.ok) {
      const { data } = await respuesta.json()
      helados = normalizarHelados(data, process.env.API_URL)
    }
  } catch {
    // Sin API disponible: se usan los sabores de demostración
  }

  const usandoDemo = helados.length === 0
  return {
    props: { helados: usandoDemo ? sabores : helados, usandoDemo },
    revalidate: 60,
  }
}
