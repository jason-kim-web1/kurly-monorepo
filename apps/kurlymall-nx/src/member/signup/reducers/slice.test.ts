import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import reducer, {
  initialState,
  setValue,
  updateSignupState,
  initialSignupForm,
  updateDuplicate,
  changeLinkForm,
  loadLinkableAccounts,
  requestConfirmDuplicateId,
  requestKakaoAccountInfomation,
  submitLinkForm,
  submitSignupForm,
  successLinkAccount,
  changeSignupForm,
} from './slice';

import {
  requestLinkableAccounts,
  linkKakaoAccount,
  kakaoLogin,
  confirmDuplicateId,
  kakaoAccountInfomation,
} from '../services';
import { extractAuthentication } from '../../../shared/utils/token';

import { hideLoading, notify, showLoading } from '../../../shared/reducers/page';
import { setAccessToken } from '../../../shared/reducers/auth';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../services');
jest.mock('../../../shared/utils/token');

describe('social slice', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  const mockLinkForm = {
    memberNo: '1',
    password: 'asdqwe1234',
  };
  const mockMatchingData = '010-9411-****';
  const mockMembers = [
    {
      number: '1',
      id: 'marketkurl***',
    },
    {
      number: '2',
      id: 'kurly5***',
    },
    {
      number: '3',
      id: 'market5***',
    },
    {
      number: '4',
      id: 'marketkurly***',
    },
    {
      number: '5',
      id: 'kurly5***',
    },
  ];
  const mockInitialSignupForm = {
    id: 'marketkurly12',
    name: '마켓컬리',
    addressInfomation: {
      addressDetail: '',
      lotNumberAddress: '',
      roadAddress: '한국타이어빌딩 15층',
      zipCode: '',
      zoneCode: '',
    },
  };
  const mockErrors = {
    id: { minAndPattern: '' },
    password: { min: '', pattern: '', consecutive: '' },
    passwordConfirm: '',
  };
  const mockAuthData = {
    accessToken: 'abcde',
    uid: '1234',
    isGuest: false,
  };

  given('duplicate', () => true);
  given('form', () => ({
    ...mockInitialSignupForm,
    password: 'asdqwe1234',
    passwordConfirm: 'asdqwe1234',
    recommender: '',
    eventName: '',
  }));

  beforeEach(() => {
    store = mockStore(() => ({
      social: {
        ...initialState,
        signup: {
          ...initialState.signup,
          duplicate: given.duplicate,
          form: given.form,
        },
      },
    }));

    (requestLinkableAccounts as jest.Mock).mockResolvedValue({
      matchingData: mockMatchingData,
      members: mockMembers,
    });
    (linkKakaoAccount as jest.Mock).mockResolvedValue('');
    (kakaoLogin as jest.Mock).mockResolvedValue(mockAuthData);
    (kakaoAccountInfomation as jest.Mock).mockResolvedValue(mockInitialSignupForm);
    (extractAuthentication as jest.Mock).mockReturnValue({
      uid: '1234',
    });
  });

  describe('setValue', () => {
    it('updates with value', () => {
      const { link } = reducer(
        initialState,
        setValue({
          link: {
            matchingData: '010-9411-****',
          },
        }),
      );

      expect(link.matchingData).toBe('010-9411-****');
    });
  });

  describe('updateSignupState', () => {
    it('updates signup status "SUCCESS"', () => {
      const { signup } = reducer(initialState, updateSignupState('SUCCESS'));

      expect(signup.status).toBe('SUCCESS');
    });
  });

  describe('successLinkAccount', () => {
    it('updates link status', () => {
      const { link } = reducer(initialState, successLinkAccount('SUCCESS'));

      expect(link.status).toBe('SUCCESS');
    });
  });

  describe('changeLinkForm', () => {
    it('change value', () => {
      const { link } = reducer(
        initialState,
        changeLinkForm({
          name: 'password',
          value: 'asdqwe1234',
        }),
      );

      expect(link.form.password).toBe('asdqwe1234');
    });
  });

  describe('changeSignupForm', () => {
    it('change value', () => {
      const { signup } = reducer(
        initialState,
        changeSignupForm({
          name: 'id',
          value: 'testid',
        }),
      );

      expect(signup.form.id).toBe('testid');
    });
  });

  describe('updateDuplicate', () => {
    it('updates id duplicate state', () => {
      const { signup } = reducer(initialState, updateDuplicate(true));

      expect(signup.duplicate).toBe(true);
    });
  });

  describe('initialSignupForm', () => {
    it('init signup form', () => {
      const { signup } = reducer(initialState, initialSignupForm(mockInitialSignupForm));

      expect(signup.form.id).toBe('marketkurly12');
      expect(signup.form.name).toBe('마켓컬리');
      expect(signup.form.addressInfomation.roadAddress).toBe('한국타이어빌딩 15층');
    });
  });

  describe('loadLinkableAccounts', () => {
    it('calls actions', async () => {
      await store.dispatch(loadLinkableAccounts({ provider: 'kakao' }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(
        setValue({
          link: {
            matchingData: mockMatchingData,
            members: mockMembers,
            form: {
              memberNo: mockMembers[0].number,
              password: '',
            },
          },
        }),
      );
    });
  });

  describe('submitLinkForm', () => {
    it('calls action', async () => {
      await store.dispatch(submitLinkForm({ provider: 'kakao', form: mockLinkForm }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(actions[1]).toEqual(setAccessToken(mockAuthData));
      expect(actions[2]).toEqual(successLinkAccount('SUCCESS'));
      expect(actions[3]).toEqual(hideLoading());
    });
  });

  describe('submitSignupForm', () => {
    given('duplicate', () => false);

    it('calls notify action', async () => {
      await store.dispatch(submitSignupForm({ provider: 'kakao', errors: mockErrors }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(actions[1]).toEqual(setAccessToken(mockAuthData));
      expect(actions[2]).toEqual(updateSignupState('SUCCESS'));
      expect(actions[3]).toEqual(hideLoading());
    });
  });

  describe('requestConfirmDuplicateId', () => {
    context('when ID is not duplicated', () => {
      it('calls updateDuplicate action and notify', async () => {
        (confirmDuplicateId as jest.Mock).mockResolvedValue({ duplicate: false });

        await store.dispatch(requestConfirmDuplicateId('marketkurly12'));

        const actions = store.getActions();

        expect(actions[0]).toEqual(updateDuplicate(false));
        expect(actions[1]).toEqual(notify('사용하실 수 있는 아이디입니다!'));
      });
    });

    context('when ID is duplicated', () => {
      it('calls updateDuplicate action and notify', async () => {
        (confirmDuplicateId as jest.Mock).mockResolvedValue({ duplicate: true });

        await store.dispatch(requestConfirmDuplicateId('marketkurly12'));

        const actions = store.getActions();

        expect(actions[0]).toEqual(updateDuplicate(true));
        expect(actions[1]).toEqual(notify('이미 존재하는 아이디입니다.'));
      });
    });
  });

  describe('requestKakaoAccountInfomation', () => {
    it('calls initialSignupForm action', async () => {
      await store.dispatch(
        requestKakaoAccountInfomation({
          provider: 'kakao',
        }),
      );

      const actions = store.getActions();

      expect(actions[0]).toEqual(initialSignupForm(mockInitialSignupForm));
      expect(actions[1]).toEqual(updateDuplicate(false));
    });
  });
});
