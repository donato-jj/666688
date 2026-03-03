'use client';

export default function MethodologyPanel() {
  return (
    <div>
      <h2 className="font-bold text-orange-400 mb-3 uppercase text-xs tracking-widest">Metodología del Modelo</h2>

      <div className="space-y-3 text-xs text-gray-400 leading-relaxed">
        <section>
          <h3 className="text-gray-200 font-semibold mb-1">¿Qué es geometría?</h3>
          <p>Los átomos y moléculas se representan como esferas y cilindros 3D. Son metáforas visuales, no representaciones atómicas literales.</p>
        </section>

        <section>
          <h3 className="text-gray-200 font-semibold mb-1">¿Qué es shading?</h3>
          <p>La iluminación PBR (Physically Based Rendering) hace las superficies visualmente convincentes. No simula propiedades ópticas moleculares reales.</p>
        </section>

        <section>
          <h3 className="text-gray-200 font-semibold mb-1">Ciencia vs. Metáfora</h3>
          <ul className="space-y-1">
            <li><span className="text-green-400">✓ Científico:</span> Secuencia de bases, reglas Watson-Crick (A-T, C-G), empaquetamiento nucleosomal, estructura jerárquica.</li>
            <li><span className="text-yellow-400">⚠ Metáfora:</span> &quot;Genoma del vacío&quot;, curvatura Einstein, geodésicas visuales, célula abstracta.</li>
            <li><span className="text-red-400">✗ No afirmado:</span> Ninguna ecuación de Einstein se usa como &quot;algoritmo único&quot;. No se inventan hechos biológicos.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-gray-200 font-semibold mb-1">Limitaciones del modelo</h3>
          <ul className="space-y-1 list-disc pl-3">
            <li>No es simulación de dinámica molecular.</li>
            <li>Las distancias y ángulos son proporcionales/simplificados.</li>
            <li>La curvatura espacio-temporal es una malla 3D, no relatividad real.</li>
            <li>Las mutaciones son aleatorias, no modelan evolución poblacional.</li>
            <li>Los organelos son formas abstractas, no estructuras biológicas exactas.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-gray-200 font-semibold mb-1">Stack tecnológico</h3>
          <p>JavaScript/TypeScript, Node.js, Next.js (App Router), React Three Fiber, Three.js, TailwindCSS, Zustand.</p>
        </section>
      </div>
    </div>
  );
}
