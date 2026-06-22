export const getLatTiesDiameter = (mainBarDiameter: string): string => {
  const diameter = Number(mainBarDiameter);

  if (!mainBarDiameter) {
    return '';
  }

  return diameter <= 30 ? '10' : '12';
};

export const getPcsLatTiesOptionA = ({
  columnHeight,
  columnWidth,
  columnLength,
  numberOfColumns,
}: {
  columnHeight: string;
  columnWidth: string;
  columnLength: string;
  numberOfColumns: string;
}): string => {
  const height = Number(columnHeight);
  const width = Number(columnWidth);
  const length = Number(columnLength);
  const columns = Number(numberOfColumns);

  if (!columnHeight) {
    return '';
  }

  const maxSide = Math.max(width, length);

  const latTiesPerColumn = Math.round((height - 2.2) / 0.2 - 1 + 22);

  return String(
    maxSide - 0.08 > 0.15
      ? latTiesPerColumn * columns * 2
      : latTiesPerColumn * columns,
  );
};

export const getTieWiresOptionA = ({
  pcsLatTiesOptionA,
  numberOfBarsA,
  numberOfBarsB,
}: {
  pcsLatTiesOptionA: string;
  numberOfBarsA: string;
  numberOfBarsB: string;
}): string => {
  if (!pcsLatTiesOptionA) {
    return '';
  }

  return String(
    Number(pcsLatTiesOptionA) *
      (Number(numberOfBarsA || 0) + Number(numberOfBarsB || 0)),
  );
};

export const getPcsLatTiesOptionBOne = ({
  columnHeight,
  columnWidth,
  columnLength,
  numberOfColumns,
  mainBarDiameter,
  latTiesDiameter,
}: {
  columnHeight: string;
  columnWidth: string;
  columnLength: string;
  numberOfColumns: string;
  mainBarDiameter: string;
  latTiesDiameter: string;
}): string => {
  const height = Number(columnHeight);
  const width = Number(columnWidth);
  const length = Number(columnLength);
  const columns = Number(numberOfColumns);
  const mainBar = Number(mainBarDiameter);
  const latTies = Number(latTiesDiameter);

  if (!height || !width || !length || !columns || !mainBar || !latTies) {
    return '';
  }

  const minValue = Math.min(width, length, mainBar * 0.016, latTies * 0.048);

  if (!minValue || Number.isNaN(minValue)) {
    return '';
  }

  const maxSide = Math.max(width, length);

  const pcsPerColumn = Math.round(height / minValue + 1);

  return String(
    maxSide - 0.08 > 0.15 ? pcsPerColumn * columns * 2 : pcsPerColumn * columns,
  );
};

export const getTieWiresOptionBOne = ({
  pcsLatTiesOptionBOne,
  numberOfBarsA,
  numberOfBarsB,
}: {
  pcsLatTiesOptionBOne: string;
  numberOfBarsA: string;
  numberOfBarsB: string;
}): string => {
  if (!pcsLatTiesOptionBOne) {
    return '';
  }

  return String(
    Number(pcsLatTiesOptionBOne) *
      (Number(numberOfBarsA || 0) + Number(numberOfBarsB || 0)),
  );
};

export const getPcsLatTiesOptionBTwo = ({
  columnHeight,
  columnWidth,
  columnLength,
  numberOfColumns,
  mainBarDiameter,
  tieBarDiameter,
  latTiesDiameter,
}: {
  columnHeight: string;
  columnWidth: string;
  columnLength: string;
  numberOfColumns: string;
  mainBarDiameter: string;
  tieBarDiameter: string;
  latTiesDiameter: string;
}): string => {
  const height = Number(columnHeight);
  const width = Number(columnWidth);
  const length = Number(columnLength);
  const columns = Number(numberOfColumns);
  const mainBar = Number(mainBarDiameter);
  const tieBar = Number(tieBarDiameter);
  const latTies = Number(latTiesDiameter);

  if (
    !height ||
    !width ||
    !length ||
    !columns ||
    !mainBar ||
    !tieBar ||
    !latTies
  ) {
    return '';
  }

  const minValue = Math.min(
    width,
    length,
    mainBar * 0.016,
    tieBar * 0.016,
    latTies * 0.048,
  );

  if (!minValue || Number.isNaN(minValue)) {
    return '';
  }

  const maxSide = Math.max(width, length);

  const pcsPerColumn = Math.round(height / minValue + 1);

  return String(
    maxSide - 0.08 > 0.15 ? columns * 2 * pcsPerColumn : columns * pcsPerColumn,
  );
};

