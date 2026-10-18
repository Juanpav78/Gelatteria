import { motion } from 'framer-motion'
import Layout from '../components/layout'
import Scoop from '../components/scoop'
import { sabores } from '../data/sabores'
import styles from '../styles/paginas.module.css'

const datos = [
  { titulo: 'Visítanos', texto: 'Calle del Sabor 123, Centro' },
  { titulo: 'Horario', texto: 'Lunes a domingo, 11:00 – 22:00' },
  { titulo: 'Escríbenos', texto: 'hola@gelatteria.com' },
]

const Contacto = () => {
  return (
    <Layout title="Contacto" description="Contacta a Gelatteria: dirección, horario y pedidos.">
      <section className={`contenedor ${styles.pagina}`}>
        <motion.div
          className={styles.scoopUnico}
          animate={{ y: [0, -16, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <Scoop sabor={sabores[7]} />
        </motion.div>
        <span className="eyebrow">Contacto</span>
        <h1 className="titulo">Pasa por tu helado</h1>
        <p>Pedidos para eventos, cumpleaños o simplemente un antojo: aquí estamos.</p>

        <div className={styles.tarjetas}>
          {datos.map((d, i) => (
            <motion.div
              key={d.titulo}
              className={styles.tarjeta}
              style={{ backgroundColor: sabores[i].fondo }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <h2 style={{ color: sabores[i].acento }}>{d.titulo}</h2>
              <p>{d.texto}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Contacto
