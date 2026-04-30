export type MixType = 'aa' | 'a' | 'b' | 'c';

export function computeBeamVolume(
  width: number | '',
  depth: number | '',
  length: number | '',
) {
  if (!width || !depth || !length) return 0;
  return width * depth * length;
}

export function computeBeamTotalVolume(volume: number, sets: number | '') {
  if (!volume || !sets) return 0;
  return volume * sets;
}

export function computeBeamCement(totalVolume: number, mix: MixType | '') {
  if (!totalVolume || !mix) return '0.00';

  const factors: Record<MixType, number> = {
    aa: 12,
    a: 9,
    b: 7.5,
    c: 6,
  };

  return (totalVolume * factors[mix]).toFixed(2);
}

export function computeBeamSand(totalVolume: number, mix: MixType | '') {
  if (!totalVolume || !mix) return '0.00';
  return (totalVolume * 0.5).toFixed(2);
}

export function computeBeamGravel(totalVolume: number, mix: MixType | '') {
  if (!totalVolume || !mix) return '0.00';
  return totalVolume.toFixed(2);
}
