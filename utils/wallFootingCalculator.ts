export type MixType = 'aa' | 'a' | 'b' | 'c';

export function computeWallFootingVolume(
  width: number | '',
  length: number | '',
  thickness: number | '',
) {
  if (!width || !length || !thickness) return 0;
  return width * length * thickness;
}

export function computeWallFootingCement(
  volume: number,
  mix: MixType | number | '',
) {
  if (!volume || !mix) return '0.00';

  const factors: Record<MixType, number> = {
    aa: 12,
    a: 9,
    b: 7.5,
    c: 6,
  };

  let factor: number;

  if (typeof mix === 'number') {
    factor = mix;
  } else {
    factor = factors[mix];
  }

  if (!factor) return '0.00';

  return (volume * factor).toFixed(2);
}

export function computeWallFootingSand(volume: number, mix: MixType | '') {
  if (!volume || !mix) return '0.00';
  return (volume * 0.5).toFixed(2);
}

export function computeWallFootingGravel(volume: number, mix: MixType | '') {
  if (!volume || !mix) return '0.00';
  return volume.toFixed(2);
}
