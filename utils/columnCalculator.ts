export type MixType = 'aa' | 'a' | 'b' | 'c';

export function computeColumnVolume(
  width: number | '',
  depth: number | '',
  height: number | '',
) {
  if (!width || !depth || !height) return 0;
  return width * depth * height;
}

export function computeColumnTotalVolume(volume: number, sets: number | '') {
  if (!volume || !sets) return 0;
  return volume * sets;
}

export function computeColumnCement(totalVolume: number, mix: MixType | '') {
  if (!totalVolume || !mix) return '0.00';

  const factors: Record<MixType, number> = {
    aa: 12,
    a: 9,
    b: 7.5,
    c: 6,
  };

  return (totalVolume * factors[mix]).toFixed(2);
}

export function computeColumnSand(totalVolume: number, mix: MixType | '') {
  if (!totalVolume || !mix) return '0.00';
  return (totalVolume * 0.5).toFixed(2);
}

export function computeColumnGravel(totalVolume: number, mix: MixType | '') {
  if (!totalVolume || !mix) return '0.00';
  return totalVolume.toFixed(2);
}
