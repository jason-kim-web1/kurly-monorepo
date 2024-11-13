import { fireEvent, render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { ReceivePlace } from '../../../../shared/enums';
import { receiverFormFixtures } from '../../../../../fixtures';

import ReceiverDetailsContainer from './ReceiverDetailsContainer';
import Loading from '../../../../shared/components/Loading/Loading';
import useCheckoutOrderer from '../hooks/useCheckoutOrderer';
import useCheckoutAddress from '../hooks/useCheckoutAddress';
import { useCheckoutAddressQuery } from '../hooks/queries';
import { isDefaultPhoneNumber } from '../../../../shared/utils';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../hooks/queries');
jest.mock('../hooks/useCheckoutOrderer');
jest.mock('../hooks/useCheckoutAddress');
jest.mock('../../../../shared/components/Loading/Loading');

describe('ReceiverDetailsContainer', () => {
  const renderReceiverDetailsContainer = () => render(<ReceiverDetailsContainer isPC={given.isPC} />);

  let store: MockStoreEnhanced<unknown>;
  const setSameWithOrderer = jest.fn();
  const changeAddressDetail = jest.fn();
  const submitAddress = jest.fn();

  given('receiverForm', () => receiverFormFixtures);

  given('memberName', () => '');
  given('memberMobile', () => '');
  given('isSameOrderer', () => false);

  given('isPC', () => false);
  given('useCheckoutOrdererResponse', () => ({
    isLoading: false,
    isError: false,
    data: {
      name: '테스터',
      phone: '01012345678',
      email: '',
    },
  }));

  beforeEach(() => {
    (Loading as jest.Mock).mockImplementation(() => <div data-testid="loading" />);

    store = mockStore(() => ({
      checkout: {
        receiverForm: given.receiverForm,
        member: {
          name: given.memberName,
          mobile: given.memberMobile,
        },
      },
      auth: {
        isGuest: false,
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));

    (useCheckoutOrderer as jest.Mock).mockImplementation(() => given.useCheckoutOrdererResponse);
    (useCheckoutAddress as jest.Mock).mockImplementation(() => ({
      setSameWithOrderer,
      changeAddressDetail,
      submitAddress,
      isSameOrderer:
        given?.receiverForm.name === given?.memberName &&
        (isDefaultPhoneNumber(given?.receiverForm?.phone) ? '' : given?.receiverForm?.phone) === given?.memberMobile,
    }));
    (useCheckoutAddressQuery as jest.Mock).mockImplementation(() => ({}));
  });

  context('배송 타입이 결정되지 않았으면', () => {
    given('receiverForm', () => ({
      ...receiverFormFixtures,
      address: '',
    }));

    it('로딩 컴포넌트를 볼 수 있다', () => {
      const { getByTestId } = renderReceiverDetailsContainer();

      expect(getByTestId('loading')).toBeInTheDocument();
    });
  });

  context('배송 장소를 수정하면', () => {
    given('receiverForm', () => ({
      ...receiverFormFixtures,
      receivePlace: ReceivePlace.DOOR,
      deliveryType: 'direct',
    }));

    it('changeAddressDetail 를 호출한다', () => {
      const { getByLabelText } = renderReceiverDetailsContainer();

      fireEvent.click(getByLabelText('기타 장소'));

      expect(changeAddressDetail).toBeCalledWith(
        expect.objectContaining({
          name: 'receivePlace',
          value: ReceivePlace.ETC,
        }),
      );
    });
  });

  context('주문자 정보와 동일 체크박스를 클릭하면', () => {
    given('memberName', () => '테스터');
    given('memberMobile', () => '01012345678');
    given('receiverForm', () => ({
      ...receiverFormFixtures,
    }));

    it('setSameWithOrderer 를 호출한다', () => {
      const { getByLabelText } = renderReceiverDetailsContainer();

      fireEvent.click(getByLabelText('주문자 정보와 동일'));

      expect(setSameWithOrderer).toBeCalled();
    });
  });

  context('주문자 정보와 입력값이 동일하면', () => {
    given('memberName', () => '테스터');
    given('memberMobile', () => '01012345678');
    given('receiverForm', () => ({
      ...receiverFormFixtures,
      name: '테스터',
      phone: '01012345678',
    }));

    it('주문자 정보와 동일 체크박스가 체크된다.', () => {
      const { getByRole } = renderReceiverDetailsContainer();

      expect(getByRole('checkbox')).toBeChecked();
    });
  });

  context('주문자 정보와 입력값이 동일하지만 휴대폰 번호가 "010-0000-0000" 이면', () => {
    given('memberName', () => '테스터');
    given('memberMobile', () => '01000000000');
    given('receiverForm', () => ({
      ...receiverFormFixtures,
      name: '테스터',
      phone: '01000000000',
    }));

    it('주문자 정보와 동일 체크박스가 체크되지 않는다.', () => {
      const { getByRole } = renderReceiverDetailsContainer();

      expect(getByRole('checkbox')).not.toBeChecked();
    });
  });

  context('저장 버튼을 클릭하면', () => {
    it('submitAddress 을 호출한다', () => {
      const { getByText } = renderReceiverDetailsContainer();

      fireEvent.click(getByText('동의하고 저장'));

      expect(submitAddress).toBeCalled();
    });
  });

  context('받으실 장소가 "문 앞" 일 경우', () => {
    given('receiverForm', () => ({
      ...receiverFormFixtures,
      receivePlace: ReceivePlace.DOOR,
      deliveryType: 'direct',
    }));

    it('공동현관 출입방법 선택 화면을 볼 수 있다.', () => {
      const { container } = renderReceiverDetailsContainer();

      expect(container).toHaveTextContent('공동현관 출입방법');
    });
  });

  context('받으실 장소가 "기타 장소" 일 경우', () => {
    given('receiverForm', () => ({
      ...receiverFormFixtures,
      receivePlace: ReceivePlace.ETC,
      deliveryType: 'direct',
    }));

    it('기타장소 세부사항 입력 화면을 볼 수 있다', () => {
      const { container } = renderReceiverDetailsContainer();

      expect(container).toHaveTextContent('기타장소 세부사항');
    });
  });
});
