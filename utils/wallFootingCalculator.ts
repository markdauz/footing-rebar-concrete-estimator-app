export type MixType = 'aa' | 'a' | 'b' | 'c';
export type MixInput = MixType | number | '';

function resolveFactor(mix: MixInput): number | null {
  const factors: Record<MixType, number> = {
    aa: 12,
    a: 9,
    b: 7.5,
    c: 6,
  };

  if (typeof mix === 'number') return mix;
  if (!mix) return null;

  return factors[mix] ?? null;
}

export function computeWallFootingVolume(
  width: number | '',
  length: number | '',
  thickness: number | '',
) {
  if (width === '' || length === '' || thickness === '') return 0;
  return width * length * thickness;
}

export function computeWallFootingCement(volume: number, mix: MixInput) {
  if (!volume) return '0.00';

  const factor = resolveFactor(mix);
  if (!factor) return '0.00';

  return (volume * factor).toFixed(2);
}

export function computeWallFootingSand(volume: number, mix: MixInput) {
  if (!volume) return '0.00';

  const factor = resolveFactor(mix);
  if (!factor) return '0.00';

  // keep same proportion logic (adjust if needed)
  return (volume * 0.5).toFixed(2);
}

export function computeWallFootingGravel(volume: number, mix: MixInput) {
  if (!volume) return '0.00';

  const factor = resolveFactor(mix);
  if (!factor) return '0.00';

  return volume.toFixed(2);
}
