import { render, screen } from '@testing-library/react';

import { addComma } from '../../../shared/services';

import SearchProductsCount from './SearchProductsCount';

const totalProductsCount = 1250;

describe('SearchProductsCount 렌더링 테스트', () => {
  const renderSearchProductsCount = () => render(<SearchProductsCount totalProductsCount={totalProductsCount} />);

  context(`상품 개수가 ${totalProductsCount}개라면`, () => {
    const totalProductsCountWithComma = addComma(totalProductsCount);

    it(`'총 ${totalProductsCountWithComma}개'를 보여준다.`, () => {
      renderSearchProductsCount();

      expect(screen.queryByText(`총 ${totalProductsCountWithComma}개`)).toBeInTheDocument();
    });
  });
});
