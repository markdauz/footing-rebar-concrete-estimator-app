export type PlasterMix = 'a' | 'b' | 'c' | 'd';

export function computePlasterVolume(
  area: number | '',
  thickness: number | '',
) {
  if (!area || !thickness) return 0;
  return area * thickness;
}

export function computePlasterCement(
  volume: number,
  thickness: number | '',
  mix: PlasterMix | number | '',
) {
  if (!thickness || !volume || !mix) return '0.00';

  const factors: Record<PlasterMix, number> = {
    a: 18,
    b: 12,
    c: 9,
    d: 7.5,
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

export function computePlasterSand(volume: number, thickness: number | '') {
  if (!thickness || !volume) return '0.00';
  return volume.toFixed(2);
}
