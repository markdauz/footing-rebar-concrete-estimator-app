type Params = {
  width: string;
  length: string;
  slabThickness: string;
  sets: string;

  spacingWidth: string;
  spacingLength: string;

  mainBars: string;
  tempBars: string;

  steelLength: string;

  slabThicknessMode: string | null;
  spacingWidthMode: string | null;
  spacingLengthMode: string | null;

  mainBarsMode: string | null;
  tempBarsMode: string | null;

  steelLengthMode: string | null;
};

export function getSuspendedSlabComputations({
  width,
  length,
  slabThickness,
  sets,

  spacingWidth,
  spacingLength,

  mainBars,
  tempBars,

  steelLength,

  slabThicknessMode,
  spacingWidthMode,
  spacingLengthMode,

  mainBarsMode,
  tempBarsMode,

  steelLengthMode,
}: Params) {
  const widthValue = parseFloat(width || '0');

  const lengthValue = parseFloat(length || '0');

  const effectiveThickness =
    slabThicknessMode === 'custom'
      ? parseFloat(slabThickness || '0')
      : slabThicknessMode
        ? parseFloat(slabThicknessMode)
        : 0;

  const setsValue = parseFloat(sets || '0');

  const spacingWidthValue =
    spacingWidthMode === 'custom'
      ? parseFloat(spacingWidth || '0')
      : parseFloat(spacingWidthMode || '0');

  const spacingLengthValue =
    spacingLengthMode === 'custom'
      ? parseFloat(spacingLength || '0')
      : parseFloat(spacingLengthMode || '0');

  const mainBarsValue =
    mainBarsMode === 'custom'
      ? parseFloat(mainBars || '0')
      : parseFloat(mainBarsMode || '0');

  const tempBarsValue =
    tempBarsMode === 'custom'
      ? parseFloat(tempBars || '0')
      : parseFloat(tempBarsMode || '0');

  const steelLengthValue =
    steelLengthMode === 'custom'
      ? parseFloat(steelLength || '0')
      : parseFloat(steelLengthMode || '0');

  const volume =
    !widthValue || !lengthValue || !effectiveThickness || !setsValue
      ? 0
      : widthValue * lengthValue * effectiveThickness * setsValue;

  const generalMRatio =
    !widthValue || !lengthValue
      ? 0
      : Number((widthValue / lengthValue).toFixed(2));

  const w4TempBars = widthValue > 0 ? (widthValue / 4).toFixed(2) : '0.00';

  const l4TempBars = lengthValue > 0 ? (lengthValue / 4).toFixed(2) : '0.00';

  const w3ExtraBars = widthValue > 0 ? (widthValue / 3).toFixed(2) : '0.00';

  const l3ExtraBars = lengthValue > 0 ? (lengthValue / 3).toFixed(2) : '0.00';

  const l2BentBarsToW = lengthValue > 0 ? (lengthValue / 2).toFixed(2) : '0.00';

  const l2BentBarsToL = widthValue > 0 ? (widthValue / 2).toFixed(2) : '0.00';

  const oneWay =
    !widthValue || !lengthValue
      ? ''
      : lengthValue / widthValue >= 2
        ? 'one way'
        : 'two way';

  const l2BentBarsToLValue = lengthValue > 0 ? lengthValue / 2 : 0;

  const l2BentBarsToWValue = widthValue > 0 ? widthValue / 2 : 0;

  // =====================================
  // BENT BARS
  // =====================================

  const bentBarsAlongShortSpanCutBarPcs =
    !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? Math.round((lengthValue / spacingLengthValue + 1) / 2)
        : Math.round(l2BentBarsToLValue / spacingLengthValue + 1);

  const bentBarsAlongShortSpanCutSize =
    !oneWay || !widthValue || !mainBarsValue
      ? ''
      : Number(
          (
            widthValue +
            2 * 16 * (mainBarsValue / 1000) +
            2 * (0.42 * (effectiveThickness - 0.04 - mainBarsValue / 1000))
          ).toFixed(2),
        );

  const bentBarsAlongShortSpanWastageBar =
    !steelLengthValue || !bentBarsAlongShortSpanCutSize
      ? ''
      : steelLengthValue / bentBarsAlongShortSpanCutSize < 1
        ? Number(
            (
              Math.trunc(bentBarsAlongShortSpanCutSize / steelLengthValue + 1) *
                steelLengthValue -
              bentBarsAlongShortSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / bentBarsAlongShortSpanCutSize) *
                bentBarsAlongShortSpanCutSize
            ).toFixed(2),
          );

  const bentBarsAlongLongSpanCutBarPcs = isNaN(
    l2BentBarsToWValue / spacingWidthValue,
  )
    ? ''
    : !oneWay || !spacingWidthValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Math.round(l2BentBarsToWValue / spacingWidthValue + 1);

  const bentBarsAlongLongSpanCutSize =
    !oneWay || !lengthValue || !mainBarsValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Number(
            (
              lengthValue +
              2 * 16 * (mainBarsValue / 1000) +
              2 * (0.42 * (effectiveThickness - 0.04 - mainBarsValue / 1000))
            ).toFixed(2),
          );

  const bentBarsAlongLongSpanWastageBar =
    !steelLengthValue || !bentBarsAlongLongSpanCutSize
      ? ''
      : steelLengthValue / bentBarsAlongLongSpanCutSize < 1
        ? Number(
            (
              Math.trunc(bentBarsAlongLongSpanCutSize / steelLengthValue + 1) *
                steelLengthValue -
              bentBarsAlongLongSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / bentBarsAlongLongSpanCutSize) *
                bentBarsAlongLongSpanCutSize
            ).toFixed(2),
          );

  const straightBottomBarsShortSpanCutBarPcs =
    !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? Math.round((lengthValue / spacingLengthValue + 1) / 2)
        : Math.round(lengthValue / spacingLengthValue + 1);

  const straightBottomBarsShortSpanCutSize =
    !oneWay || !widthValue || !mainBarsValue
      ? ''
      : Number((widthValue + 2 * 16 * (mainBarsValue / 1000)).toFixed(2));

  const straightBottomBarsShortSpanWastageBar =
    !steelLengthValue || !straightBottomBarsShortSpanCutSize
      ? ''
      : steelLengthValue / straightBottomBarsShortSpanCutSize < 1
        ? Number(
            (
              Math.trunc(
                straightBottomBarsShortSpanCutSize / steelLengthValue + 1,
              ) *
                steelLengthValue -
              straightBottomBarsShortSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(
                steelLengthValue / straightBottomBarsShortSpanCutSize,
              ) *
                straightBottomBarsShortSpanCutSize
            ).toFixed(2),
          );

  const straightBottomBarsLongSpanCutBarPcs = isNaN(
    widthValue / spacingWidthValue,
  )
    ? ''
    : !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Math.round(widthValue / spacingWidthValue + 1);

  const straightBottomBarsLongSpanCutSize =
    !oneWay || !lengthValue || !mainBarsValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Number((lengthValue + 2 * 16 * (mainBarsValue / 1000)).toFixed(2));

  const straightBottomBarsLongSpanWastageBar =
    !steelLengthValue || !straightBottomBarsLongSpanCutSize
      ? ''
      : steelLengthValue / straightBottomBarsLongSpanCutSize < 1
        ? Number(
            (
              Math.trunc(
                straightBottomBarsLongSpanCutSize / steelLengthValue + 1,
              ) *
                steelLengthValue -
              straightBottomBarsLongSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / straightBottomBarsLongSpanCutSize) *
                straightBottomBarsLongSpanCutSize
            ).toFixed(2),
          );
  const topCutBarsAlongShortSpanCutBarPcs =
    !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? Math.round(lengthValue / spacingLengthValue + 1)
        : Math.round(l2BentBarsToLValue / spacingLengthValue + 1 - 1) * 2;

  const topCutBarsAlongShortSpanCutSize =
    !oneWay || !w3ExtraBars || !mainBarsValue
      ? ''
      : Number(
          (parseFloat(w3ExtraBars) + 16 * (mainBarsValue / 1000)).toFixed(2),
        );

  const topCutBarsAlongShortSpanWastageBar =
    !steelLengthValue || !topCutBarsAlongShortSpanCutSize
      ? ''
      : steelLengthValue / topCutBarsAlongShortSpanCutSize < 1
        ? Number(
            (
              Math.trunc(
                topCutBarsAlongShortSpanCutSize / steelLengthValue + 1,
              ) *
                steelLengthValue -
              topCutBarsAlongShortSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / topCutBarsAlongShortSpanCutSize) *
                topCutBarsAlongShortSpanCutSize
            ).toFixed(2),
          );

  const topCutBarsAlongLongSpanCutBarPcs = isNaN(
    l2BentBarsToWValue / spacingWidthValue,
  )
    ? ''
    : !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Math.round((l2BentBarsToWValue / spacingWidthValue + 1 - 1) * 2);

  const topCutBarsAlongLongSpanCutSize =
    !oneWay || !lengthValue || !mainBarsValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Number(
            (parseFloat(l3ExtraBars) + 16 * (mainBarsValue / 1000)).toFixed(2),
          );

  const topCutBarsAlongLongSpanWastageBar =
    !steelLengthValue || !topCutBarsAlongLongSpanCutSize
      ? ''
      : steelLengthValue / topCutBarsAlongLongSpanCutSize < 1
        ? Number(
            (
              Math.trunc(
                topCutBarsAlongLongSpanCutSize / steelLengthValue + 1,
              ) *
                steelLengthValue -
              topCutBarsAlongLongSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / topCutBarsAlongLongSpanCutSize) *
                topCutBarsAlongLongSpanCutSize
            ).toFixed(2),
          );

  const tempBarsAlongShortSpanCutBarPcs =
    !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Math.round(parseFloat(l4TempBars) / spacingLengthValue + 1) * 2;

  const tempBarsAlongShortSpanCutSize =
    !oneWay || !tempBarsValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Number((widthValue + 2 * 16 * (tempBarsValue / 1000)).toFixed(2));

  const tempBarsAlongShortSpanWastageBar =
    !steelLengthValue || !tempBarsAlongShortSpanCutSize
      ? ''
      : steelLengthValue / tempBarsAlongShortSpanCutSize < 1
        ? Number(
            (
              Math.trunc(tempBarsAlongShortSpanCutSize / steelLengthValue + 1) *
                steelLengthValue -
              tempBarsAlongShortSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / tempBarsAlongShortSpanCutSize) *
                tempBarsAlongShortSpanCutSize
            ).toFixed(2),
          );

  const tempBarsAlongLongSpanCutBarPcs = isNaN(widthValue / spacingWidthValue)
    ? ''
    : !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? Math.round(widthValue / spacingWidthValue + 1) +
          Math.round(parseFloat(w4TempBars) / spacingWidthValue + 1) * 2
        : Math.round(parseFloat(w4TempBars) / spacingWidthValue + 1) * 2;

  const tempBarsAlongLongSpanCutSize =
    !oneWay || !tempBarsValue
      ? ''
      : Number((lengthValue + 2 * 16 * (tempBarsValue / 1000)).toFixed(2));

  const tempBarsAlongLongSpanWastageBar =
    !steelLengthValue || !tempBarsAlongLongSpanCutSize
      ? ''
      : steelLengthValue / tempBarsAlongLongSpanCutSize < 1
        ? Number(
            (
              Math.trunc(tempBarsAlongLongSpanCutSize / steelLengthValue + 1) *
                steelLengthValue -
              tempBarsAlongLongSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / tempBarsAlongLongSpanCutSize) *
                tempBarsAlongLongSpanCutSize
            ).toFixed(2),
          );

  const slabType =
    !widthValue || !lengthValue
      ? ''
      : lengthValue / widthValue >= 2
        ? 'one way'
        : 'two way';

  const bentBarsAlongShortSpanPcsFromLengthBars =
    !bentBarsAlongShortSpanCutSize || !steelLengthValue
      ? ''
      : steelLengthValue / bentBarsAlongShortSpanCutSize < 1
        ? Math.round(
            (Math.trunc(bentBarsAlongShortSpanCutSize / steelLengthValue + 1) *
              steelLengthValue) /
              steelLengthValue,
          )
        : Math.trunc(steelLengthValue / bentBarsAlongShortSpanCutSize);

  const bentBarsAlongShortSpanRemarks =
    !steelLengthValue || !bentBarsAlongShortSpanCutSize
      ? ''
      : steelLengthValue / bentBarsAlongShortSpanCutSize < 1
        ? '> than length'
        : 'ok';

  const bentBarsAlongShortSpanTotalPcsSteelBar =
    !spacingWidthValue ||
    !spacingLengthValue ||
    !bentBarsAlongShortSpanPcsFromLengthBars
      ? ''
      : steelLengthValue / Number(bentBarsAlongShortSpanCutSize) < 1
        ? Number(bentBarsAlongShortSpanCutBarPcs) *
          Math.trunc(
            Number(bentBarsAlongShortSpanCutSize) / steelLengthValue + 1,
          ) *
          setsValue
        : setsValue *
          (Number(bentBarsAlongShortSpanCutBarPcs) /
            Number(bentBarsAlongShortSpanPcsFromLengthBars));
  const bentBarsAlongShortSpan6m = !bentBarsAlongShortSpanCutSize
    ? ''
    : 6 / Number(bentBarsAlongShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongShortSpanCutSize) / 6 + 1) * 6 -
            Number(bentBarsAlongShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            6 -
            Math.trunc(6 / Number(bentBarsAlongShortSpanCutSize)) *
              Number(bentBarsAlongShortSpanCutSize)
          ).toFixed(2),
        );
  const bentBarsAlongShortSpan75m = !bentBarsAlongShortSpanCutSize
    ? ''
    : 7.5 / Number(bentBarsAlongShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongShortSpanCutSize) / 7.5 + 1) * 7.5 -
            Number(bentBarsAlongShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            7.5 -
            Math.trunc(7.5 / Number(bentBarsAlongShortSpanCutSize)) *
              Number(bentBarsAlongShortSpanCutSize)
          ).toFixed(2),
        );

  const bentBarsAlongShortSpan9m = !bentBarsAlongShortSpanCutSize
    ? ''
    : 9 / Number(bentBarsAlongShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongShortSpanCutSize) / 9 + 1) * 9 -
            Number(bentBarsAlongShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            9 -
            Math.trunc(9 / Number(bentBarsAlongShortSpanCutSize)) *
              Number(bentBarsAlongShortSpanCutSize)
          ).toFixed(2),
        );

  const bentBarsAlongShortSpan105m = !bentBarsAlongShortSpanCutSize
    ? ''
    : 10.5 / Number(bentBarsAlongShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongShortSpanCutSize) / 10.5 + 1) *
              10.5 -
            Number(bentBarsAlongShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            10.5 -
            Math.trunc(10.5 / Number(bentBarsAlongShortSpanCutSize)) *
              Number(bentBarsAlongShortSpanCutSize)
          ).toFixed(2),
        );

  const bentBarsAlongShortSpan12m = !bentBarsAlongShortSpanCutSize
    ? ''
    : 12 / Number(bentBarsAlongShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongShortSpanCutSize) / 12 + 1) * 12 -
            Number(bentBarsAlongShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            12 -
            Math.trunc(12 / Number(bentBarsAlongShortSpanCutSize)) *
              Number(bentBarsAlongShortSpanCutSize)
          ).toFixed(2),
        );

  const bentBarsAlongShortSpanMinimumWastage = Math.min(
    Number(bentBarsAlongShortSpan6m || 0),
    Number(bentBarsAlongShortSpan75m || 0),
    Number(bentBarsAlongShortSpan9m || 0),
    Number(bentBarsAlongShortSpan105m || 0),
    Number(bentBarsAlongShortSpan12m || 0),
  );

  const bentBarsAlongLongSpanPcsFromLengthBars =
    !bentBarsAlongLongSpanCutSize || !steelLengthValue
      ? ''
      : steelLengthValue / Number(bentBarsAlongLongSpanCutSize) < 1
        ? Math.round(
            (Math.trunc(
              Number(bentBarsAlongLongSpanCutSize) / steelLengthValue + 1,
            ) *
              steelLengthValue) /
              steelLengthValue,
          )
        : Math.trunc(steelLengthValue / Number(bentBarsAlongLongSpanCutSize));

  const bentBarsAlongLongSpanRemarks =
    !steelLengthValue || !bentBarsAlongLongSpanCutSize
      ? ''
      : steelLengthValue / Number(bentBarsAlongLongSpanCutSize) < 1
        ? '> than length'
        : 'ok';

  const bentBarsAlongLongSpanTotalPcsSteelBar =
    !spacingWidthValue ||
    !spacingLengthValue ||
    !bentBarsAlongLongSpanPcsFromLengthBars
      ? ''
      : steelLengthValue / Number(bentBarsAlongLongSpanCutSize) < 1
        ? Number(bentBarsAlongLongSpanCutBarPcs) *
          Math.trunc(
            Number(bentBarsAlongLongSpanCutSize) / steelLengthValue + 1,
          ) *
          setsValue
        : setsValue *
          (Number(bentBarsAlongLongSpanCutBarPcs) /
            Number(bentBarsAlongLongSpanPcsFromLengthBars));

  const bentBarsAlongLongSpan6m = !bentBarsAlongLongSpanCutSize
    ? ''
    : 6 / Number(bentBarsAlongLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongLongSpanCutSize) / 6 + 1) * 6 -
            Number(bentBarsAlongLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            6 -
            Math.trunc(6 / Number(bentBarsAlongLongSpanCutSize)) *
              Number(bentBarsAlongLongSpanCutSize)
          ).toFixed(2),
        );

  const bentBarsAlongLongSpan75m = !bentBarsAlongLongSpanCutSize
    ? ''
    : 7.5 / Number(bentBarsAlongLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongLongSpanCutSize) / 7.5 + 1) * 7.5 -
            Number(bentBarsAlongLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            7.5 -
            Math.trunc(7.5 / Number(bentBarsAlongLongSpanCutSize)) *
              Number(bentBarsAlongLongSpanCutSize)
          ).toFixed(2),
        );

  const bentBarsAlongLongSpan9m = !bentBarsAlongLongSpanCutSize
    ? ''
    : 9 / Number(bentBarsAlongLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongLongSpanCutSize) / 9 + 1) * 9 -
            Number(bentBarsAlongLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            9 -
            Math.trunc(9 / Number(bentBarsAlongLongSpanCutSize)) *
              Number(bentBarsAlongLongSpanCutSize)
          ).toFixed(2),
        );

  const bentBarsAlongLongSpan105m = !bentBarsAlongLongSpanCutSize
    ? ''
    : 10.5 / Number(bentBarsAlongLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongLongSpanCutSize) / 10.5 + 1) * 10.5 -
            Number(bentBarsAlongLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            10.5 -
            Math.trunc(10.5 / Number(bentBarsAlongLongSpanCutSize)) *
              Number(bentBarsAlongLongSpanCutSize)
          ).toFixed(2),
        );

  const bentBarsAlongLongSpan12m = !bentBarsAlongLongSpanCutSize
    ? ''
    : 12 / Number(bentBarsAlongLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(bentBarsAlongLongSpanCutSize) / 12 + 1) * 12 -
            Number(bentBarsAlongLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            12 -
            Math.trunc(12 / Number(bentBarsAlongLongSpanCutSize)) *
              Number(bentBarsAlongLongSpanCutSize)
          ).toFixed(2),
        );

  const bentBarsAlongLongSpanMinimumWastage = Math.min(
    Number(bentBarsAlongLongSpan6m || 0),
    Number(bentBarsAlongLongSpan75m || 0),
    Number(bentBarsAlongLongSpan9m || 0),
    Number(bentBarsAlongLongSpan105m || 0),
    Number(bentBarsAlongLongSpan12m || 0),
  );

  const straightBottomBarsShortSpanPcsFromLengthBars =
    !straightBottomBarsShortSpanCutSize || !steelLengthValue
      ? ''
      : steelLengthValue / Number(straightBottomBarsShortSpanCutSize) < 1
        ? Math.round(
            (Math.trunc(
              Number(straightBottomBarsShortSpanCutSize) / steelLengthValue + 1,
            ) *
              steelLengthValue) /
              steelLengthValue,
          )
        : Math.trunc(
            steelLengthValue / Number(straightBottomBarsShortSpanCutSize),
          );

  const straightBottomBarsShortSpanRemarks =
    !steelLengthValue || !straightBottomBarsShortSpanCutSize
      ? ''
      : steelLengthValue / Number(straightBottomBarsShortSpanCutSize) < 1
        ? '> than length'
        : 'ok';

  const straightBottomBarsShortSpanTotalPcsSteelBar =
    !spacingWidthValue ||
    !spacingLengthValue ||
    !straightBottomBarsShortSpanPcsFromLengthBars
      ? ''
      : steelLengthValue / Number(straightBottomBarsShortSpanCutSize) < 1
        ? Number(straightBottomBarsShortSpanCutBarPcs) *
          Math.trunc(
            Number(straightBottomBarsShortSpanCutSize) / steelLengthValue + 1,
          ) *
          setsValue
        : setsValue *
          (Number(straightBottomBarsShortSpanCutBarPcs) /
            Number(straightBottomBarsShortSpanPcsFromLengthBars));

  const straightBottomBarsShortSpan6m = !straightBottomBarsShortSpanCutSize
    ? ''
    : 6 / Number(straightBottomBarsShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsShortSpanCutSize) / 6 + 1) * 6 -
            Number(straightBottomBarsShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            6 -
            Math.trunc(6 / Number(straightBottomBarsShortSpanCutSize)) *
              Number(straightBottomBarsShortSpanCutSize)
          ).toFixed(2),
        );

  const straightBottomBarsShortSpan75m = !straightBottomBarsShortSpanCutSize
    ? ''
    : 7.5 / Number(straightBottomBarsShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsShortSpanCutSize) / 7.5 + 1) *
              7.5 -
            Number(straightBottomBarsShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            7.5 -
            Math.trunc(7.5 / Number(straightBottomBarsShortSpanCutSize)) *
              Number(straightBottomBarsShortSpanCutSize)
          ).toFixed(2),
        );

  const straightBottomBarsShortSpan9m = !straightBottomBarsShortSpanCutSize
    ? ''
    : 9 / Number(straightBottomBarsShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsShortSpanCutSize) / 9 + 1) * 9 -
            Number(straightBottomBarsShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            9 -
            Math.trunc(9 / Number(straightBottomBarsShortSpanCutSize)) *
              Number(straightBottomBarsShortSpanCutSize)
          ).toFixed(2),
        );

  const straightBottomBarsShortSpan105m = !straightBottomBarsShortSpanCutSize
    ? ''
    : 10.5 / Number(straightBottomBarsShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsShortSpanCutSize) / 10.5 + 1) *
              10.5 -
            Number(straightBottomBarsShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            10.5 -
            Math.trunc(10.5 / Number(straightBottomBarsShortSpanCutSize)) *
              Number(straightBottomBarsShortSpanCutSize)
          ).toFixed(2),
        );

  const straightBottomBarsShortSpan12m = !straightBottomBarsShortSpanCutSize
    ? ''
    : 12 / Number(straightBottomBarsShortSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsShortSpanCutSize) / 12 + 1) *
              12 -
            Number(straightBottomBarsShortSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            12 -
            Math.trunc(12 / Number(straightBottomBarsShortSpanCutSize)) *
              Number(straightBottomBarsShortSpanCutSize)
          ).toFixed(2),
        );
  const straightBottomBarsShortSpanMinimumWastage = Math.min(
    Number(straightBottomBarsShortSpan6m || 0),
    Number(straightBottomBarsShortSpan75m || 0),
    Number(straightBottomBarsShortSpan9m || 0),
    Number(straightBottomBarsShortSpan105m || 0),
    Number(straightBottomBarsShortSpan12m || 0),
  );

  const straightBottomBarsLongSpanPcsFromLengthBars =
    !straightBottomBarsLongSpanCutSize || !steelLengthValue
      ? ''
      : steelLengthValue / Number(straightBottomBarsLongSpanCutSize) < 1
        ? Math.round(
            (Math.trunc(
              Number(straightBottomBarsLongSpanCutSize) / steelLengthValue + 1,
            ) *
              steelLengthValue) /
              steelLengthValue,
          )
        : Math.trunc(
            steelLengthValue / Number(straightBottomBarsLongSpanCutSize),
          );

  const straightBottomBarsLongSpanRemarks =
    !steelLengthValue || !straightBottomBarsLongSpanCutSize
      ? ''
      : steelLengthValue / Number(straightBottomBarsLongSpanCutSize) < 1
        ? '> than length'
        : 'ok';

  const straightBottomBarsLongSpanTotalPcsSteelBar =
    !spacingWidthValue ||
    !spacingLengthValue ||
    !straightBottomBarsLongSpanPcsFromLengthBars
      ? ''
      : steelLengthValue / Number(straightBottomBarsLongSpanCutSize) < 1
        ? Number(straightBottomBarsLongSpanCutBarPcs) *
          Math.trunc(
            Number(straightBottomBarsLongSpanCutSize) / steelLengthValue + 1,
          ) *
          setsValue
        : setsValue *
          (Number(straightBottomBarsLongSpanCutBarPcs) /
            Number(straightBottomBarsLongSpanPcsFromLengthBars));

  const straightBottomBarsLongSpan6m = !straightBottomBarsLongSpanCutSize
    ? ''
    : 6 / Number(straightBottomBarsLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsLongSpanCutSize) / 6 + 1) * 6 -
            Number(straightBottomBarsLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            6 -
            Math.trunc(6 / Number(straightBottomBarsLongSpanCutSize)) *
              Number(straightBottomBarsLongSpanCutSize)
          ).toFixed(2),
        );

  const straightBottomBarsLongSpan75m = !straightBottomBarsLongSpanCutSize
    ? ''
    : 7.5 / Number(straightBottomBarsLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsLongSpanCutSize) / 7.5 + 1) *
              7.5 -
            Number(straightBottomBarsLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            7.5 -
            Math.trunc(7.5 / Number(straightBottomBarsLongSpanCutSize)) *
              Number(straightBottomBarsLongSpanCutSize)
          ).toFixed(2),
        );

  const straightBottomBarsLongSpan9m = !straightBottomBarsLongSpanCutSize
    ? ''
    : 9 / Number(straightBottomBarsLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsLongSpanCutSize) / 9 + 1) * 9 -
            Number(straightBottomBarsLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            9 -
            Math.trunc(9 / Number(straightBottomBarsLongSpanCutSize)) *
              Number(straightBottomBarsLongSpanCutSize)
          ).toFixed(2),
        );

  const straightBottomBarsLongSpan105m = !straightBottomBarsLongSpanCutSize
    ? ''
    : 10.5 / Number(straightBottomBarsLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsLongSpanCutSize) / 10.5 + 1) *
              10.5 -
            Number(straightBottomBarsLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            10.5 -
            Math.trunc(10.5 / Number(straightBottomBarsLongSpanCutSize)) *
              Number(straightBottomBarsLongSpanCutSize)
          ).toFixed(2),
        );

  const straightBottomBarsLongSpan12m = !straightBottomBarsLongSpanCutSize
    ? ''
    : 12 / Number(straightBottomBarsLongSpanCutSize) < 1
      ? Number(
          (
            Math.trunc(Number(straightBottomBarsLongSpanCutSize) / 12 + 1) *
              12 -
            Number(straightBottomBarsLongSpanCutSize) -
            0.6
          ).toFixed(2),
        )
      : Number(
          (
            12 -
            Math.trunc(12 / Number(straightBottomBarsLongSpanCutSize)) *
              Number(straightBottomBarsLongSpanCutSize)
          ).toFixed(2),
        );

  const straightBottomBarsLongSpanMinimumWastage = Math.min(
    Number(straightBottomBarsLongSpan6m || 0),
    Number(straightBottomBarsLongSpan75m || 0),
    Number(straightBottomBarsLongSpan9m || 0),
    Number(straightBottomBarsLongSpan105m || 0),
    Number(straightBottomBarsLongSpan12m || 0),
  );

  return {
    widthValue,
    lengthValue,

    effectiveThickness,

    spacingWidthValue,
    spacingLengthValue,

    mainBarsValue,
    tempBarsValue,
    steelLengthValue,

    volume,
    generalMRatio,

    w4TempBars,
    l4TempBars,

    w3ExtraBars,
    l3ExtraBars,

    l2BentBarsToW,
    l2BentBarsToL,

    oneWay,

    l2BentBarsToLValue,
    l2BentBarsToWValue,

    bentBarsAlongShortSpanCutBarPcs,
    bentBarsAlongShortSpanCutSize,
    bentBarsAlongShortSpanWastageBar,

    bentBarsAlongLongSpanCutBarPcs,
    bentBarsAlongLongSpanCutSize,
    bentBarsAlongLongSpanWastageBar,

    straightBottomBarsShortSpanCutBarPcs,
    straightBottomBarsShortSpanCutSize,
    straightBottomBarsShortSpanWastageBar,

    straightBottomBarsLongSpanCutBarPcs,
    straightBottomBarsLongSpanCutSize,
    straightBottomBarsLongSpanWastageBar,

    topCutBarsAlongShortSpanCutBarPcs,
    topCutBarsAlongShortSpanCutSize,
    topCutBarsAlongShortSpanWastageBar,

    topCutBarsAlongLongSpanCutBarPcs,
    topCutBarsAlongLongSpanCutSize,
    topCutBarsAlongLongSpanWastageBar,

    tempBarsAlongShortSpanCutBarPcs,
    tempBarsAlongShortSpanCutSize,
    tempBarsAlongShortSpanWastageBar,

    tempBarsAlongLongSpanCutBarPcs,
    tempBarsAlongLongSpanCutSize,
    tempBarsAlongLongSpanWastageBar,

    slabType,

    bentBarsAlongShortSpanPcsFromLengthBars,
    bentBarsAlongShortSpanRemarks,
    bentBarsAlongShortSpanTotalPcsSteelBar,
    bentBarsAlongShortSpan6m,
    bentBarsAlongShortSpan75m,
    bentBarsAlongShortSpan9m,
    bentBarsAlongShortSpan105m,
    bentBarsAlongShortSpan12m,
    bentBarsAlongShortSpanMinimumWastage,

    bentBarsAlongLongSpanPcsFromLengthBars,
    bentBarsAlongLongSpanRemarks,
    bentBarsAlongLongSpanTotalPcsSteelBar,
    bentBarsAlongLongSpan6m,
    bentBarsAlongLongSpan75m,
    bentBarsAlongLongSpan9m,
    bentBarsAlongLongSpan105m,
    bentBarsAlongLongSpan12m,
    bentBarsAlongLongSpanMinimumWastage,

    straightBottomBarsShortSpanPcsFromLengthBars,
    straightBottomBarsShortSpanRemarks,
    straightBottomBarsShortSpanTotalPcsSteelBar,
    straightBottomBarsShortSpan6m,
    straightBottomBarsShortSpan75m,
    straightBottomBarsShortSpan9m,
    straightBottomBarsShortSpan105m,
    straightBottomBarsShortSpan12m,
    straightBottomBarsShortSpanMinimumWastage,

    straightBottomBarsLongSpanPcsFromLengthBars,
    straightBottomBarsLongSpanRemarks,
    straightBottomBarsLongSpanTotalPcsSteelBar,
    straightBottomBarsLongSpan6m,
    straightBottomBarsLongSpan75m,
    straightBottomBarsLongSpan9m,
    straightBottomBarsLongSpan105m,
    straightBottomBarsLongSpan12m,
    straightBottomBarsLongSpanMinimumWastage,
  };
}
