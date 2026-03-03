import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistema de Reconstrucción Académica | BioSci 3D',
  description: 'Visualización 3D académica de ADN, empaquetamiento cromosómico, biología molecular y física relativista. Proyecto educativo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