export const getTieWiresOptionBTwo = ({
  pcsLatTiesOptionBTwo,
  numberOfBarsA,
  numberOfBarsB,
}: {
  pcsLatTiesOptionBTwo: string;
  numberOfBarsA: string;
  numberOfBarsB: string;
}): string => {
  if (!pcsLatTiesOptionBTwo) {
    return '';
  }

  return String(
    Number(pcsLatTiesOptionBTwo) *
      (Number(numberOfBarsA || 0) + Number(numberOfBarsB || 0)),
  );
};
export const getRequiredSteelLength = (
  columnHeight: string,
  mainBarDiameter: string,
) => {
  const height = Number(columnHeight);
  const diameter = Number(mainBarDiameter);

  if (!height || !diameter) {
    return 0;
  }

  return height + 0.4 - 0.075 - 2 * 0.016 + 0.016 * diameter;
};
export const getWaste = (barLength: number, requiredSteelLength: number) => {
  if (!requiredSteelLength) {
    return 0;
  }

  if (barLength / requiredSteelLength < 1) {
    return (
      Math.trunc(requiredSteelLength / barLength + 1) * barLength -
      requiredSteelLength -
      0.6
    );
  }

  return (
    barLength -
    Math.trunc(barLength / requiredSteelLength) * requiredSteelLength
  );
};
export const getWasteRemark = (waste: number) => {
  if (waste > 0.6) {
    return 'X';
  }

  if (waste < 0.5) {
    return 'Best';
  }

  return 'Good';
};

export const STEEL_WEIGHT: Record<number, number> = {
  10: 0.616,
  12: 0.888,
  16: 1.579,
  20: 2.466,
  25: 3.854,
  28: 4.833,
  32: 6.313,
  36: 7.991,
  40: 9.865,
  50: 15.413,
};

export const getL24 = (
  steelLength: string,
  requiredSteelLength: number,
): number => {
  const steel = Number(steelLength);

  if (!steel || !requiredSteelLength) {
    return 0;
  }

  if (steel / requiredSteelLength < 1) {
    return Math.round(
      (Math.trunc(requiredSteelLength / steel + 1) * steel) / steel,
    );
  }

  return Math.trunc(steel / requiredSteelLength);
};

export const getL26 = ({
  numberOfBarsA,
  numberOfColumns,
  steelLength,
  requiredSteelLength,
  l24,
}: {
  numberOfBarsA: string;
  numberOfColumns: string;
  steelLength: string;
  requiredSteelLength: number;
  l24: number;
}): number => {
  const bars = Number(numberOfBarsA);
  const columns = Number(numberOfColumns);
  const steel = Number(steelLength);

  if (!bars || !columns || !steel || !requiredSteelLength || !l24) {
    return 0;
  }

  if (steel / requiredSteelLength < 1) {
    return bars * Math.trunc(requiredSteelLength / steel + 1) * columns;
  }

  return columns * (bars / l24);
};

export const getL27 = ({
  l26,
  steelLength,
  mainBarDiameter,
}: {
  l26: number;
  steelLength: string;
  mainBarDiameter: string;
}): number => {
  const steel = Number(steelLength);
  const diameter = Number(mainBarDiameter);

  const weight = STEEL_WEIGHT[diameter] || 0;

  if (!l26 || !steel || !weight) {
    return 0;
  }

  return Math.round(l26 * steel * weight + 0.25);
};

export const getKgsPerCuM = ({
  l27,
  volume,
}: {
  l27: number;
  volume: string;
}): string => {
  const vol = Number(volume);

  if (!l27 || !vol) {
    return '';
  }

  return (l27 / vol).toFixed(2);
};

export const getCutBarSize = ({
  columnHeight,
  mainBarDiameter,
  tieBarDiameter,
}: {
  columnHeight: string;
  mainBarDiameter: string;
  tieBarDiameter: string;
}): string => {
  const height = Number(columnHeight);
  const mainBar = Number(mainBarDiameter);
  const tieBar = Number(tieBarDiameter);

  if (!height || !tieBar) {
    return '';
  }

  const maxDiameter = Math.max(mainBar, tieBar);

  return (height + 0.4 - 0.075 - 2 * 0.016 + 0.016 * maxDiameter).toFixed(3);
};

export const getTotalCutBars = (numberOfBarsB: string): string => {
  if (!numberOfBarsB) {
    return '';
  }

  return numberOfBarsB;
};

export const getTotalCutBarsUsable = ({
  steelLength,
  cutBarSize,
}: {
  steelLength: string;
  cutBarSize: string;
}): string => {
  const steel = Number(steelLength);
  const cutBar = Number(cutBarSize);

  if (!steel || !cutBar) {
    return '';
  }

  if (steel / cutBar < 1) {
    return String(Math.round((Math.trunc(cutBar / steel + 1) * steel) / steel));
  }

  return String(Math.trunc(steel / cutBar));
};

