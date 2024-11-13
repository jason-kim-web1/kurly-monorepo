import {
  postInterlinkableAccount,
  postLinkKakaoAccount,
  postKakaoLogin,
  postKakaoAccountInfomation,
  postSimpleSignup,
  readMemberDuplicationStatus,
} from '../../../shared/api';
import { DuplicationKeys } from '../../../shared/interfaces';
import { extractAuthentication } from '../../../shared/utils/token';
import { LinkForm, SignupForm } from '../interfaces';

export const requestLinkableAccounts = async (params: { provider: string; socialLoginToken: string }) => {
  const member = await postInterlinkableAccount(params);

  return {
    ...member,
    members: member.members.map((it) => ({
      id: it.memberId,
      number: it.memberNo.toString(),
    })),
  };
};

export const linkKakaoAccount = (params: { provider: string; socialLoginToken: string; form: LinkForm }) =>
  postLinkKakaoAccount(params);

export const kakaoLogin = async (params: { provider: string; socialLoginToken: string }) => {
  const { data } = await postKakaoLogin(params);

  const { uid } = extractAuthentication(data.accessToken);

  return {
    accessToken: data.accessToken,
    uid,
    isGuest: false,
  };
};

export const confirmDuplicateId = async (id: string) => {
  const { isDuplicated } = await readMemberDuplicationStatus({
    key: DuplicationKeys.MEMBER_ID,
    value: id,
  });

  return {
    duplicate: isDuplicated,
  };
};

export const kakaoAccountInfomation = async (params: { provider: string; socialLoginToken: string }) => {
  const data = await postKakaoAccountInfomation(params);

  return {
    id: data.memberId ?? '',
    name: data.name ?? '',
    addressInfomation: {
      roadAddress: data.addressInfo.roadAddress,
      lotNumberAddress: data.addressInfo.address,
      zipCode: data.addressInfo.zipCode,
      zoneCode: data.addressInfo.zoneCode,
      addressDetail: data.addressInfo.addressDetail,
    },
  };
};

export const simpleSignup = (params: {
  provider: string;
  socialLoginToken: string;
  form: SignupForm;
  device: string;
}) => postSimpleSignup(params);
