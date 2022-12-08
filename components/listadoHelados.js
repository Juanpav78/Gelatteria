import styles from '../styles/listadoH.module.css'
import Link from "next/link"
const ListadoHelados = ({helado}) => {
    const{nombre, contenido, precio, img, url} = helado.attributes
  return (
    <Link href={"/tienda/" + url } className={styles.helados__carta + " p-0"}>
        <img className={styles.img} src={img.data.attributes.url} alt={nombre} />
        <div className={styles.helados__carta_info}>
            <h3 className={styles.h3}>{nombre}</h3>
            <p className={styles.contenidos + " fs-3 mb-"}>{contenido}</p>
            <p className={styles.precio}>{precio}$</p>
        </div>
    </Link>
  )
}

export default ListadoHelados