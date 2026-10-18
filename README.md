# Gelatteria

Tienda de helados hecha con [Next.js](https://nextjs.org/) 16 (pages router), React 19 y [Framer Motion](https://motion.dev/).

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
