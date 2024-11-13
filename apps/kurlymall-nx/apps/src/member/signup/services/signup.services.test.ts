import {
  requestLinkableAccounts,
  linkKakaoAccount,
  kakaoLogin,
  kakaoAccountInfomation,
  simpleSignup,
} from './signup.services';

import { extractAuthentication } from '../../../shared/utils/token';

jest.mock('../../../shared/api/member-auth/link-kakao-account');
jest.mock('../../../shared/api/member-auth/signup');
jest.mock('../../../shared/utils/token');

describe('Kakaosync signup service', () => {
  describe('requestLinkableAccouts', () => {
    it('returns matchingData and members', async () => {
      const { matchingData, members } = await requestLinkableAccounts({
        provider: 'kakao',
        socialLoginToken: 'abcde',
      });

      expect(matchingData).toBe('010-9411-****');
      expect(members.length > 0).toBe(true);
      expect(members[0].id).toBe('marketkurl***');
    });
  });

  describe('linkKakaoAccount', () => {
    it('returns nothing', async () => {
      await linkKakaoAccount({
        provider: 'kakao',
        socialLoginToken: 'abcde',
        form: {
          memberNo: '1',
          password: 'asdqwe1234',
        },
      });
    });
  });

  describe('kakaoLogin', () => {
    const authData = {
      uid: '1234',
    };

    beforeEach(() => {
      (extractAuthentication as jest.Mock).mockReturnValue(authData);
    });

    it('returns auth data', async () => {
      const data = await kakaoLogin({
        provider: 'kakao',
        socialLoginToken: 'abcde',
      });

      expect(data.uid).toEqual(authData.uid);
    });
  });

  describe('kakaoAccountInfomation', () => {
    it('returns user account infomation', async () => {
      const { id, name, addressInfomation } = await kakaoAccountInfomation({
        provider: 'kakao',
        socialLoginToken: 'abcde',
      });

      expect(id).toBe('marketkurly123');
      expect(name).toBe('마켓컬리');
      expect(addressInfomation.roadAddress).toBe('한국타이어빌딩 15층');
    });
  });

  describe('simpleSignup', () => {
    it('returns nothing', async () => {
      const signupForm = {
        id: '',
        name: '',
        password: '',
        passwordConfirm: '',
        addressInfomation: {
          roadAddress: '',
          lotNumberAddress: '',
          zipCode: '',
          zoneCode: '',
          addressDetail: '',
        },
        recommender: '',
        eventName: '',
      };

      await simpleSignup({
        provider: 'kakao',
        socialLoginToken: 'abcde',
        form: signupForm,
        device: 'MW',
      });
    });
  });
});
