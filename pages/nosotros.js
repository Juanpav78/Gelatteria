import styles from '../styles/nosotros.module.css'
import Image from "next/image";
import Layout from "../components/layout";

const Nosotros = () => {
  return (
    <>
      <Layout
        title={'Nosotros'}
        description={'Sobre Nosotros, Tienda de Helado, venta Helados, Fabrica helados, Helados, dulces, frio'}
      >
        
        <main className="container">
          <h2 className={styles.titulo}>Sobre nosotros</h2>
          <div className={styles.contenido + " m-5"}>
            <Image src="/img/imgNosotros.jpg" width={1000} height={800} alt="Nosotros, imagen, sobre nosotros"/>
            <div>
              <p className="fs-3">Integer fermentum a sapien ac placerat. Praesent vitae leo nec urna tincidunt convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque sed nibh non nulla rutrum lacinia. Integer egestas ut neque id dictum. Morbi fermentum ligula in auctor convallis. Duis viverra tellus mi, vel tristique lectus bibendum sit amet. Integer orci orci, dictum eget quam at, rhoncus mattis est. Praesent iaculis vel risus et porta. Morbi dignissim nulla sit amet quam pharetra, sit amet pretium dui semper. Proin placerat, risus vitae egestas commodo, lorem neque rhoncus lorem, vel vulputate elit arcu eu sem.</p>
              <p className="fs-3">Curabitur ac neque at erat volutpat luctus quis eu dolor. Aenean nulla nulla, sollicitudin ut ante in, blandit lobortis leo. Vivamus scelerisque justo ac tempor lacinia. Nullam egestas velit et erat volutpat feugiat. Cras dolor libero, aliquet non justo ut, egestas feugiat augue. Fusce auctor dui elit, sed tincidunt ante pharetra nec. Curabitur quis euismod ante. Nullam bibendum, arcu pharetra pellentesque semper, turpis purus sollicitudin mi, nec congue augue felis vel augue. Nullam ac bibendum erat, et scelerisque elit. Vivamus sit amet ligula arcu. Phasellus in orci purus. Pellentesque iaculis urna sit amet ultrices feugiat.</p>            </div>
          </div>
          
          
        </main>
        
        
      </Layout>

      

    </>
    
  )
}

export default Nosotros