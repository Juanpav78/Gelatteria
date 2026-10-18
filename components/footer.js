import Link from 'next/link'
import styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <svg className={styles.ola} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,70 C90,70 110,110 170,110 C230,110 240,60 320,60 C400,60 410,100 480,100 C560,100 580,40 680,40 C780,40 790,104 880,104 C960,104 980,56 1060,56 C1140,56 1150,96 1230,96 C1310,96 1340,64 1440,64 L1440,120 L0,120 Z" />
      </svg>
      <div className={`contenedor ${styles.grid}`}>
        <div>
          <p className={styles.marca}>Gelatteria</p>
          <p className={styles.texto}>Helado artesanal hecho cada mañana, con fruta real y mucho cariño.</p>
        </div>
        <div>
          <p className={styles.titulo}>Explora</p>
          <ul className={styles.lista}>
            <li><Link href="/tienda">Menú</Link></li>
            <li><Link href="/nosotros">Nosotros</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <p className={styles.titulo}>Horario</p>
          <p className={styles.texto}>Lunes a domingo<br />11:00 – 22:00</p>
        </div>
      </div>
      <p className={styles.copy}>&copy; {new Date().getFullYear()} Gelatteria · Juan Alvarado</p>
    </footer>
  )
}

export default Footer
