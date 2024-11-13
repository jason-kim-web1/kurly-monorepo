import { screen, fireEvent, within } from '@testing-library/react';

import { addComma } from '../../../../shared/services';

import PointUsage from './PointUsage';
import { usePreviousVendorQuery } from '../../shared/hooks/queries';
import { renderWithProviders } from '../../../../../util/testutil';

jest.mock('../../shared/hooks/queries');

describe('PointUsage 테스트', () => {
  const handleChange = jest.fn();
  const handleTotalPoint = jest.fn();

  given('disabled', () => false);
  given('availablePoint', () => ({
    free: 5000,
    paid: 5000,
  }));
  given('usedPoint', () => 10000);
  given('isLiquidity', () => false);

  beforeEach(() => {
    (usePreviousVendorQuery as jest.Mock).mockReturnValue({
      isLoading: false,
    });
  });

  const renderPointUsage = () =>
    renderWithProviders(
      <PointUsage
        availablePoint={given.availablePoint}
        usedPoint={given.usedPoint}
        disabled={given.disabled}
        onChange={handleChange}
        onClickTotalPoint={handleTotalPoint}
        isLiquidity={given.isLiquidity}
      />,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('모두사용 버튼을 볼 수 있다', () => {
    renderPointUsage();

    expect(screen.getByRole('button', { name: '모두사용' })).toBeInTheDocument();
  });

  it('적립금 · 컬리캐시를 볼 수 있다', () => {
    renderPointUsage();

    const total = given.availablePoint.free + given.availablePoint.paid;

    expect(screen.getByText('사용가능 잔액')).toBeInTheDocument();
    expect(screen.getByText(`${addComma(total)}`)).toBeInTheDocument();
  });

  context('disabled 상태이면', () => {
    given('disabled', () => true);

    it('input 이 disabled 상태가 된다.', () => {
      renderPointUsage();

      expect(screen.getByTestId('input-box')).toBeDisabled();
    });

    it('모두사용 버튼이 disabled 상태가 된다.', () => {
      renderPointUsage();

      expect(screen.getByRole('button', { name: '모두사용' })).toBeDisabled();
    });
  });

  context('전체 적립금이 0이면', () => {
    given('availablePoint', () => ({
      free: 0,
      paid: 0,
    }));

    it('포인트 인풋이 disabled 상태가 된다.', () => {
      renderPointUsage();

      expect(screen.getByTestId('input-box')).toBeDisabled();
    });

    it('모두사용 버튼이 disabled 상태가 된다.', () => {
      renderPointUsage();

      expect(screen.getByRole('button', { name: '모두사용' })).toBeDisabled();
    });
  });

  describe('적립금 변경 테스트', () => {
    context('delete 버튼 클릭 하여 input change 가 최종적으로 0원이면', () => {
      given('usedPoint', () => 0);

      it('handleBlur handler를 호출한다', () => {
        renderPointUsage();

        fireEvent.change(screen.getByPlaceholderText('0'), {
          target: {
            name: 'point-usage',
            value: '',
          },
        });

        expect(handleChange).toBeCalledWith(0);
      });
    });

    context('input change 이벤트가 발생하면', () => {
      given('availablePoint', () => 0);

      it('handleChange handler를 호출한다', () => {
        renderPointUsage();

        fireEvent.change(screen.getByPlaceholderText('0'), {
          target: {
            name: 'point-usage',
            value: 5000,
          },
        });

        expect(handleChange).toBeCalledWith(5000);
      });
    });
  });

  context('모두사용 버튼 클릭하면', () => {
    it('handleTotalPoint handler를 호출한다', () => {
      renderPointUsage();

      fireEvent.click(screen.getByRole('button', { name: '모두사용' }));

      expect(handleTotalPoint).toBeCalled();
    });
  });

  context('주문 상품이 환금성 상품이면', () => {
    given('isLiquidity', () => true);
    given('availablePoint', () => ({
      free: 5000,
      paid: 10000,
    }));

    it('사용가능 잔액이 컬리캐시 잔액으로 노출된다.', () => {
      renderPointUsage();

      const pointField = screen.getByTestId('available-total-point');
      const totalPoint = addComma(given.availablePoint.paid);

      expect(within(pointField).getByText(totalPoint)).toBeInTheDocument();
    });

    it('적립금 (사용불가 상품) 을 볼 수 있다.', () => {
      renderPointUsage();

      expect(screen.getByText('적립금 (사용불가 상품)')).toBeInTheDocument();
    });
  });
});
