import { fireEvent, screen, waitFor } from '@testing-library/react';

import { OnlyMembersProductAlert } from '.';

jest.mock('../../../../../util/window/getDevice');

describe('OnlyMembersProductAlert test', () => {
  const handleClickDismissed = jest.fn();
  const handleClickConfirm = jest.fn();

  const mockGetDevice = jest.requireMock('../../../../../util/window/getDevice');

  const renderAlert = () =>
    OnlyMembersProductAlert({
      onDismissed: handleClickDismissed,
      onConfirm: handleClickConfirm,
    });

  it('멤버십 가입 유도 Alert 을 볼 수 있다', async () => {
    mockGetDevice.isPC = true;

    renderAlert();

    await waitFor(() => {
      expect(screen.getByText('컬리멤버스 전용상품 포함')).toBeInTheDocument();
      expect(
        screen.getByText('컬리멤버스 회원만 구매 가능한 상품이 포함되어 있습니다. 지금 가입하고 함께 주문하시겠어요?'),
      ).toBeInTheDocument();
    });
  });

  it('PC 가 아니면 title 을 볼 수 없다.', async () => {
    mockGetDevice.isPC = false;

    renderAlert();

    await waitFor(() => {
      expect(screen.queryByText('컬리멤버스 전용상품 포함')).not.toBeInTheDocument();
    });
  });

  it('취소 버튼을 클릭하면 dismissed handler 를 호출한다.', async () => {
    renderAlert();

    await waitFor(() => {
      const button = screen.getByRole('button', { name: '취소' });

      fireEvent.click(button);

      expect(handleClickDismissed).toBeCalled();
    });
  });

  it('backdrop을 클릭하면 dismissed handler 를 호출한다.', async () => {
    renderAlert();

    await waitFor(() => {
      const backdrop = screen.getByRole('dialog').parentElement as Element;

      fireEvent.click(backdrop);

      expect(handleClickDismissed).toBeCalled();
    });
  });

  it('컬리멤버스 혜택받기 버튼을 클릭하면 confrim handler 를 호출한다.', async () => {
    renderAlert();

    await waitFor(() => {
      const button = screen.getByRole('button', { name: '컬리멤버스 혜택받기' });

      fireEvent.click(button);

      expect(handleClickConfirm).toBeCalled();
    });
  });
});
