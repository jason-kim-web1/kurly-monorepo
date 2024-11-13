import { render, screen } from '@testing-library/react';

import ListviewInformation from './ListviewInformation';

describe('ListviewInformation', () => {
  context('isLoading이 true이면', () => {
    const keyword = '';

    context.each`
      total | keyword
      ${100} | ${'강남'}
      ${10000} | ${''}
      ${0} | ${'역삼'}
    `('무조건', (total) => {
      it(`"배송지에서 가까운 순으로 보여드려요 문구를 노출한다.`, () => {
        render(<ListviewInformation keyword={keyword} total={total} isLoading={true} />);

        expect(screen.getByText('배송지에서 가까운 순으로 보여드려요')).toBeInTheDocument();
      });
    });
  });

  context('키워드가 없는 경우', () => {
    const keyword = '';

    context.each([100, 10000, 0])('매장 총 개수가 있어도', (total) => {
      it(`"배송지에서 가까운 순으로 보여드려요 문구를 노출한다.`, () => {
        render(<ListviewInformation keyword={keyword} total={total} isLoading={false} />);

        expect(screen.getByText('배송지에서 가까운 순으로 보여드려요')).toBeInTheDocument();
      });
    });
  });

  context('키워드가 있고', () => {
    const keyword = '강남';

    context.each`
      total | result
      ${100} | ${'총 100개'}
      ${10000} | ${'총 10,000개'}
    `('매장 총 개수가 있으면', ({ total, result }) => {
      it(`"${result}를 노출한다.`, () => {
        render(<ListviewInformation keyword={keyword} total={total} isLoading={false} />);

        expect(screen.getByText(result)).toBeInTheDocument();
      });
    });

    context('매장 개수가 0개면', () => {
      it(`"아무 것도 노출하지 않는다.`, () => {
        const { container } = render(<ListviewInformation keyword={'역삼'} total={0} isLoading={false} />);

        expect(container).toBeEmptyDOMElement();
      });
    });
  });
});
