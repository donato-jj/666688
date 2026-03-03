'use client';

const GLOSSARY = [
  { term: 'ADN', def: 'Ácido desoxirribonucleico; molécula portadora de información genética en doble hélice.' },
  { term: 'Nucleótido', def: 'Unidad monomérica del ADN: fosfato + azúcar (desoxirribosa) + base nitrogenada.' },
  { term: 'Base nitrogenada', def: 'Adenina (A), Timina (T), Citosina (C), Guanina (G).' },
  { term: 'Enlace hidrógeno', def: 'Enlace no covalente que une los pares de bases (A-T: 2 enlaces; C-G: 3 enlaces).' },
  { term: 'Nucleosoma', def: 'Unidad básica de cromatina: ~147 pb de ADN enrolladas en octámero de histonas.' },
  { term: 'Cromatina', def: 'Complejo de ADN + proteínas histonas que forma la estructura del cromosoma.' },
  { term: 'Cromosoma', def: 'Estructura de cromatina altamente condensada, visible en mitosis/meiosis.' },
  { term: 'Membrana celular', def: 'Bicapa lipídica que delimita la célula; aquí representada como esfera semitransparente.' },
  { term: 'Campo', def: 'En física: distribución de una magnitud en el espacio. Aquí: campo procedimental de ruido.' },
  { term: 'Geodésica', def: 'Trayectoria de longitud mínima en espacio curvo (concepto de relatividad general).' },
  { term: 'Curvatura', def: 'Deformación del espacio-tiempo por masa-energía (relatividad general de Einstein).' },
  { term: 'FBM', def: 'Fractional Brownian Motion: ruido procedimental multi-octava para efectos visuales.' },
];

const BIBLIOGRAPHY = [
  'Alberts et al. — Molecular Biology of the Cell (Norton, 7th ed.)',
  'Watson & Crick — A Structure for Deoxyribose Nucleic Acid (Nature, 1953)',
  'Stryer, Berg & Tymoczko — Biochemistry (Freeman)',
  'Lodish et al. — Molecular Cell Biology (Freeman)',
  'Misner, Thorne & Wheeler — Gravitation (Princeton Univ. Press)',
  'Darwin — On the Origin of Species (1859)',
];

export default function AcademicPanel() {
  return (
    <div>
      <h2 className="font-bold text-yellow-400 mb-3 uppercase text-xs tracking-widest">Sección Académica</h2>

      <div className="mb-4">
        <h3 className="text-gray-300 font-semibold mb-2 text-xs">Glosario</h3>
        <div className="space-y-2">
          {GLOSSARY.map(g => (
            <div key={g.term}>
              <span className="text-blue-300 font-bold">{g.term}:</span>
              <span className="text-gray-400 ml-1 text-xs">{g.def}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-300 font-semibold mb-2 text-xs">Bibliografía sugerida</h3>
        <ul className="space-y-1 text-gray-400 text-xs">
          {BIBLIOGRAPHY.map((b, i) => (
            <li key={i} className="pl-2 border-l border-gray-700">{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
