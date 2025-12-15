import seedRandom from 'seedrandom';

export const random = (min: number, max: number, factor = Math.random(), step = 1) => {
  const steps = Math.round((max - min) / step);
  const index = Math.floor(factor * (steps + 1)); // include last step
  const value = min + index * step;
  // Handle floating-point precision issues (e.g., 0.30000000000004)
  return Math.round(value / step) * step;
};

export const seededRandom = (min: number, max: number, string: string, step = 1) =>
  random(min, max, seedRandom(string)(), step);

export const colorStrength = (col: any, amt: any) => {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
