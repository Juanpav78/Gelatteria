import Logo from "../public/img/LogoHelado2.png"
import Link from "next/link"
import Image from 'next/image'

const Header = () => {
  return (
    <header className="bg-light p-4">
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <div className="logo d-flex flex-column align-items-center mt-5">
                <Image width={100} height={100} src={Logo.src} alt="logo helado" />
                <p className="text-titulo text-center fw-bold">Gelatteria</p>
            </div>
    
            <nav className="nav">
                <div className="nav__boton boton_circular boton no-animation" id="botonNav">
                    <div className="nav__boton--line na"></div>
                    <div className="nav__boton--line na"></div>
                    <div className="nav__boton--line na"></div>
                </div>
                <div className="navbar" id="navbar">
                    <Link href="/" className="mx-2 text-enlace">Inicio</Link>
                    <Link href="/nosotros" className="mx-2 text-enlace">Nosotros</Link>
                    <Link href="/tienda" className="mx-2 text-enlace">Menu</Link>
                    <Link href="/blog" className="mx-2 text-enlace">Blog</Link>
                </div>
                
    
            </nav>
        </div>  
    </header>
  )
}

export default Header