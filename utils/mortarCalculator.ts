export type MixType = 'a' | 'b' | 'c' | 'd' | 'custom';

export const getVolume = (
  thickness: number | 'custom' | '',
  customThickness: number | '',
) => {
  if (!thickness) return 0;

  const volumeMap: Record<number, number> = {
    0.1: 0.0435,
    0.125: 0.0638,
    0.15: 0.084,
    0.2: 0.1135,
    0.25: 0.1298,
  };

  if (thickness === 'custom') {
    return Number(customThickness || 0);
  }

  return volumeMap[thickness] || 0;
};

export const getTotalPcs = (area: number | '') => {
  if (!area) return 0;
  return Math.round(Number(area) * 13);
};

// ✅ Cement
export const getCement = (
  volume: number,
  area: number | '',
  mix: MixType | '',
  customMix: number | '',
) => {
  if (!volume || !area || !mix) return 0;

  const factors: Record<string, number> = {
    a: 18,
    b: 12,
    c: 9,
    d: 7.5,
  };

  const factor = mix === 'custom' ? Number(customMix || 0) : factors[mix];

  return volume * Number(area) * factor;
};

export const getSand = (volume: number, area: number | '') => {
  if (!volume || !area) return 0;
  return volume * Number(area);
};
