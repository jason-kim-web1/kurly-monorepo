import { fireEvent, render } from '@testing-library/react';

import { kurlyPassServiceFixture } from '../../../../fixtures';

import { useWebview } from '../../../shared/hooks/useWebview';

import KurlyPassProductsContainer from './KurlyPassProductsContainer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

jest.mock('react-redux');
jest.mock('../../../shared/hooks/useWebview');

describe('KurlyPassProductsContainer 테스트', () => {
  const push = jest.fn();
  const handleClick = jest.fn();
  const moveKurlyPass = jest.fn();
  const onClickTerminate = jest.fn();

  const renderKurlyPassProductsContainer = () =>
    render(
      <KurlyPassProductsContainer
        list={given.list}
        currentKurlyPass={given.currentKurlyPass}
        onClick={handleClick}
        moveKurlyPass={moveKurlyPass}
        onClickTerminate={onClickTerminate}
      />,
    );

  given('currentKurlyPass', () => undefined);
  given('list', () => []);

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
      isReady: true,
    }));
    (useWebview as jest.Mock).mockImplementation(() => given.isWebview);
  });

  describe('BillingInfo 컴포넌트 렌더링 테스트', () => {
    context('현재 이용 중인 컬리패스 정보가 없으면', () => {
      given('currentKurlyPass', () => undefined);
      given('list', () => []);

      it('BillingInfo 컴포넌트를 렌더링 하지 않는다.', () => {
        const { queryByTestId } = renderKurlyPassProductsContainer();

        expect(queryByTestId('billing-info')).not.toBeInTheDocument();
      });
    });

    context('현재 이용 중인 컬리패스 정보가 있으면', () => {
      given('currentKurlyPass', () => ({
        startDate: 1656514800000,
        endDate: 1659236400000,
        isExpired: false,
        status: 'Y',
        expiredDate: 1659193200000,
      }));
      given('list', () => kurlyPassServiceFixture);

      it('BillingInfo 컴포넌트를 렌더링 한다.', () => {
        const { queryByTestId } = renderKurlyPassProductsContainer();

        expect(queryByTestId('billing-info')).toBeInTheDocument();
      });
    });
  });

  describe('Information 렌더링 테스트', () => {
    context('만료 예정인 컬리패스가 있으면', () => {
      given('currentKurlyPass', () => undefined);
      given('list', () => kurlyPassServiceFixture);

      it('결제내역 확인 버튼 위에 렌더링 된다.', () => {
        const { container, getByRole, getByTestId } = renderKurlyPassProductsContainer();

        const ButtonComponent = getByRole('button', { name: /결제내역 확인/g });
        const InformationComponent = getByTestId('kurly-pass-information');
        expect(container.childNodes[0]).toEqual(InformationComponent);
        expect(container.childNodes[1]).toEqual(ButtonComponent);
      });
    });

    context('이용 중인 컬리패스가 없으면', () => {
      given('currentKurlyPass', () => ({
        startDate: 1656514800000,
        endDate: 1659236400000,
        isExpired: false,
        expiredDate: 1659193200000,
        status: 'F',
      }));
      given('list', () => kurlyPassServiceFixture);

      it('결제내역 확인 버튼 밑에 렌더링 된다.', () => {
        const { container, getByRole, getByTestId } = renderKurlyPassProductsContainer();

        const ButtonComponent = getByRole('button', { name: /결제내역 확인/g });
        const InformationComponent = getByTestId('kurly-pass-information');
        expect(container.firstChild?.childNodes[1]).toEqual(ButtonComponent);
        expect(container.firstChild?.childNodes[3]).toEqual(InformationComponent);
      });
    });
  });

  describe('Button 렌더링 테스트', () => {
    context.each([
      {
        isExpired: true,
        status: 'Y',
        button: '결제내역 확인',
        onClick: handleClick,
      },
      {
        isExpired: false,
        status: 'N',
        button: '컬리패스 사용해지',
        onClick: onClickTerminate,
      },
      {
        isExpired: false,
        status: 'P',
        button: '무료 체험 해지',
        onClick: onClickTerminate,
      },
    ])('현재 이용 중인 컬리패스 상태에 따라', ({ status, isExpired, button, onClick }) => {
      given('currentKurlyPass', () => ({
        startDate: 1656514800000,
        endDate: 1659236400000,
        isExpired,
        expiredDate: 1659193200000,
        status,
      }));
      given('list', () => kurlyPassServiceFixture);

      it(`"${button}" 버튼을 볼 수 있다.`, () => {
        const { container } = renderKurlyPassProductsContainer();

        expect(container).toHaveTextContent(button);
      });

      it(`"${button}" 버튼을 클릭 시 해당 함수가 실행된다.`, () => {
        const { getByText } = renderKurlyPassProductsContainer();

        fireEvent.click(getByText(button));

        expect(onClick).toBeCalled();
      });
    });
  });
});
