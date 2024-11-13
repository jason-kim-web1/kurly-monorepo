import { fireEvent, render, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import PersonalBox from './PersonalBox';
import { AppDispatch } from '../../../../shared/store';

import { redirectToLogin } from '../../../../shared/reducers/page';
import { getPersonalBoxAvailable } from '../../../../shared/services/kurlyPurpleBox.service';
import { useCompleteRequest, usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import { usePersonalBoxDataFixture, usePersonalBoxFixture } from '../../shared/fixtures/fixtures';
import { ERROR_MESSAGE, PERSONAL_BOX_AVAILABLE_TEXT } from '../../shared/constants/requestConstant';
import Alert from '../../../../shared/components/Alert/Alert';

const queryClient = new QueryClient();
jest.mock('../../../../shared/components/Alert/Alert');
jest.mock('react-redux');
jest.mock('../../../../shared/services/kurlyPurpleBox.service');
jest.mock('../../shared/hooks/usePersonalBoxQuery');

const mockStore = configureStore(getDefaultMiddleware());

describe('KurlyPurpleBoxPersonalBox', () => {
  let store: MockStoreEnhanced<unknown, AppDispatch>;
  given('isGuest', () => false);
  given('usePersonalBox', () => usePersonalBoxFixture);
  given('useCompleteRequest', () => false);
  given('currentAddress', () => ({
    roadAddress: '서울 특별시 강남구 봉은사로',
    addressDetail: '101동 102호',
  }));

  beforeEach(() => {
    store = mockStore(() => ({
      auth: {
        isGuest: given.isGuest,
      },
      shippingAddress: {
        currentAddress: given.currentAddress,
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (usePersonalBox as jest.Mock).mockImplementation(() => given.usePersonalBox);
    (useCompleteRequest as jest.Mock).mockImplementation(() => given.useCompleteRequest);
  });

  const renderPersonalBox = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <PersonalBox />
      </QueryClientProvider>,
    );

  it('개인 보냉 박스 신청 바로가기 버튼을 볼 수 있다', () => {
    const { container } = renderPersonalBox();

    expect(container).toHaveTextContent('개인 보냉 박스 신청 바로 가기');
  });

  context('비로그인 상태이거나 현 주소가 없을 때 개인 보냉 박스 신청 바로 가기 버튼을 클릭하면', () => {
    given('isGuest', () => true);
    given('currentAddress', () => undefined);

    it('로그인페이지로 이동한다', async () => {
      const { getByText } = renderPersonalBox();

      fireEvent.click(getByText('개인 보냉 박스 신청 바로 가기'));

      await waitFor(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(redirectToLogin());
      });
    });
  });

  context('신청하기 버튼을 클릭했을 때, 개인 보냉 박스 신청 여부를 확인하는 API 호출에 실패하면', () => {
    given('usePersonalBox', () => ({
      data: usePersonalBoxDataFixture,
      isError: true,
    }));

    it(`${ERROR_MESSAGE}라고 Alert를 띄운다`, async () => {
      const { getByText } = renderPersonalBox();

      fireEvent.click(getByText('개인 보냉 박스 신청 바로 가기'));

      await waitFor(() => {
        expect(Alert).toBeCalledWith({
          text: ERROR_MESSAGE,
        });
      });
    });
  });

  context('개인보냉박스를 신청한적이 없고, 샛별배송지역이 아니면', () => {
    beforeEach(() => {
      (getPersonalBoxAvailable as jest.Mock).mockResolvedValue(false);
    });

    it(`${PERSONAL_BOX_AVAILABLE_TEXT}라고 Alert를 띄운다`, async () => {
      const { getByText } = renderPersonalBox();

      fireEvent.click(getByText('개인 보냉 박스 신청 바로 가기'));

      await waitFor(() => {
        expect(Alert).toBeCalledWith({
          text: PERSONAL_BOX_AVAILABLE_TEXT,
        });
      });
    });
  });

  context('개인보냉박스를 신청한적이 있고, 샛별배송지역이 아니면', () => {
    given('usePersonalBox', () => ({
      data: usePersonalBoxDataFixture,
      isError: false,
    }));

    beforeEach(() => {
      (getPersonalBoxAvailable as jest.Mock).mockResolvedValue(false);
    });

    it('개인보냉박스 신청 팝업 컴포넌트를 렌더링 한다', async () => {
      const { getByText, getByTestId } = renderPersonalBox();

      fireEvent.click(getByText('개인 보냉 박스 신청 바로 가기'));

      await waitFor(() => {
        expect(getByTestId('form-container')).toBeInTheDocument();
      });
    });
  });

  context('개인보냉박스를 신청한적이 있고, 샛별배송지역이면', () => {
    given('usePersonalBox', () => ({
      data: usePersonalBoxDataFixture,
      isError: false,
    }));

    beforeEach(() => {
      (getPersonalBoxAvailable as jest.Mock).mockResolvedValue(true);
    });

    it('개인보냉박스 신청 팝업 컴포넌트를 렌더링 한다', async () => {
      const { getByText, getByTestId } = renderPersonalBox();

      fireEvent.click(getByText('개인 보냉 박스 신청 바로 가기'));

      await waitFor(() => {
        expect(getByTestId('form-container')).toBeInTheDocument();
      });
    });
  });

  context('샛별배송지역이 API호출에 실패하면', () => {
    beforeEach(() => {
      (getPersonalBoxAvailable as jest.Mock).mockRejectedValue(new Error());
    });

    it(`${ERROR_MESSAGE}라고 Alert를 띄운다`, async () => {
      const { getByText } = renderPersonalBox();

      fireEvent.click(getByText('개인 보냉 박스 신청 바로 가기'));

      await waitFor(() => {
        expect(Alert).toBeCalledWith({
          text: ERROR_MESSAGE,
        });
      });
    });
  });
});
