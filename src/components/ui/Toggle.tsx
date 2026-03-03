'use client';
interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export default function Toggle({ label, onChange, value }: ToggleProps) {
  return (
    <label className="flex items-center gap-2 mb-2 cursor-pointer">
      <div className="relative inline-block w-8 h-4">
        <input
          type="checkbox"
          checked={value}
          onChange={e => onChange(e.target.checked)}
          className="sr-only"
          aria-label={label}
        />
        <div className={`w-8 h-4 rounded-full transition-colors ${value ? 'bg-blue-500' : 'bg-gray-700'}`} />
        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </div>
      <span className="text-gray-300 text-xs">{label}</span>
    </label>
  );
}
