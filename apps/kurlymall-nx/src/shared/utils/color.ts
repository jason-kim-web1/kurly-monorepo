import { chain } from 'lodash';

export const hexToRgba = (hexCode: string, alpha = 1) => {
  try {
    const [r, g, b] = chain(hexCode.match(/\w\w/g))
      .map((hex) => parseInt(hex, 16))
      .value();
    return `rgba(${r},${g},${b},${alpha})`;
  } catch (error) {
    return `rgba()`;
  }
};
