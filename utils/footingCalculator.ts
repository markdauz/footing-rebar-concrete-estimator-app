export type MixType = 'aa' | 'a' | 'b' | 'c';

export function computeFootingVolume(
  width: number | '',
  length: number | '',
  thickness: number | '',
) {
  if (!width || !length || !thickness) return 0;
  return width * length * thickness;
}

export function computeFootingTotalVolume(volume: number, sets: number | '') {
  if (!volume || !sets) return 0;
  return volume * sets;
}

export function computeFootingCement(totalVolume: number, mix: MixType | '') {
  if (!totalVolume || !mix) return '0.00';

  const factors: Record<MixType, number> = {
    aa: 12,
    a: 9,
    b: 7.5,
    c: 6,
  };

  return (totalVolume * factors[mix]).toFixed(2);
}

export function computeFootingSand(totalVolume: number, mix: MixType | '') {
  if (!totalVolume || !mix) return '0.00';
  return (totalVolume * 0.5).toFixed(2);
}

export function computeFootingGravel(totalVolume: number, mix: MixType | '') {
  if (!totalVolume || !mix) return '0.00';
  return totalVolume.toFixed(2);
}
