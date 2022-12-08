import next from "next";
import Layout from "../components/layout";
import ListadoHelados from "../components/listadoHelados";
import styles from '../styles/listadoH.module.css'

const Tienda = ({helados}) => {

  return (
    <>
      <Layout
        title={'Tienda'}
        description={'Sobre Nosotros, Tienda de Helado, venta Helados, Fabrica helados, Helados, dulces, frio'}
      >
        <main className="container" >
            <h1 className="titulo">Tienda</h1>
            <div className={styles.contenedor__helados + " row m-auto justify-content-center gap-4 my-5"}>
            {helados?.length > 0 ? (
              helados?.map( helado => (
                <ListadoHelados 
                  helado = {helado}
                  key= {helado.id}
                />
              ))

            ): 
            (

              <h2 className="text-center m-5"> No hay productos disponibles actualmente</h2>
            )
            }
            </div>
           
            
        </main>
      </Layout>

      

    </>
  )
}

export default Tienda


export async function getStaticProps(){
  const respuesta = await fetch(`${process.env.API_URL}helados?populate=img`)
  const {data : helados} = await respuesta.json()
  return{
    props: {
      helados
    }
  }
}