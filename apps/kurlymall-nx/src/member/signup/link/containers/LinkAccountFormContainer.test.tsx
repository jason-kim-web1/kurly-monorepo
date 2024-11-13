import { fireEvent, render, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import LinkAccountFormContainer from './LinkAccountFormContainer';

import { changeLinkForm, successLinkAccount } from '../../reducers/slice';
import { hideLoading, showLoading } from '../../../../shared/reducers/page';
import { setAccessToken } from '../../../../shared/reducers/auth';

import { kakaoLogin, linkKakaoAccount } from '../../services';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('react-redux');
jest.mock('../../services');

describe('LinkAccountFormContainer', () => {
  let store: MockStoreEnhanced<unknown>;

  const mockMembers = [
    {
      number: 1,
      id: 'marketkurl***',
    },
    {
      number: 2,
      id: 'kurly5***',
    },
    {
      number: 3,
      id: 'market5***',
    },
  ];
  const authMockData = {
    accessToken: 'abcde',
    uid: '12345',
    isGuest: false,
  };

  given('password', () => '');

  beforeEach(() => {
    store = mockStore(() => ({
      social: {
        link: {
          members: mockMembers,
          form: {
            memberNo: '',
            password: given.password,
          },
        },
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
    (useDispatch as jest.Mock).mockImplementation(() => store.dispatch);
    (linkKakaoAccount as jest.Mock).mockResolvedValue('');
    (kakaoLogin as jest.Mock).mockResolvedValue(authMockData);
  });

  const renderLinkAccountFormContainer = () => render(<LinkAccountFormContainer />);

  it('renders', () => {
    const { container } = renderLinkAccountFormContainer();

    expect(container).toHaveTextContent(mockMembers[0].id);
  });

  describe('Changing form password', () => {
    it('calls changeLinkForm', () => {
      const { getByPlaceholderText } = renderLinkAccountFormContainer();

      const input = getByPlaceholderText('비밀번호를 입력해주세요');

      fireEvent.change(input, {
        target: { name: 'password', value: 'asdqwe1234' },
      });

      const actions = store.getActions();

      expect(actions[0]).toEqual(
        changeLinkForm({
          name: 'password',
          value: 'asdqwe1234',
        }),
      );
    });
  });

  describe('Submit form', () => {
    context('when password is exist', () => {
      given('password', () => 'asdqwe1234');

      it('calls submitLinkForm', async () => {
        const { getByText } = renderLinkAccountFormContainer();

        fireEvent.click(getByText('카카오계정 연결하기'));

        const actions = store.getActions();

        await waitFor(() => {
          expect(actions).calledActions([showLoading, setAccessToken, successLinkAccount, hideLoading]);
        });
      });
    });
  });
});
