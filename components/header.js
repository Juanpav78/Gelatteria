import Logo from "../public/img/LogoHelado2.png"
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from "next/router"
import { useState } from "react"


const cambio = (bool)=>{
    i=1
    if (bool){
        return false
    }else{
        return true
    }
    
}
let i=0;
const Header = () => {
    const router = useRouter()
    const [btn , setbtn] = useState(false)
    const stateBtn = {
        normal :  "nav__boton--line",
        active : "nav__boton--line active"
    }
    const stateNav = {
        normal :  "navbar",
        active : "navbar active "
    }

    if(i==0){
        stateBtn.normal ="nav__boton--line na"
    }

    
  return (
    <header className="header bg-light p-4">
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <Link href={"/"} className="logo d-flex flex-column align-items-center mt-5 ">
                <Image width={100} height={100} src={Logo.src} alt="logo helado" priority={true}/>
                <p className="text-titulo text-center fw-bold">Gelatteria</p>
            </Link>
    
            <nav className="">
                <div className="nav__boton boton_circular boton no-animation d-block d-sm-none " onClick={() => setbtn(cambio(btn))}  id="botonNav">
                    <div className={btn ? (stateBtn.active) : (stateBtn.normal)} ></div>
                    <div className={btn ? (stateBtn.active) : (stateBtn.normal)} ></div>
                    <div className={btn ? (stateBtn.active) : (stateBtn.normal)} ></div>
                </div>
                <div className={btn ? (stateNav.active) : (stateNav.normal)} id="navbar" >
                    <Link href="/" className={router.pathname === "/" ? "mx-2 text-enlace text-active" : "mx-2 text-enlace"}>Inicio</Link>
                    <Link href="/nosotros" className={router.pathname === "/nosotros" ? "mx-2 text-enlace text-active" : "mx-2 text-enlace"}>Nosotros</Link>
                    <Link href="/tienda" className={router.pathname === "/tienda" ? "mx-2 text-enlace text-active" : "mx-2 text-enlace"}>Menu</Link>
                    <Link href="/blog" className={router.pathname === "/blog" ? "mx-2 text-enlace text-active" : "mx-2 text-enlace"}>Blog</Link>
                </div>
             
            </nav>
        </div>  
    </header>
  )
}

export default Header