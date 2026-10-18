// Sabores de la casa. Se usan en el carrusel de inicio y como respaldo
// cuando la API de Strapi no responde.
export const sabores = [
  {
    id: 'fresa',
    nombre: 'Fresa Silvestre',
    url: 'fresa-silvestre',
    contenido: 'Fresas maduras batidas con crema fresca y un toque de vainilla de Madagascar.',
    precio: 3.5,
    etiqueta: 'Frutal',
    color: '#f58aa6',
    light: '#ffd3df',
    fondo: '#ffe9ef',
    acento: '#d6496f',
    topping: '#e0234e',
  },
  {
    id: 'chocolate',
    nombre: 'Chocolate Intenso',
    url: 'chocolate-intenso',
    contenido: 'Cacao al 70% de origen, oscuro y sedoso, con virutas crujientes.',
    precio: 3.8,
    etiqueta: 'Clásico',
    color: '#8a5a43',
    light: '#c19178',
    fondo: '#f4e4d9',
    acento: '#4e2d20',
    topping: '#e0234e',
  },
  {
    id: 'pistacho',
    nombre: 'Pistacho Real',
    url: 'pistacho-real',
    contenido: 'Pistachos tostados y molidos en casa. Nuestro sabor más premiado.',
    precio: 4.5,
    etiqueta: 'Premium',
    color: '#a9c76f',
    light: '#dcedb5',
    fondo: '#eef6de',
    acento: '#5f7f2a',
    topping: '#c2185b',
  },
  {
    id: 'vainilla',
    nombre: 'Vainilla Bourbon',
    url: 'vainilla-bourbon',
    contenido: 'Vaina de vainilla natural infusionada por 24 horas en leche entera.',
    precio: 3.2,
    etiqueta: 'Clásico',
    color: '#f5df9f',
    light: '#fff5d4',
    fondo: '#fff7e3',
    acento: '#c99a33',
    topping: '#e0234e',
  },
  {
    id: 'mango',
    nombre: 'Mango Tropical',
    url: 'mango-tropical',
    contenido: 'Sorbete de mango de temporada con un susurro de limón y chile dulce.',
    precio: 3.6,
    etiqueta: 'Tropical',
    color: '#ffb347',
    light: '#ffdca3',
    fondo: '#fff0dc',
    acento: '#e07800',
    topping: '#e0234e',
  },
  {
    id: 'mora',
    nombre: 'Mora Azul',
    url: 'mora-azul',
    contenido: 'Arándanos y moras en una base cremosa con remolinos de mermelada.',
    precio: 3.9,
    etiqueta: 'Frutal',
    color: '#8fa9e3',
    light: '#cddcf8',
    fondo: '#eaf1fc',
    acento: '#4a68b5',
    topping: '#7b1fa2',
  },
  {
    id: 'menta',
    nombre: 'Menta Chips',
    url: 'menta-chips',
    contenido: 'Hierbabuena fresca con lascas de chocolate amargo. Refrescante de verdad.',
    precio: 3.7,
    etiqueta: 'Refrescante',
    color: '#8fd6c3',
    light: '#cff0e6',
    fondo: '#e6f7f2',
    acento: '#3e9c84',
    topping: '#4e2d20',
  },
  {
    id: 'arequipe',
    nombre: 'Dulce de Leche',
    url: 'dulce-de-leche',
    contenido: 'Arequipe artesanal cocinado a fuego lento con un hilo de sal marina.',
    precio: 4.2,
    etiqueta: 'De la casa',
    color: '#d39a59',
    light: '#f0d2a8',
    fondo: '#f9ecdc',
    acento: '#8a5a24',
    topping: '#e0234e',
  },
]

const palabrasClave = {
  fresa: ['fresa', 'frutilla', 'strawberry'],
  chocolate: ['chocolate', 'cacao', 'brownie'],
  pistacho: ['pistacho', 'pistache'],
  vainilla: ['vainilla', 'vanilla', 'crema'],
  mango: ['mango', 'maracuya', 'parchita', 'durazno'],
  mora: ['mora', 'arandano', 'blueberry', 'uva'],
  menta: ['menta', 'hierbabuena', 'limon'],
  arequipe: ['arequipe', 'dulce de leche', 'caramelo', 'cafe'],
}

const quitarAcentos = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '')

// Elige la paleta de colores de un helado por su nombre, o por posición si no coincide.
const paletaPara = (nombre = '', indice = 0) => {
  const limpio = quitarAcentos(nombre.toLowerCase())
  const sabor =
    sabores.find((s) => palabrasClave[s.id].some((p) => limpio.includes(p))) ??
    sabores[indice % sabores.length]
  const { color, light, fondo, acento, topping, etiqueta } = sabor
  return { color, light, fondo, acento, topping, etiqueta }
}

// Acepta la respuesta de Strapi v4 (con `attributes`) o v5 (plana).
export const normalizarHelados = (data = [], apiUrl = '') => {
  const origen = apiUrl ? new URL(apiUrl).origin : ''
  return data.map((helado, i) => {
    const a = helado.attributes ?? helado
    const imagen = a.img?.data?.attributes ?? a.img?.data ?? a.img
    let img = imagen?.url ?? null
    if (img?.startsWith('/')) img = origen + img
    return {
      id: helado.id ?? i,
      nombre: a.nombre ?? 'Helado',
      contenido: a.contenido ?? '',
      precio: a.precio ?? '',
      url: a.url ?? String(helado.id ?? i),
      img,
      ...paletaPara(a.nombre, i),
    }
  })
}

export const formatearPrecio = (precio) => {
  const n = Number(precio)
  return Number.isNaN(n) || precio === '' ? String(precio) : `$${n.toFixed(2)}`
}
