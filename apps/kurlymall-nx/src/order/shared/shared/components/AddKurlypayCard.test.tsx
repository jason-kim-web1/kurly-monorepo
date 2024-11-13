import { fireEvent, screen } from '@testing-library/react';

import AddKurlypayCard from './AddKurlypayCard';

import { renderWithProviders } from '../../../../../util/testutil';

import useKurlypay from '../../../../shared/hooks/useKurlypay';

jest.mock('../../../../shared/hooks/useKurlypay');

describe('AddKurlypayCard', () => {
  const openKurlypayPage = jest.fn();
  const getReturnUrl = jest.fn();

  beforeEach(() => {
    (useKurlypay as jest.Mock).mockImplementationOnce(() => ({
      openKurlypayPage,
      getReturnUrl,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('컬리페이 카드 추가 문구를 볼 수 있다.', () => {
    renderWithProviders(<AddKurlypayCard active={false} isGiftCardOrder={false} />);

    expect(screen.getByText(/카드 또는 계좌.*추가하기/)).toBeInTheDocument();
  });

  context('isGiftCardOrder 가 true 이면', () => {
    it('계좌 추가하기 문구를 볼 수 있다.', () => {
      renderWithProviders(<AddKurlypayCard active={false} isGiftCardOrder={true} />);
      expect(screen.getByText(/계좌 추가하기/)).toBeInTheDocument();
    });
  });

  context('active 가 true 이면', () => {
    it('컬리페이 카드를 클릭했을 때 openKurlypayPage 가 호출된다.', () => {
      renderWithProviders(<AddKurlypayCard active={true} isGiftCardOrder={false} />);

      const button = screen.getByText(/카드 또는 계좌.*추가하기/);

      fireEvent.click(button);

      expect(openKurlypayPage).toBeCalled();
    });
  });

  context('active 가 false 이면', () => {
    it('컬리페이 카드를 클릭했을 때 openKurlypayPage 가 호출되지 않는다.', () => {
      renderWithProviders(<AddKurlypayCard active={false} isGiftCardOrder={false} />);

      const button = screen.getByText(/카드 또는 계좌.*추가하기/);

      fireEvent.click(button);

      expect(openKurlypayPage).not.toBeCalled();
    });
  });
});
