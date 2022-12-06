import {Html, Head, Main, NextScript} from 'next/document'

export default function Document(){
    return (
        <Html>
            <Head>
            <title>Gelatteria</title>
            <meta name="description" content="Tienda de Helados, Gelatteria" />
            <link rel="icon" href="/LogoHelado.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&family=Lobster&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
            
            </Head>

            <body>
                <Main/>
                <NextScript/>
            </body>

            
        </Html>
        
    )
}