import { render } from '@testing-library/react';

import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { useSelector } from 'react-redux';

import BannerContainer from './BannerContainer';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');

describe('BannerContainer 테스트', () => {
  let store: MockStoreEnhanced<unknown>;

  const renderBannerContainer = () => render(<BannerContainer device="pc" />);

  given('selected', () => null);

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        reusablePackage: {
          selected: given.selected,
        },
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  context('selected 값이 null이면', () => {
    it('아무것도 보여주지 않는다.', () => {
      const { container } = renderBannerContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('포장 방법이 KURLY 이면', () => {
    given('selected', () => 'KURLY');

    it('컬리 퍼플 박스 띠 배너를 보여준다', () => {
      const { getByAltText } = renderBannerContainer();

      expect(getByAltText('컬리 퍼플 박스를 문 앞에 놓아주세요')).toBeInTheDocument();
    });
  });

  context('포장 방법이 PERSONAL 이면', () => {
    given('selected', () => 'PERSONAL');

    it('개인 보냉 박스 띠 배너를 보여준다', () => {
      const { getByAltText } = renderBannerContainer();

      expect(getByAltText('개인 보냉 박스를 문 앞에 놓아주세요')).toBeInTheDocument();
    });
  });
});
