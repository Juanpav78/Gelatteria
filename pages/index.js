import Link from "next/link"
import Layout from "../components/layout";

export default function Home() {
  return (
    <>
      <Layout
        title={'Inicio'}
        description={'Tienda de Helado, venta Helados, Fabrica helados, Helados, dulces, frio'}
      >

        <h1>INICIO</h1>
        <Link href={'/nosotros'}> IR A Nosotros</Link>

      </Layout>

      

    </>
  )
}
