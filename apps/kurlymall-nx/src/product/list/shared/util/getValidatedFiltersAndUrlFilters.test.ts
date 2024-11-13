import { filterDataFixture } from '../productListFixtures';
import getValidatedFiltersAndUrlFilters from './getValidatedFiltersAndUrlFilters';

describe('get validatedFilters and url Filters', () => {
  given('filterData', () => filterDataFixture);

  context.each([
    {
      category: ['912005'],
      price: ['3700-5200'],
    },
    {
      category: ['912005', '249001'],
      price: ['3700-5200'],
    },
  ])('정상적인 필터 데이터가 url에 있다면', (activeFilterFixture) => {
    given('activeFilter', () => activeFilterFixture);

    it('validatedFilters와 urlFilters가 정상적으로 반환되어 같은 값을 가진다.', () => {
      const { validatedFilters, urlFilters } = getValidatedFiltersAndUrlFilters({
        activeFilter: given.activeFilter,
        filterData: given.filterData,
      });

      expect(validatedFilters).toStrictEqual(urlFilters);
    });
  });

  context('비정상적인 필터 데이터가 url에 있어서', () => {
    context('잘못된 키 값이 내려온다면', () => {
      given('activeFilter', () => ({
        wrongKey: ['912005'],
        price: ['3700-5200'],
      }));

      it('validatedFilters에 잘못된 키를 가진 필터 값이 사라지고 urlFilters와 다른 값을 가진다.', () => {
        const { validatedFilters, urlFilters } = getValidatedFiltersAndUrlFilters({
          activeFilter: given.activeFilter,
          filterData: given.filterData,
        });

        expect(validatedFilters).toStrictEqual(['price:3700-5200']);
        expect(urlFilters).toStrictEqual(['wrongKey:912005', 'price:3700-5200']);
        expect(validatedFilters).not.toStrictEqual(urlFilters);
      });
    });

    context.each([
      {
        category: [''],
        price: ['3700-5200'],
        expectedUrlFilters: ['category:', 'price:3700-5200'],
      },
      {
        category: ['wrongValue'],
        price: ['3700-5200'],
        expectedUrlFilters: ['category:wrongValue', 'price:3700-5200'],
      },
    ])('잘못된 value 값이 내려온다면', ({ category, price, expectedUrlFilters }) => {
      given('activeFilter', () => ({
        category,
        price,
      }));

      it('validatedFilters에 잘못된 value를 가진 필터 값이 사라지고 urlFilters와 다른 값을 가진다.', () => {
        const { validatedFilters, urlFilters } = getValidatedFiltersAndUrlFilters({
          activeFilter: given.activeFilter,
          filterData: given.filterData,
        });

        expect(validatedFilters).toStrictEqual(['price:3700-5200']);
        expect(urlFilters).toStrictEqual(expectedUrlFilters);
        expect(validatedFilters).not.toStrictEqual(urlFilters);
      });
    });
  });
});
