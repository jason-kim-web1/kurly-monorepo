import { GetServerSideProps } from 'next';

import { AxiosError } from 'axios';

import MyKurlyFarmContainer from '../../../../src/games/my-kurly-farm/m/containers/MyKurlyFarmContainer';
import { getWebViewInjectedAccessToken } from '../../../../src/server/webview';
import { extractAuthentication } from '../../../../src/shared/utils/token';
import { AesEncrypt } from '../../../../src/server/aes256';
import { MyKurlyFarmReportError } from '../../../../src/games/my-kurly-farm/shared/utils/MyKurlyFarmReportError';
import { getInternalMemberInfo } from '../../../../src/shared/api/checkout/internal/member';
import { getInternalKurlylogUserInfo } from '../../../../src/shared/api/kurlylog/internal/kurlylog';
import { getInternalSubscriptionMembers } from '../../../../src/shared/api/membership/internal/membership.api';

export default MyKurlyFarmContainer;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = getWebViewInjectedAccessToken(context);
  const userAgent = context.req?.headers['user-agent'];
  let refreshToken = false;

  if (accessToken) {
    const decodedToken = extractAuthentication(accessToken);

    if (decodedToken.isGuest) {
      MyKurlyFarmReportError(
        {
          reason: 'AccessToken이 GuestToken입니다',
          accessToken,
        },
        userAgent,
      );

      return {
        props: {
          isGuest: decodedToken.isGuest,
          ...(context.query.recomId && { encryptRecomId: context.query.recomId }),
        },
      };
    }

    let memberId = decodedToken.memberId;
    let memberNo = decodedToken.memberNo;

    if (!memberId || !memberNo) {
      try {
        const memberInfo = await getInternalMemberInfo(accessToken);

        if (memberInfo?.member_id && memberInfo?.member_no) {
          memberId = memberInfo.member_id;
          memberNo = memberInfo.member_no.toString();
        }
      } catch (err) {
        if ((err as AxiosError).response?.status === 401) {
          refreshToken = true;
        } else {
          MyKurlyFarmReportError(
            {
              reason: 'Member API Error',
              accessToken,
              err: JSON.stringify(err),
            },
            userAgent,
          );
        }
      }
    }

    if (memberId && memberNo) {
      const encryptMemberId = AesEncrypt(memberId);
      const encryptMemberNo = AesEncrypt(memberNo.toString());
      let encryptKurlylogUserId;
      let kurlylogNickname;
      let kurlylogImageUrl;
      let subscriptionStatus;

      try {
        const kurlylogUserInfo = await getInternalKurlylogUserInfo(accessToken);

        if (kurlylogUserInfo?.id) {
          encryptKurlylogUserId = AesEncrypt(kurlylogUserInfo.id);
        }
        kurlylogNickname = kurlylogUserInfo?.nickname;
        kurlylogImageUrl = kurlylogUserInfo?.image_url;
      } catch (err) {
        if ((err as AxiosError).response?.status === 401) {
          refreshToken = true;
        } else {
          MyKurlyFarmReportError(
            {
              reason: 'Kurlylog API Error',
              accessToken,
              err: JSON.stringify(err),
            },
            userAgent,
          );
        }
      }

      try {
        const subscriptionMembers = await getInternalSubscriptionMembers(accessToken);

        if (subscriptionMembers?.subscriptionStatus) {
          subscriptionStatus = subscriptionMembers.subscriptionStatus;
        }
      } catch (err) {
        if ((err as AxiosError).response?.status === 401) {
          refreshToken = true;
        } else {
          MyKurlyFarmReportError(
            {
              reason: 'Membership API Error',
              accessToken,
              err: JSON.stringify(err),
            },
            userAgent,
          );
        }
      }

      const props = {
        memberId,
        encryptMemberId,
        encryptMemberNo,
        ...(context.query.recomId && { encryptRecomId: context.query.recomId }),
        ...(encryptKurlylogUserId && { encryptKurlylogUserId }),
        ...(kurlylogNickname && { kurlylogNickname }),
        ...(kurlylogImageUrl && { kurlylogImageUrl }),
        ...(subscriptionStatus && { subscriptionStatus }),
        refreshToken,
      };

      return {
        props,
      };
    }

    MyKurlyFarmReportError(
      {
        reason: 'Member 정보가 없습니다',
        accessToken,
      },
      userAgent,
    );
  }

  refreshToken = true;

  const props = {
    refreshToken,
    ...(context.query.recomId && { encryptRecomId: context.query.recomId }),
  };

  return {
    props,
  };
};
