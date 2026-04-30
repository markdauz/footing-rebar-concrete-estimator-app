export type MixType = 'aa' | 'a' | 'b' | 'c';

export function computeVolume(area: number | '', thickness: number | '') {
  if (!area || !thickness) return 0;
  return area * thickness;
}

export function computeCement(volume: number, mix: MixType | '') {
  if (!volume || !mix) return '0.00';

  const map: Record<MixType, number> = {
    aa: 12,
    a: 9,
    b: 7.5,
    c: 6,
  };

  return (volume * map[mix]).toFixed(2);
}

export function computeSand(volume: number, mix: MixType | '') {
  if (!volume || !mix) return '0.00';
  return (volume * 0.5).toFixed(2);
}

export function computeGravel(volume: number, mix: MixType | '') {
  if (!volume || !mix) return '0.00';
  return (volume * 1).toFixed(2);
}
