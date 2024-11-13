import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import PackagingMethodContainer from './PackagingMethodContainer';

import { setValue } from '../../shared/reducers/checkout.slice';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('PackagingMethodContainer 테스트', () => {
  let store: MockStoreEnhanced<unknown>;

  const renderPackagingMethodContainer = () => render(<PackagingMethodContainer />);

  given('selected', () => null);
  given('available', () => ({
    kurlyBag: true,
    personalBag: true,
  }));

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        reusablePackage: {
          selected: given.selected,
          available: given.available,
        },
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  context('컬리 퍼플 박스나 개인 보냉 박스를 사용할 수 있다면', () => {
    given('selected', () => 'PAPER');

    it('포장방법을 볼 수 있다', () => {
      const { container } = renderPackagingMethodContainer();

      expect(container).toHaveTextContent('포장방법');
    });

    context('다른 포장 방법을 선택할 때', () => {
      it('setValue action이 호출된다', () => {
        const { getByLabelText } = renderPackagingMethodContainer();

        fireEvent.click(getByLabelText('컬리 퍼플 박스'));

        const actions = store.getActions();

        expect(actions[0]).toEqual(
          setValue({
            reusablePackage: {
              selected: 'KURLY',
              available: {
                kurlyBag: true,
                personalBag: true,
              },
            },
          }),
        );
      });
    });
  });

  context('컬리 퍼플 박스나 개인 보냉 박스를 사용할 수 없다면', () => {
    given('selected', () => null);
    given('available', () => ({
      kurlyBag: false,
      personalBag: false,
    }));

    it('포장 방법을 볼 수 없다', () => {
      const { container } = renderPackagingMethodContainer();

      expect(container).not.toHaveTextContent('포장방법');
    });
  });
});
