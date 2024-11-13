import { render, waitFor } from '@testing-library/react';
import { format } from 'date-fns';

import { kurlyPassServiceFixture } from '../../../../fixtures';
import { addComma } from '../../../shared/services';

import Loading from '../../../shared/components/Loading/Loading';
import KurlyPassList from './KurlyPassList';

jest.mock('../../../shared/components/Loading/Loading');

describe('KurlyPassList 테스트', () => {
  const renderKurlyPassList = () => render(<KurlyPassList list={given.list} loading={given.loading} />);

  given('list', () => []);
  given('loading', () => true);

  beforeEach(() => {
    (Loading as jest.Mock).mockImplementation(() => <div data-testid="loading" />);
  });

  context('로딩중이면', () => {
    given('list', () => []);
    given('loading', () => true);

    it('로딩 컴포넌트를 보여준다.', () => {
      const { getByTestId } = renderKurlyPassList();

      waitFor(() => {
        expect(getByTestId('loading')).toBeInTheDocument();
      });
    });
  });

  context('다음 페이지 로딩중이면', () => {
    given('list', () => kurlyPassServiceFixture);
    given('loading', () => true);

    it('로딩 컴포넌트를 보여준다.', () => {
      const { getByTestId } = renderKurlyPassList();

      waitFor(() => {
        expect(getByTestId('loading')).toBeInTheDocument();
      });
    });
  });

  context('리스트가 없으면', () => {
    given('list', () => []);
    given('loading', () => false);

    it('월 정기결제 내역이 없습니다. 텍스트를 볼 수 있다.', () => {
      const { container } = renderKurlyPassList();

      expect(container).toHaveTextContent('월 정기결제 내역이 없습니다.');
    });
  });

  context('리스트가 있으면', () => {
    given('list', () => kurlyPassServiceFixture);
    given('loading', () => false);

    it('월 정기 컬리패스 결제 내용을 볼 수 있다.', () => {
      const { container } = renderKurlyPassList();

      given.list.forEach(({ date, paymentPrice }: { date: string; paymentPrice: number }) => {
        expect(container).toHaveTextContent(format(new Date(date), 'yy.MM.dd'));
        expect(container).toHaveTextContent('월 정기 컬리패스 결제');
        expect(container).toHaveTextContent(`${addComma(paymentPrice)}원`);
      });
    });
  });
});
