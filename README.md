# 🍨 Gelatteria

> Tienda de helados artesanales con animaciones fluidas y una paleta de colores e ilustración propias para cada sabor.

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Strapi](https://img.shields.io/badge/Strapi-4945FF?style=flat&logo=strapi&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)

**Lo que demuestra este proyecto:** Next.js con datos desde un CMS headless (Strapi) y respaldo local si la API no responde, ilustraciones de helado dibujadas con código según el sabor, transiciones compartidas entre tarjeta y modal con Framer Motion y estilos con CSS Modules.

## ✨ Páginas

- **Inicio** con carrusel de sabores
- **Tienda**: menú con marquesina de sabores y modal de detalle por helado
- **Nosotros**, **Blog** y **Contacto**

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Datos

La tienda (`/tienda`) lee los helados desde Strapi usando `API_URL` en `.env`
(por defecto `http://localhost:1337/api/`). Si la API no responde, se muestran los
sabores de demostración definidos en `data/sabores.js`, que también alimentan el
carrusel de la página de inicio.

Cada helado recibe una paleta de colores según su nombre (fresa, chocolate, pistacho...),
que se usa para dibujar su ilustración en `components/scoop.js`.

## Scripts

- `npm run dev`: servidor de desarrollo
- `npm run build`: build de producción
- `npm run start`: sirve el build
- `npm run lint`: ESLint

---

Hecho por **Juan Pablo Alvarado** · [Portafolio](https://juanpalvaradov.com) · [LinkedIn](https://www.linkedin.com/in/juanpavpandax/) · [GitHub](https://github.com/Juanpav78)