export const getTotalPcsOfBars = ({
  steelLength,
  numberOfColumns,
  totalCutBars,
  totalCutBarsUsable,
  cutBarSize,
}: {
  steelLength: string;
  numberOfColumns: string;
  totalCutBars: string;
  totalCutBarsUsable: string;
  cutBarSize: string;
}): string => {
  const steel = Number(steelLength);
  const columns = Number(numberOfColumns);
  const totalBars = Number(totalCutBars);
  const usableBars = Number(totalCutBarsUsable);
  const cutBar = Number(cutBarSize);

  if (!totalBars || !usableBars || !steel || !columns || !cutBar) {
    return '';
  }

  if (steel / cutBar < 1) {
    return String(totalBars * Math.trunc(cutBar / steel + 1) * columns);
  }

  return String(columns * (totalBars / usableBars));
};

export const getSteelWeightTotalKgs = ({
  tieBarDiameter,
  steelLength,
  totalPcsOfBars,
}: {
  tieBarDiameter: string;
  steelLength: string;
  totalPcsOfBars: string;
}): string => {
  const diameter = Number(tieBarDiameter);
  const steel = Number(steelLength);
  const totalPcs = Number(totalPcsOfBars);

  const weight = STEEL_WEIGHT[diameter] || 0;

  if (!diameter || !steel || !totalPcs || !weight) {
    return '';
  }

  return String(Math.round(totalPcs * steel * weight + 0.25));
};
export const getTiesSteelLength = ({
  columnWidth,
  columnLength,
  latTiesDiameter,
}: {
  columnWidth: string;
  columnLength: string;
  latTiesDiameter: string;
}): string => {
  const width = Number(columnWidth);
  const length = Number(columnLength);
  const latTies = Number(latTiesDiameter);

  if (!width || !length || !latTies) {
    return '';
  }

  return (2 * (width + length - 0.16) + 0.15 - 0.006 * latTies).toFixed(2);
};
export const getLateralWaste = ({
  barLength,
  requiredLength,
}: {
  barLength: number;
  requiredLength: string;
}): string => {
  const required = Number(requiredLength);

  if (!required) {
    return '';
  }

  let waste = 0;

  if (barLength / required < 1) {
    waste = Math.trunc(required / barLength + 1) * barLength - required - 0.6;
  } else {
    waste = barLength - Math.trunc(barLength / required) * required;
  }

  return waste.toFixed(2);
};

export const getLateralWasteRemark = (waste: string): string => {
  const value = Number(waste);

  if (!waste || Number.isNaN(value)) {
    return '';
  }

  if (value > 0.6) {
    return 'X';
  }

  if (value < 0.5) {
    return 'BEST';
  }

  return 'GOOD';
};

export const getLateralWireKgsPerCuM = (
  tieWiresOptionA: string,
  volume: string,
): string => {
  const tieWires = Number(tieWiresOptionA);
  const vol = Number(volume);

  if (!tieWires || !vol) {
    return '';
  }

  const wireWeight = Math.round(((tieWires * 0.3) / 53 + 0.1) * 100) / 100;

  return (wireWeight / vol).toFixed(2);
};

export const getTiesCut = ({
  columnWidth,
  columnLength,
  latTiesDiameter,
}: {
  columnWidth: string;
  columnLength: string;
  latTiesDiameter: string;
}): string => {
  const width = Number(columnWidth);
  const length = Number(columnLength);
  const latTies = Number(latTiesDiameter);

  if (!width || !length || !latTies) {
    return '';
  }

  return (2 * (width + length - 0.16) + 0.15 - 0.006 * latTies).toFixed(2);
};
export const getGIWireKgs = (tieWiresOptionA: string): string => {
  const tieWires = Number(tieWiresOptionA);

  if (!tieWires) {
    return '';
  }

  return (Math.round(((tieWires * 0.3) / 53 + 0.1) * 100) / 100).toFixed(2);
};
export const getTotalPcsOfBarsOptionA = ({
  mainBarDiameter,
  columnWidth,
  columnLength,
  columnHeight,
  numberOfColumns,
  steelLength,
}: {
  mainBarDiameter: string;
  columnWidth: string;
  columnLength: string;
  columnHeight: string;
  numberOfColumns: string;
  steelLength: string;
}): string => {
  const mainBar = Number(mainBarDiameter);
  const width = Number(columnWidth);
  const length = Number(columnLength);
  const height = Number(columnHeight);
  const columns = Number(numberOfColumns);
  const steel = Number(steelLength);

  if (!mainBar || !width || !length || !height || !columns || !steel) {
    return '';
  }

  const c33 = mainBar <= 30 ? 10 : 12;

  const k32 = 2 * (width + length - 0.16) + 0.15 - 0.006 * c33;

  const tiesPerColumn = Math.round((height - 2.2) / 0.2 - 1 + 22);

  const c35 =
    Math.max(width, length) - 0.08 > 0.15
      ? tiesPerColumn * columns * 2
      : tiesPerColumn * columns;

  return String(Math.round(c35 / (steel / k32) + 0.25));
};

