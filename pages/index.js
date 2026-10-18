import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Layout from '../components/layout'
import FlavorCarousel from '../components/flavorCarousel'
import FlavorMarquee from '../components/flavorMarquee'
import Scoop from '../components/scoop'
import { sabores } from '../data/sabores'
import imgSabores from '../public/img/imgHeladosSabores2.jpg'
import imgVitrina from '../public/img/imgVitrinaHelados.jpg'
import imgBanana from '../public/img/imgBananaSplit3.jpg'
import imgPaleta from '../public/img/imgHeladoPaleta2.jpg'
import styles from '../styles/home.module.css'

const razones = [
  { sabor: sabores[0], titulo: 'Fruta de verdad', texto: 'Compramos a productores locales y usamos la fruta en su punto, sin saborizantes.' },
  { sabor: sabores[3], titulo: 'Hecho cada mañana', texto: 'Batimos en pequeños lotes todos los días para que cada bola llegue perfecta.' },
  { sabor: sabores[2], titulo: 'Recetas premium', texto: 'Pistacho siciliano, cacao de origen y vainilla en vaina. Sin atajos.' },
]

const galeria = [
  { img: imgSabores, alt: 'Bolas de helado de varios sabores', clase: 'grande' },
  { img: imgVitrina, alt: 'Vitrina de helados', clase: '' },
  { img: imgBanana, alt: 'Banana split', clase: '' },
  { img: imgPaleta, alt: 'Paletas de helado', clase: 'ancha' },
]

const aparecer = {
  oculto: { opacity: 0, y: 50 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 16, delay: i * 0.12 } }),
}

export default function Home() {
  return (
    <Layout title="Inicio" description="Gelatteria, tienda de helados artesanales: sabores frutales, clásicos y premium hechos cada día.">
      <FlavorCarousel sabores={sabores} />

      <section className={styles.cinta}>
        <FlavorMarquee items={sabores} velocidad={70} />
        <FlavorMarquee items={[...sabores].reverse()} velocidad={50} reversa />
      </section>

      <section className="seccion">
        <div className="contenedor">
          <motion.div className="seccionHead" variants={aparecer} initial="oculto" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <span className="eyebrow">Por qué Gelatteria</span>
            <h2 className="titulo">Felicidad en cada bola</h2>
            <p>Somos una heladería artesanal que se toma muy en serio la diversión.</p>
          </motion.div>

          <div className={styles.razones}>
            {razones.map((r, i) => (
              <motion.article
                key={r.titulo}
                className={styles.razon}
                style={{ backgroundColor: r.sabor.fondo }}
                variants={aparecer}
                custom={i}
                initial="oculto"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -12, rotate: [-1.5, 0, 1.5][i] }}
              >
                <motion.div className={styles.razonIcono} whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}>
                  <Scoop sabor={r.sabor} />
                </motion.div>
                <h3>{r.titulo}</h3>
                <p>{r.texto}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={`seccion ${styles.galeriaSeccion}`}>
        <div className="contenedor">
          <motion.div className="seccionHead" variants={aparecer} initial="oculto" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <span className="eyebrow">Nuestra vitrina</span>
            <h2 className="titulo">Antojo garantizado</h2>
          </motion.div>
          <div className={styles.galeria}>
            {galeria.map((g, i) => (
              <motion.figure
                key={g.alt}
                className={`${styles.foto} ${g.clase ? styles[g.clase] : ''}`}
                variants={aparecer}
                custom={i}
                initial="oculto"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image src={g.img} alt={g.alt} fill placeholder="blur" sizes="(max-width: 700px) 100vw, 50vw" />
                <figcaption>{g.alt}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="contenedor">
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 100, damping: 16 }}
        >
          <div className={styles.ctaScoops} aria-hidden="true">
            {[sabores[4], sabores[1], sabores[5]].map((s, i) => (
              <motion.div
                key={s.id}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                <Scoop sabor={s} />
              </motion.div>
            ))}
          </div>
          <div className={styles.ctaTexto}>
            <h2>¿Listo para tu próximo sabor favorito?</h2>
            <p>Más de 8 sabores esperándote en la vitrina, y cada temporada llegan nuevos.</p>
            <motion.span whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
              <Link href="/tienda" className={`btn ${styles.ctaBtn}`}>Explorar el menú</Link>
            </motion.span>
          </div>
        </motion.div>
      </section>
    </Layout>
  )
}
