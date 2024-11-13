import { fireEvent, render, screen } from '@testing-library/react';

import { head, last } from 'lodash';

import { useRouter } from 'next/router';

import SearchProductsSort from './SearchProductsSort';
import type { SearchAvailableSort } from '../../shared/types';

const sortOptions: SearchAvailableSort[] = [
  { type: '4', name: '추천순' },
  { type: '0', name: '신상품순' },
  { type: '1', name: '판매량순' },
  { type: '5', name: '혜택순' },
  { type: '2', name: '낮은가격순' },
  { type: '3', name: '높은가격순' },
];

const defaultSelectedOption = head(sortOptions) as SearchAvailableSort;
const { type: defaultSelectedType, name: defaultSelectedName } = defaultSelectedOption;

given('sortType', () => ({ type: defaultSelectedType, name: defaultSelectedName }));

const onSortingEvent = jest.fn();
const onChangeSortEvent = jest.fn();

jest.mock('next/router');

beforeEach(() => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    pathname: 'search',
    query: {
      sorted_type: given.sortType,
    },
  }));
});

describe('SearchProductsSort 렌더링 테스트', () => {
  const renderSearchSortBarContainer = (sortType: string) =>
    render(
      <SearchProductsSort
        sortOptions={sortOptions}
        selectedType={sortType}
        onSortingEvent={() => onSortingEvent}
        onChangeSortEvent={() => onChangeSortEvent}
      />,
    );

  context(`정렬 기준이 sortOptions 와 같을 때,`, () => {
    context('default 초기 화면이라면', () => {
      it(`정렬 기준은 ${defaultSelectedName}을 보여준다.`, () => {
        renderSearchSortBarContainer(defaultSelectedType);

        const selectedSortName = screen.getByText(`${defaultSelectedName}`);
        expect(selectedSortName).toBeInTheDocument();
      });
    });

    context('정렬 텍스트를 클릭하면,', () => {
      const newlySelectedSortOption = last(sortOptions);
      const { type: newlySelectedType, name: newlySelectedName } = newlySelectedSortOption as SearchAvailableSort;

      it(`전체 정렬 레이어를 펼치고, 선택된 정렬 값을 확인한다.`, () => {
        const { getByText } = renderSearchSortBarContainer(newlySelectedType);

        const selectedSortName = getByText(newlySelectedName);

        fireEvent.click(selectedSortName);

        const targetEl = screen.getByRole('list');
        const targetText = targetEl.querySelector('.active')?.textContent;

        sortOptions.forEach(({ name }) => {
          const sortName = screen.getByRole('link', { name: name });
          expect(sortName).toBeInTheDocument();
        });

        expect(targetText).toEqual(newlySelectedName);
      });

      it(`선택된 기준은 ${newlySelectedName}이다.`, () => {
        renderSearchSortBarContainer(newlySelectedType);

        const selectedSortName = screen.getByText(`${newlySelectedName}`);
        expect(selectedSortName).toBeInTheDocument();
      });
    });
  });
});