export const getBarPcsOptionA = ({
  latTiesDiameter,
  tiesSteelLength,
  totalPcsOfBars,
}: {
  latTiesDiameter: string;
  tiesSteelLength: string;
  totalPcsOfBars: string;
}): string => {
  const diameter = Number(latTiesDiameter);
  const tiesLength = Number(tiesSteelLength);
  const totalBars = Number(totalPcsOfBars);

  if (!diameter || !tiesLength || !totalBars) {
    return '';
  }

  const weightPerMeter = diameter === 10 ? 0.616 : 0.888;

  return String((tiesLength * totalBars * weightPerMeter).toFixed(3));
};

export const getLateralWasteOptionB = ({
  barLength,
  tiesCutSize,
}: {
  barLength: number;
  tiesCutSize: string;
}): string => {
  const s32 = Number(tiesCutSize);

  if (!s32) {
    return '';
  }

  let waste = 0;

  if (barLength / s32 < 1) {
    waste = Math.trunc(s32 / barLength + 1) * barLength - s32 - 0.6;
  } else {
    waste = barLength - Math.trunc(barLength / s32) * s32;
  }

  return waste.toFixed(2);
};

export const getTiesCutSize = ({
  columnWidth,
  columnLength,
  latTiesDiameter,
}: {
  columnWidth: string;
  columnLength: string;
  latTiesDiameter: string;
}): string => {
  const width = Number(columnWidth);
  const length = Number(columnLength);
  const diameter = Number(latTiesDiameter);

  if (!width || !length || !diameter) {
    return '';
  }

  return (2 * (width + length - 0.16) + 0.15 - 0.006 * diameter).toFixed(2);
};

export const getLatTiesCutSize = ({
  columnWidth,
  columnLength,
  latTiesDiameter,
}: {
  columnWidth: string;
  columnLength: string;
  latTiesDiameter: string;
}): string => {
  const width = Number(columnWidth);
  const length = Number(columnLength);
  const diameter = Number(latTiesDiameter);

  if (!width || !length || !diameter) {
    return '';
  }

  return (2 * (width + length - 0.16) + 0.15 - 0.006 * diameter).toFixed(2);
};

export const getTieWiresOptionB = ({
  pcsLatTiesOptionBOne,
  numberOfBarsA,
  numberOfBarsB,
}: {
  pcsLatTiesOptionBOne: string;
  numberOfBarsA: string;
  numberOfBarsB: string;
}): string => {
  const pcs = Number(pcsLatTiesOptionBOne);
  const barsA = Number(numberOfBarsA);
  const barsB = Number(numberOfBarsB);

  if (!pcs) {
    return '';
  }

  return String(pcs * (barsA + barsB));
};
export const getGIWireKgsOptionB = (tieWires: string): string => {
  const wires = Number(tieWires);

  if (!wires) {
    return '';
  }

  return (Math.round(((wires * 0.3) / 53 + 0.1) * 100) / 100).toFixed(2);
};

export const getTotalPcsOfBarsOptionB = ({
  tiesSteelLength,
  pcsLatTiesOptionBOne,
  latTiesCutSize,
}: {
  tiesSteelLength: string;
  pcsLatTiesOptionBOne: string;
  latTiesCutSize: string;
}): string => {
  const steel = Number(tiesSteelLength);
  const pcs = Number(pcsLatTiesOptionBOne);
  const cutSize = Number(latTiesCutSize);

  if (!steel || !pcs || !cutSize) {
    return '';
  }

  return String(Math.round(pcs / (steel / cutSize) + 0.25));
};

export const getBarPcsOptionB = ({
  latTiesDiameter,
  tiesSteelLength,
  totalPcsOfBarsOptionB,
}: {
  latTiesDiameter: string;
  tiesSteelLength: string;
  totalPcsOfBarsOptionB: string;
}): string => {
  const diameter = Number(latTiesDiameter);
  const steelLength = Number(tiesSteelLength);
  const totalPcs = Number(totalPcsOfBarsOptionB);

  if (!diameter || !steelLength || !totalPcs) {
    return '';
  }

  const weightPerMeter = diameter === 10 ? 0.616 : 0.888;

  return (steelLength * totalPcs * weightPerMeter).toFixed(2);
};

export const getKgsPerCuMOptionB = ({
  giWireKgsOptionB,
  volume,
}: {
  giWireKgsOptionB: string;
  volume: string;
}): string => {
  const kgs = Number(giWireKgsOptionB);
  const vol = Number(volume);

  if (!kgs || !vol) {
    return '';
  }

  return (kgs / vol).toFixed(2);
};
