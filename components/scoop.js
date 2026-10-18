import { useId } from 'react'

// [x, y, rotación, color] de cada chispita sobre la bola
const CHISPAS = [
  [68, 62, -30, '#ff6b9a'],
  [116, 50, 20, '#ffd93d'],
  [138, 86, -50, '#6bc5ff'],
  [94, 96, 40, '#ffffff'],
  [62, 100, 10, '#8be08b'],
  [114, 116, -20, '#ff9f43'],
  [86, 74, 70, '#b388ff'],
  [132, 112, 35, '#ff6b9a'],
  [100, 128, -60, '#ffd93d'],
]

const LINEAS_CONO = [-40, -18, 4, 26, 48, 70, 92, 114, 136, 158, 180, 202]

// Helado ilustrado que toma los colores del sabor
const Scoop = ({ sabor, chispas = true, cereza = true, className }) => {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const { color, light, acento, topping = '#e0234e' } = sabor

  return (
    <svg viewBox="0 0 200 280" className={className} role="img" aria-label={`Helado de ${sabor.nombre}`}>
      <defs>
        <clipPath id={`cono-${id}`}>
          <path d="M54 142 L146 142 L100 274 Z" />
        </clipPath>
        <radialGradient id={`brillo-${id}`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={light} />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor={acento} />
        </radialGradient>
      </defs>

      {/* Cono de galleta */}
      <path d="M54 142 L146 142 L100 274 Z" fill="#e3a65c" />
      <g clipPath={`url(#cono-${id})`} stroke="#b9772f" strokeWidth="3" opacity="0.55">
        {LINEAS_CONO.map((x) => (
          <line key={`a${x}`} x1={x} y1={140} x2={x + 80} y2={280} />
        ))}
        {LINEAS_CONO.map((x) => (
          <line key={`b${x}`} x1={x} y1={140} x2={x - 80} y2={280} />
        ))}
        <path d="M100 142 L146 142 L100 274 Z" fill="#000" stroke="none" opacity="0.12" />
      </g>

      {/* Base derretida */}
      <path
        d="M44 128 C44 116 56 112 70 114 L130 114 C144 112 156 116 156 128 C156 140 150 146 146 150 C142 166 130 166 130 152 C126 146 118 148 116 158 C112 178 96 178 96 160 C94 150 84 148 80 156 C74 168 62 164 64 150 C56 148 44 142 44 128 Z"
        fill={color}
      />

      {/* Bola */}
      <circle cx="100" cy="90" r="56" fill={`url(#brillo-${id})`} />
      <path d="M58 112 C80 126 120 126 142 112" stroke={acento} strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round" />
      <ellipse cx="76" cy="64" rx="16" ry="9" fill="#fff" opacity="0.5" transform="rotate(-30 76 64)" />

      {chispas &&
        CHISPAS.map(([x, y, r, c]) => (
          <rect key={`${x}-${y}`} x={x - 5} y={y - 1.75} width="10" height="3.5" rx="1.75" fill={c} transform={`rotate(${r} ${x} ${y})`} />
        ))}

      {cereza && (
        <g>
          <path d="M104 30 C106 18 114 10 124 8" stroke="#5a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="102" cy="36" r="11" fill={topping} />
          <circle cx="98" cy="32" r="3" fill="#fff" opacity="0.6" />
        </g>
      )}
    </svg>
  )
}

export default Scoop
