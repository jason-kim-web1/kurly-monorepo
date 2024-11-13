import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { showLoading, hideLoading, showAlert } from '../../../shared/reducers/page';

import reducer, {
  clear,
  clearStatus,
  exceedFindIdVerificationCount,
  exceedFindPasswordVerificationCount,
  expiredToken,
  initialState,
  requestToSendMembersByEmail,
  requestVerificationNumber,
  requestVerificationNumberWithId,
  selectTab,
  sentVerificationNumber,
  sentVerificationNumberWithId,
  submitFindIdByEmail,
  submitFindIdByPhone,
  submitFindPasswordByEmail,
  submitFindPasswordByPhone,
  submitPasswordResetForm,
  successFindIdByEmail,
  successFindIdByPhone,
  successFindPasswordByEmail,
  successFindPasswordByPhone,
  successResetPassword,
  updateEmail,
  updateIdByEmailForm,
  updateToken,
} from './find.slice';

import { findIdByEmail, findIdByPhone, findPasswordByPhone, sendVerificationNumber, resetPassword } from '../services';

const mockStore = configureStore(getDefaultMiddleware());

jest.mock('../services');

describe('find slice', () => {
  const idByEmailForm = {
    name: '홍길동',
    email: 'test@email.com',
  };
  const mockMembers = [
    {
      memberId: 'honggildong***',
      status: 'ACTIVE',
      joinedAt: '2021-09-11T07:04:21.964652',
    },
  ];
  const token = 'abcde';
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let store: MockStoreEnhanced<unknown, any>;

  given('token', () => '');

  beforeEach(() => {
    store = mockStore(() => ({
      find: {
        ...initialState,
        token: given.token,
      },
    }));

    (findIdByEmail as jest.Mock).mockResolvedValue({ members: mockMembers });
    (findIdByPhone as jest.Mock).mockResolvedValue({ members: mockMembers });
    (sendVerificationNumber as jest.Mock).mockResolvedValue('');
    (resetPassword as jest.Mock).mockResolvedValue('');
    (findPasswordByPhone as jest.Mock).mockResolvedValue(token);
  });

  describe('selectTab', () => {
    it('updates with value', () => {
      const { selectedTab } = reducer(initialState, selectTab('이메일 인증'));

      expect(selectedTab).toBe('이메일 인증');
    });
  });

  describe('updateIdByEmailForm', () => {
    it('updates with value', () => {
      const { idByEmail } = reducer(initialState, updateIdByEmailForm(idByEmailForm));

      expect(idByEmail.form).toBe(idByEmailForm);
    });
  });

  describe('updateEmail', () => {
    it('updates with value', () => {
      const { passwordByEmail } = reducer(initialState, updateEmail('test@email.com'));

      expect(passwordByEmail.email).toBe('test@email.com');
    });
  });

  describe('updateToken', () => {
    it('updates with value', () => {
      const state = reducer(initialState, updateToken('abcde'));

      expect(state.token).toBe('abcde');
    });
  });

  describe('successFindIdByEmail', () => {
    it('updates members and state to SUCCESS', () => {
      const { members, idByEmail } = reducer(initialState, successFindIdByEmail(mockMembers));

      expect(members).toEqual(mockMembers);
      expect(idByEmail.status).toEqual('SUCCESS');
    });
  });

  describe('exceedFindIdVerificationCount', () => {
    it('updates status to EXCEED', () => {
      const { idByPhone } = reducer(initialState, exceedFindIdVerificationCount());

      expect(idByPhone.status).toEqual('EXCEED');
    });
  });

  describe('exceedFindPasswordVerificationCount', () => {
    it('updates status to EXCEED', () => {
      const { passwordByPhone } = reducer(initialState, exceedFindPasswordVerificationCount());

      expect(passwordByPhone.status).toEqual('EXCEED');
    });
  });

  describe('expiredToken', () => {
    it('updates tokenStatus to EXPIRED', () => {
      const { tokenStatus } = reducer(initialState, expiredToken());

      expect(tokenStatus).toEqual('EXPIRED');
    });
  });

  describe('clear', () => {
    it('updates to initial state', () => {
      const state = reducer(
        {
          ...initialState,
          idByEmail: {
            status: 'SUCCESS',
            form: {
              name: '',
              email: '',
            },
          },
          idByPhone: {
            status: 'SUCCESS',
          },
        },
        clear(),
      );

      expect(state).toEqual(initialState);
    });
  });

  describe('clearStatus', () => {
    const form = {
      name: '홍길동',
      email: 'test@email.com',
    };

    it('updates to initial state without idByEmail and members', () => {
      const state = reducer(
        {
          ...initialState,
          idByEmail: {
            status: 'SUCCESS',
            form,
          },
          passwordByEmail: {
            status: 'SUCCESS',
            email: 'test@email.com',
          },
          members: mockMembers,
        },
        clearStatus(),
      );

      expect(state.members).toEqual(mockMembers);
      expect(state.idByEmail.form).toEqual(form);
      expect(state.idByEmail.status).toEqual(initialState.idByEmail.status);
      expect(state.members).toEqual(mockMembers);
      expect(state.passwordByEmail.email).toBe('test@email.com');
    });
  });

  describe('successFindPasswordByPhone', () => {
    it('updates token and status to SUCCESS', () => {
      const { passwordByPhone } = reducer(initialState, successFindPasswordByPhone(token));

      expect(passwordByPhone.status).toBe('SUCCESS');
      expect(passwordByPhone.token).toBe(token);
    });
  });

  describe('successFindPasswordByEmail', () => {
    it('updates status to SUCCESS', () => {
      const { passwordByEmail } = reducer(initialState, successFindPasswordByEmail());

      expect(passwordByEmail.status).toBe('SUCCESS');
    });
  });

  describe('successResetPassword', () => {
    it('updates status to SUCCESS', () => {
      const { passwordResetForm } = reducer(initialState, successResetPassword());

      expect(passwordResetForm.status).toBe('SUCCESS');
    });
  });

  describe('sentVerificationNumberWithId', () => {
    it('updates status to SENT and update endTime', () => {
      const { passwordByPhone } = reducer(initialState, sentVerificationNumberWithId());

      expect(passwordByPhone.status).toEqual('SENT');
      expect(passwordByPhone.endTime).not.toBeUndefined();
    });
  });

  describe('submitFindIdByEmail', () => {
    it('calls actions', async () => {
      await store.dispatch(
        submitFindIdByEmail({
          name: '홍길동',
          email: 'test@email.com',
        }),
      );

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(actions[1]).toEqual(updateIdByEmailForm(idByEmailForm));
      expect(actions[2]).toEqual(successFindIdByEmail(mockMembers));
      expect(actions[3]).toEqual(hideLoading());
    });
  });

  describe('submitFindIdByPhone', () => {
    it('calls actions', async () => {
      await store.dispatch(
        submitFindIdByPhone({
          name: '홍길동',
          phone: '01012341234',
          verificationNumber: '',
        }),
      );

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(actions[1]).toEqual(successFindIdByPhone(mockMembers));
      expect(actions[2]).toEqual(hideLoading());
    });
  });

  describe('submitFindPasswordByPhone', () => {
    it('calls actions', async () => {
      await store.dispatch(
        submitFindPasswordByPhone({
          id: 'user',
          phone: '01012341234',
          verificationNumber: '1234567',
        }),
      );

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(actions[1]).toEqual(successFindPasswordByPhone(token));
      expect(actions[2]).toEqual(hideLoading());
    });
  });

  describe('submitFindPasswordByEmail', () => {
    it('calls actions', async () => {
      await store.dispatch(
        submitFindPasswordByEmail({
          id: 'user',
          email: 'user@test.com',
        }),
      );

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(actions[1]).toEqual(updateEmail('user@test.com'));
      expect(actions[2]).toEqual(successFindPasswordByEmail());
      expect(actions[3]).toEqual(hideLoading());
    });
  });

  describe('submitPasswordResetForm', () => {
    it('calls actions', async () => {
      await store.dispatch(submitPasswordResetForm('abcde12345!'));

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(actions[1]).toEqual(successResetPassword());
      expect(actions[2]).toEqual(hideLoading());
    });
  });

  describe('requestVerificationNumber', () => {
    it('calls actions', async () => {
      await store.dispatch(
        requestVerificationNumber({
          name: '홍길동',
          phone: '01012341234',
          verificationNumber: '',
        }),
      );

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(actions[1]).toEqual(sentVerificationNumber());
      expect(actions[2]).toEqual(hideLoading());
    });
  });

  describe('requestToSendMembersByEmail', () => {
    it('calls actions', async () => {
      await store.dispatch(requestToSendMembersByEmail());

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(showAlert.match(actions[1])).toBe(true);
      expect(actions[2]).toEqual(hideLoading());
    });
  });

  describe('requestVerificationNumberWithId', () => {
    it('calls actions', async () => {
      await store.dispatch(
        requestVerificationNumberWithId({
          id: 'user',
          phone: '01012345678',
        }),
      );

      const actions = store.getActions();

      expect(actions[0]).toEqual(showLoading());
      expect(actions[1]).toEqual(sentVerificationNumberWithId());
      expect(actions[2]).toEqual(hideLoading());
    });
  });
});
