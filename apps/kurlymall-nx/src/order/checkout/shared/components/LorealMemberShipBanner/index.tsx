import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useCallback, useMemo } from 'react';

import COLOR from '../../../../../shared/constant/colorset';
import { isPC, isWebview } from '../../../../../../util/window/getDevice';
import { MemberShipItem } from '../../../../../shared/interfaces';
import { PARTNERS_PATH, getPageUrl } from '../../../../../shared/constant';
import appService from '../../../../../shared/services/app.service';
import { RESOURCE_URL } from '../../../../../shared/configs/config';
import NextImage from '../../../../../shared/components/NextImage';
import { useLorealMemberBrandMapping } from '../../../../../partners/loreal/hooks/useLorealQuery';
import { useAppSelector } from '../../../../../shared/store';
import { redirectTo } from '../../../../../shared/reducers/page';

const Wrapper = styled.div<{ isPc: boolean }>`
  position: relative;
  height: 21vw;
  max-height: 82px;
  overflow: hidden;
  border-radius: ${({ isPc }) => (isPc ? 3 : 6)}px;
  background-color: ${COLOR.bgLightGray};
`;

const LorealMemberShipBanner = ({ membership }: { membership?: MemberShipItem }) => {
  const dispatch = useDispatch();

  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const isAgreeMembership = useMemo(() => membership?.status === 'AGREE', [membership?.status]);
  const { membershipUserKey } = useLorealMemberBrandMapping(!isGuest);
  const handleClickBanner = useCallback(async () => {
    const targetUrl = `${window.location.origin}${PARTNERS_PATH.popup.uri}?userKey=${membershipUserKey}`;
    if (isWebview()) {
      appService.openWebview({
        url: isAgreeMembership ? targetUrl : `${origin}${PARTNERS_PATH.webview.uri}`,
        title: '제휴 멤버십 연동 동의',
        is_modal: true,
      });
      return;
    }
    if (isAgreeMembership) {
      window.open(targetUrl, '_blank', 'noreferrer');
      return;
    }

    dispatch(redirectTo({ url: getPageUrl(PARTNERS_PATH.loreal) }));
  }, [membershipUserKey, isAgreeMembership, dispatch]);

  return (
    <Wrapper isPc={isPC}>
      <button type="button" onClick={handleClickBanner}>
        <NextImage
          src={
            isPC
              ? `${RESOURCE_URL}/kurly/img/2023/loreal_banner_pc.png`
              : `${RESOURCE_URL}/kurly/img/2023/loreal_banner_m.png`
          }
          alt="뷰티컬리 X 마이뷰티박스 멤버십. 가입 후 첫 구매 시 컬리 적립금 3% 추가"
          layout="fill"
          objectFit="contain"
        />
        {/*TODO : 프로모션이 종료되면 아래 이미지로 변경합니다*/}
        {/*<NextImage*/}
        {/*  src={*/}
        {/*    isPC*/}
        {/*      ? `${RESOURCE_URL}/kurly/img/2023/loreal_banner_pc_promotion.png`*/}
        {/*      : `${RESOURCE_URL}/kurly/img/2023/loreal_banner_m_promotion.png`*/}
        {/*  }*/}
        {/*  alt="로레알 X 마이뷰티박스 멤버십. 멤버십 연결하고 포인트 혜택 받아가세요."*/}
        {/*  layout="fill"*/}
        {/*  objectFit="contain"*/}
        {/*/>*/}
      </button>
    </Wrapper>
  );
};

export default LorealMemberShipBanner;
