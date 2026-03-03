'use client';
interface TabPanelProps {
  children: React.ReactNode;
  className?: string;
}

export default function TabPanel({ children, className = '' }: TabPanelProps) {
  return (
    <div className={`text-xs text-gray-300 ${className}`}>
      {children}
    </div>
  );
}
