import getPickupDistance from './getPickupDistance';

describe('getPickupDistance', () => {
  context.each`
    distance | result
    ${1000} | ${'1km'}
    ${2000} | ${'2km'}
    ${1300} | ${'1.3km'}
    ${1522} | ${'1.5km'}
    ${5432} | ${'5.4km'}
    ${5499} | ${'5.5km'}
    ${29999} | ${'30km'}
    ${29499} | ${'29.5km'}
  `('1000 미터를 넘어가면', ({ distance, result }) => {
    it(`${distance}m -> ${result}km 로 변경한다.`, () => {
      expect(getPickupDistance(distance)).toBe(result);
    });
  });

  context.each`
    distance | result
    ${100} | ${'100m'}
    ${200} | ${'200m'}
  `('1000 미터를 안넘으면', ({ distance, result }) => {
    it('거리를 그대로 return 한다.', () => {
      expect(getPickupDistance(distance)).toBe(result);
    });
  });
});
