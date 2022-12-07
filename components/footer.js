import Link from "next/link"
const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__copy"><p>&copy; 2022 - Juan Alvarado</p></div>
        <div className="footer__social">
            <Link href="#">FACEBOOK</Link>
            <Link href="#">INSTAGRAM</Link>
        </div>
    </footer>
  )
  }
export default Footer