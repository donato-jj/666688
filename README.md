# Sistema de Reconstrucción Académica — BioSci 3D

Visualización 3D interactiva para biología molecular y física, orientada a la enseñanza académica.

## Stack tecnológico

- **JavaScript / TypeScript** — Lenguaje principal
- **Node.js** — Entorno de ejecución
- **Next.js 14** (App Router) — Framework React fullstack
- **React Three Fiber** + **Three.js** — Renderizado 3D en WebGL
- **@react-three/drei** — Helpers y abstracciones 3D
- **TailwindCSS** — Estilos utilitarios
- **Zustand** — Estado global

## Características

- 🧬 Doble hélice de ADN interactiva (pares Watson-Crick)
- 🔬 Empaquetamiento jerárquico: nucleosoma → cromatina → cromosoma
- 🌌 Campo de vacío (FBM shader procedimental)
- 🌀 Curvatura espacial estilo Einstein (malla de Schwarzschild simplificada)
- 🦠 Ensamblaje celular con orgánulos abstractos
- 📊 Panel de mutaciones (Darwin)
- 📚 Glosario académico + bibliografía
- 🎓 Presentación guiada paso a paso

## Cómo ejecutar localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Build de producción

```bash
npm run build
npm start
```

## Deploy en Vercel

```bash
npx vercel --prod
```

O conecta el repositorio en [vercel.com](https://vercel.com).

## Veracidad y Metáfora

| Elemento | Tipo | Nota |
|---|---|---|
| Doble hélice ADN | ✓ Científico | Pares Watson-Crick reales |
| Empaquetamiento nucleosomal | ✓ Científico | Jerarquía real simplificada |
| Mutaciones de bases | ✓ Científico | Sustitución de bases real |
| Membrana celular | ✓ Científico | Abstracción visual de bicapa lipídica |
| Genoma del vacío | ⚠ Metáfora | Concepto artístico/didáctico |
| Curvatura Einstein | ⚠ Metáfora | Malla 3D inspirada en GR, no simulación real |
| Geodésicas | ⚠ Metáfora | Aproximación visual, no relatividad real |

## Limitaciones del modelo

- No es simulación de dinámica molecular
- Las coordenadas son proporcionales/simplificadas
- Las mutaciones son aleatorias, no modelan evolución poblacional
- Los orgánulos son formas abstractas
- La curvatura espacio-temporal es una malla, no relatividad real

## QA Checklist

- [x] TypeScript strict mode
- [x] Build sin errores
- [x] WebGL fallback
- [x] Responsive layout
- [x] Accesibilidad básica (aria-labels)
- [x] Sin secrets en código
- [x] Disclaimer en paneles metafóricos
