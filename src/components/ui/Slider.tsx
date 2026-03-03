'use client';
interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  unit?: string;
}

export default function Slider({ label, value, min, max, step = 1, onChange, unit }: SliderProps) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-300 font-mono">{value}{unit || ''}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-blue-500 cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}
