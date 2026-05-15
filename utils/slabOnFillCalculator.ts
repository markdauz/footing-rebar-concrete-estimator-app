export function computeSlabVolume(
  width: number,
  length: number,
  thickness: number,
  sets: number,
) {
  return width * length * thickness * sets;
}

export function computeMainCutBarPcs(length: number, spacingLength: number) {
  return Math.round(length / spacingLength + 1);
}

export function computeTempCutBarPcs(width: number, spacingWidth: number) {
  return Math.round(width / spacingWidth + 1);
}

export function computeMainCutSize(width: number, mainBar: number) {
  return Number((width + 2 * (0.009 * mainBar)).toFixed(2));
}

export function computeTempCutSize(length: number, tempBar: number) {
  return Number((length + 2 * (0.009 * tempBar)).toFixed(2));
}

export function computeWastage(steelLength: number, cutSize: number) {
  // return Math.round(steelLength - Math.trunc(steelLength / cutSize) * cutSize);
  return Number(
    (steelLength - Math.trunc(steelLength / cutSize) * cutSize).toFixed(2),
  );
}

export const STEEL_WEIGHT = {
  10: 0.616,
  12: 0.888,
  16: 1.579,
  20: 2.466,
};

export function computeSteelKg(
  totalBars: number,
  steelLength: number,
  barDiameter: number,
) {
  const weight = STEEL_WEIGHT[barDiameter as keyof typeof STEEL_WEIGHT];

  if (!weight) {
    return 0;
  }

  const result = totalBars * steelLength * weight;

  return Math.round(result);
}

export function computeGIWire(
  mainCutBarPcs: number,
  tempCutBarPcs: number,
  sets: number,
) {
  return Number(
    (sets * ((mainCutBarPcs * tempCutBarPcs * 0.3) / 53 + 0.1)).toFixed(1),
  );
}

export function computePolyethyleneSheet(
  sets: number,
  width: number,
  length: number,
) {
  return sets * width * length;
}

export function computeComputedKgs(steelKgsCum: number, volume: number) {
  return Math.round(steelKgsCum * volume);
}

export function computeTieWire(computedKgs: number) {
  return Math.round((computedKgs / 2900) * 45 + 0.5);
}

export function computePCS(
  computedKgs: number,
  barDiameter: number,
  steelLength: number,
) {
  const weight = STEEL_WEIGHT[barDiameter as keyof typeof STEEL_WEIGHT];

  if (!weight) {
    return 0;
  }

  return Math.round(computedKgs / weight / steelLength + 1);
}

export function computeTotalBars(
  cutBarPcs: number,
  sets: number,
  cutSize: number,
  steelLength: number,
  bothExceeded: boolean,
) {
  const usableBars = Math.floor(steelLength / cutSize);

  if (usableBars <= 0 && bothExceeded) {
    return cutBarPcs * sets * 2;
  }

  if (usableBars <= 0) {
    return Math.ceil((cutBarPcs * sets) / 2);
  }

  return Math.ceil((cutBarPcs * sets) / usableBars);
}
