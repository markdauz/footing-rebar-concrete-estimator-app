export const parse = (val: string) => {
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
};

export const getCutSizeA = (value: string) => {
  const v = parse(value);
  if (v === null) return '';
  return (v - 0.075 * 2).toFixed(2);
};

export const getCutSizeB = (value: string, diameter: string) => {
  const v = parse(value);
  const d = parse(diameter);
  if (v === null || d === null) return '';
  return (v - 0.075 * 2 + 2 * (d * 0.016)).toFixed(2);
};

export const computeOption = (cutW: string, cutL: string, input: any) => {
  const usable = (cut: string) => {
    const F = parse(cut);
    const C7 = parse(input.steelLength);
    if (F === null || C7 === null) return '';

    return C7 / F < 1
      ? Math.round((Math.trunc(F / C7 + 1) * C7) / C7)
      : Math.trunc(C7 / F);
  };

  const usableW = usable(cutW);
  const usableL = usable(cutL);

  const totalShort = (() => {
    const H = usableW;
    const F = parse(cutW);
    const C7 = parse(input.steelLength);
    const C10 = parse(input.barsL);
    const C8 = parse(input.quantity);

    if (!H || F === null || C7 === null || C10 === null || C8 === null)
      return '';

    return C7 / F < 1
      ? (C10 * Math.trunc(F / C7 + 1) * C8).toFixed(2)
      : (C8 * (C10 / H)).toFixed(2);
  })();

  const totalLong = (() => {
    const H = usableL;
    const F = parse(cutL);
    const C7 = parse(input.steelLength);
    const C9 = parse(input.barsW);
    const C8 = parse(input.quantity);

    if (!H || F === null || C7 === null || C9 === null || C8 === null)
      return '';

    return C7 / F < 1
      ? (C9 * Math.trunc(F / C7 + 1) * C8).toFixed(2)
      : (C8 * (C9 / H)).toFixed(2);
  })();

  const totalPCS = (() => {
    const F6 = parse(totalShort);
    const F7 = parse(totalLong);
    if (F6 === null || F7 === null) return '';
    return Math.round(F6 + F7 + 0.5);
  })();

  return { usableW, usableL, totalShort, totalLong, totalPCS };
};

export const getTieWire = (input: any) => {
  const C8 = parse(input.quantity);
  const C9 = parse(input.barsW);
  const C10 = parse(input.barsL);

  if (C8 === null || C9 === null || C10 === null) return '';

  return (C8 * ((C9 * C10 * 0.3) / 53) + 0.1).toFixed(2);
};

export const getVolume = (input: any) => {
  const w = parse(input.width);
  const l = parse(input.length);
  const t = parse(input.thickness);
  const q = parse(input.quantity);

  if (w === null || l === null || t === null || q === null) return '';

  return (w * l * t * q).toFixed(2);
};
