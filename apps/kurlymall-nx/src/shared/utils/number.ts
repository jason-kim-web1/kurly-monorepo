export const padZero = (n: number | string): string => {
  const s = String(n);
  if (s.length === 1) return `0${s}`;
  return s;
};
