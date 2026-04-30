export function getEndWeb(thickness: number | '') {
  if (!thickness) return '';
  if (thickness <= 0.15) return 0.025;
  if (thickness <= 0.2) return 0.03;
  if (thickness > 0.2) return 0.038;
  return 0.035;
}

export function getInnerWeb(thickness: number | '', webs: number | '') {
  if (!thickness || !webs) return '';
  if (webs === 2) return '';
  if (thickness <= 0.15) return 0.025;
  if (thickness <= 0.2) return 0.025;
  if (thickness > 0.2) return 0.03;
  return 0.035;
}

export function getShell(thickness: number | '') {
  if (!thickness) return '';
  if (thickness <= 0.15) return 0.025;
  if (thickness <= 0.2) return 0.03;
  if (thickness > 0.2) return 0.038;
  return 0.035;
}

export function computeCHBVolume(
  thickness: number | '',
  webs: number | '',
  endWeb: number | '',
  innerWeb: number | '',
  shell: number | '',
  isCustom: boolean,
) {
  if (!isCustom) return 0; // 🔥 KEY FIX (Excel Q28 check)

  if (!thickness || !webs || !endWeb || !shell) return 0;

  const base = 0.4;
  const inner = innerWeb || 0;

  if (webs === 2) {
    return (base - 2 * endWeb) * ((thickness - 2 * shell) * 0.2 * 12.5);
  }

  if (webs === 3) {
    return (base - 2 * endWeb - inner) * ((thickness - 2 * shell) * 0.2 * 12.5);
  }

  if (webs === 4) {
    return (
      (base - 2 * endWeb - 2 * inner) * ((thickness - 2 * shell) * 0.2 * 12.5)
    );
  }

  return 0;
}

export function computeCHBVolBetween(thickness: number | '') {
  if (!thickness) return 0;
  return thickness * 0.012 * 5;
}

export function computeCHBTotal(vol: number, between: number) {
  return vol + between;
}
