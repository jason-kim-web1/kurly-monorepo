export const getTouchAngle = (deltaX: number, deltaY: number) => {
  return (Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) * 180) / Math.PI;
};
