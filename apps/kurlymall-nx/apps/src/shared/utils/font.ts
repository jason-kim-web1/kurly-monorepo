const convertRemToPixel = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export { convertRemToPixel };
