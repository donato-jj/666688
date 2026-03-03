export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function helixPosition(
  index: number,
  total: number,
  radius: number,
  pitch: number,
  turns: number = 2
): [number, number, number] {
  const t = (index / total) * turns * Math.PI * 2;
  const y = (index / total) * pitch * turns - (pitch * turns) / 2;
  return [Math.cos(t) * radius, y, Math.sin(t) * radius];
}

export function helixPosition2(
  index: number,
  total: number,
  radius: number,
  pitch: number,
  turns: number = 2,
  offset: number = Math.PI
): [number, number, number] {
  const t = (index / total) * turns * Math.PI * 2 + offset;
  const y = (index / total) * pitch * turns - (pitch * turns) / 2;
  return [Math.cos(t) * radius, y, Math.sin(t) * radius];
}
