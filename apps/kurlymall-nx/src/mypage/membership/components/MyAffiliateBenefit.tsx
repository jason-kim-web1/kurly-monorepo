import styled from '@emotion/styled';

import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { isEmpty } from 'lodash';

import { redirectTo } from '../../../shared/reducers/page';
import { MEMBERSHIP_PATH } from '../../../shared/constant';
import { useAppSelector } from '../../../shared/store';
import copyLink from '../../../shared/utils/copyLink';
import { loadMemberLoading } from '../../../shared/reducers/member';
import useAffiliateBenefitQuery from '../hooks/useAffiliateBenefitQuery';
import Loading from '../../../shared/components/Loading/Loading';
import { loadMyMembership } from '../shared/membership.slice';
import Confirm, { defaultSwalStyle } from '../../../shared/components/Alert/Confirm';
import Alert from '../../../shared/components/Alert/Alert';
import COLOR from '../../../shared/constant/colorset';
import NextImage from '../../../shared/components/NextImage';
import { ArrowRight } from '../../../shared/icons';
import { getAppVersion, isAos, isPC, isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import { NoProductImageLogo } from '../../../shared/images';
import Copy from '../../../shared/icons/Copy';
import Info from '../../../shared/icons/Info';
import { AFFILILATE_BENEFIT_NOTICE, AFFILILATE_BENEFIT_TITLE } from '../../../member/membership/shared/constants';
import { AffiliateBenefitType } from '../../../shared/api/membership/api.type';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectMembershipPartnerBenefitsDetail } from '../../../shared/amplitude/events/membership/SelectMembershipPartnerBenefitsDetail';
import { SelectMembership } from '../../../shared/amplitude/events/membership';

const TopInfo = styled.div`
  padding: 24px 20px;
  font-weight: 400;
  line-height: 20px;
  color: ${COLOR.kurlyGray600};
`;

const Title = styled.h2`
  margin-bottom: 8px;
  font-weight: ${isPC ? 500 : 600};
  font-size: 24px;
  line-height: 32px;
  color: ${COLOR.kurlyGray800};
`;

const BenefitList = styled.div`
  padding: 0 20px 24px;
`;

const BenefitItem = styled.div`
  overflow: hidden;
  position: relative;
  padding: 16px 0;
  border-top: 1px solid ${COLOR.bg};

  &:first-of-type {
    border-top: 0;
  }
`;

const BenefitBannerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;

  & > svg {
    min-width: 20px;
    height: 50px;
  }
`;

const BenefitBanner = styled.button(BenefitBannerStyle);

const BenefitBannerText = styled.div(BenefitBannerStyle);

const UpdateInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-weight: 400;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.9);
`;

const ContentWrap = styled.div`
  display: flex;
`;

const ImageWrap = styled.div`
  overflow: hidden;
  min-width: 50px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${COLOR.kurlyWhite};
`;

const BenefitContent = styled.div`
  padding: 0 16px;
  font-weight: 400;
  line-height: 20px;
  word-break: break-all;
  color: ${COLOR.kurlyGray450};
`;

const BenefitTitle = styled.div`
  margin-bottom: 4px;
  font-weight: ${isPC ? 500 : 600};
  font-size: 18px;
  line-height: 26px;
  color: ${COLOR.kurlyGray800};
`;

const ContentItem = styled.li`
  display: flex;
  align-items: flex-start;

  &::before {
    margin-right: 4px;
    content: '-';
  }
`;

const BenefitCoupon = styled.div`
  display: flex;
  min-height: 48px;
  margin: 16px 0 0 66px;
  padding: 15px 0 15px 16px;
  line-height: 18px;
  border-radius: 6px;
  background-color: ${COLOR.kurlyGray100};
`;

const CouponNumber = styled.div`
  width: 100%;
  font-weight: ${isPC ? 500 : 600};
  font-size: 13px;
  color: ${COLOR.kurlyGray600};
  word-break: break-all;
`;

const CopyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 72px;
  font-weight: ${isPC ? 500 : 600};
  color: ${COLOR.kurlyGray600};

  > svg {
    margin-right: 4px;
  }
`;

const BenefitAlert = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  text-align: left;

  ${isPC &&
  css`
    .tit-info {
      display: block;
      margin-top: -16px;
    }
    .txt-info {
      text-align: center;
    }
  `};

  > strong {
    display: block;
    margin-bottom: ${isPC ? 24 : 16}px;
    font-weight: ${isPC ? 500 : 600};
    font-size: 18px;
  }
  .info {
    display: flex;
    padding-top: ${isPC ? 16 : 8}px;
    font-size: 12px;
    line-height: 16px;
    word-break: keep-all;
    color: ${COLOR.kurlyGray600};

    > svg {
      margin-right: 4px;
    }
  }
`;

const BenefitNotice = styled.ul`
  padding: 0 20px 20px;

  > li {
    display: flex;
    margin-bottom: 4px;
    font-weight: 400;
    line-height: 19px;
    color: ${COLOR.kurlyGray450};
  }

  > li::before {
    min-width: 3px;
    height: 3px;
    margin: 7px 10px 0 0;
    border-radius: 100%;
    background-color: ${COLOR.kurlyGray350};
    content: '';
  }
`;

const buttonStylePC = `
  .swal2-html-container > div:last-of-type {
    margin-top: 30px;
    padding-bottom: 0;
  }
`;

const buttonStyleMo = `
  .swal2-html-container > div:last-of-type {
    flex-direction: column-reverse;
    margin-top: 24px;
  }
  .action-button {
    height: 48px;
    font-size: 15px;
    border-radius: 6px;
  }
  .action-button:last-of-type {
    margin-bottom: 4px;
  }
`;

const popupStylePC = `
  .swal2-popup {
    max-width: 440px;
    padding: 30px;
  }
  .swal2-content {
    padding: 0;
  }
`;

export default function MyAffiliateBenefit() {
  const dispatch = useDispatch();

  const router = useRouter();

  const { isSubscribed, canUseAffiliateBenefits } = useAppSelector(({ member }) => ({
    isSubscribed: member.subscription.isSubscribed,
    canUseAffiliateBenefits: member.subscription.hasAffiliateBenefits,
  }));

  const { loading, startAffiliateDate, endAffiliateDate } = useAppSelector(({ myMembership }) => ({
    loading: myMembership.loading,
    startAffiliateDate: myMembership.startAffiliateDate,
    endAffiliateDate: myMembership.endAffiliateDate,
  }));

  const { affiliateBenefits, refetch } = useAffiliateBenefitQuery();

  const [isAffiliateBenefitsEmpty, setIsAffiliateBenefitsEmpty] = useState(false);

  const memberLoading = useAppSelector(loadMemberLoading);

  const isAccessVersion = (userVer: string, compareVer: string) => {
    return userVer.localeCompare(compareVer, undefined, { numeric: true }) !== -1;
  };

  const handleClickBack = useCallback(() => {
    if (isWebview()) {
      appService.closeWebview();
      return;
    }
    router.back();
  }, [router]);

  const handleClickLanding = (affiliateId: string, url: string) => {
    amplitudeService.logEvent(new SelectMembershipPartnerBenefitsDetail({ partner_id: affiliateId }));

    const compareAosVersion = '3.10.2';
    if (isWebview() && isAos && !isAccessVersion(getAppVersion(), compareAosVersion)) {
      Alert({ text: '최신 버전으로 업데이트 하시면 이용하실 수 있습니다.' });
      return;
    }
    window.open(url, '_blank');
  };

  const renderContent = useCallback((content: string[]) => {
    if (content.length > 1) {
      return (
        <ul>
          {content.map((data, index) => (
            <ContentItem key={`benefit-content-${index}`}>{data}</ContentItem>
          ))}
        </ul>
      );
    }
    return content;
  }, []);

  const renderBenefitInfo = useCallback(
    (imgUrl: string, title: string, content: string[]) => {
      return (
        <>
          <ContentWrap>
            <ImageWrap>
              <NextImage src={imgUrl || NoProductImageLogo} alt={title} width={50} height={50} objectFit="contain" />
            </ImageWrap>
            <BenefitContent>
              <BenefitTitle>{title}</BenefitTitle>
              {renderContent(content)}
            </BenefitContent>
          </ContentWrap>
          <ArrowRight width={16} height={16} stroke={COLOR.kurlyGray450} />
        </>
      );
    },
    [renderContent],
  );

  useEffect(() => {
    if (memberLoading) {
      return;
    }

    if (canUseAffiliateBenefits) {
      dispatch(loadMyMembership());
      refetch().then((data) => {
        setIsAffiliateBenefitsEmpty(isEmpty(data.data));

        if (isAffiliateBenefitsEmpty) {
          Alert({
            text: `이달의 제휴 혜택이 업데이트 중입니다.\n잠시만 기다려주세요!`,
          }).then(() => {
            handleClickBack();
          });
        }
      });
      return;
    }
  }, [dispatch, handleClickBack, canUseAffiliateBenefits, isAffiliateBenefitsEmpty, memberLoading, refetch]);

  useEffect(() => {
    if (memberLoading || canUseAffiliateBenefits) {
      return;
    }

    if (isSubscribed) {
      Alert({
        contents: (
          <BenefitAlert>
            <strong className="tit-info">컬리멤버스 제휴 혜택 제공 안내</strong>
            <p className="txt-info">컬리멤버스 이용 기간 시작일 다음날부터 제휴 혜택을 이용할 수 있어요.</p>
          </BenefitAlert>
        ),
      }).then(() => {
        handleClickBack();
      });
      return;
    }
  }, [handleClickBack, canUseAffiliateBenefits, isSubscribed, memberLoading]);

  useEffect(() => {
    if (memberLoading || canUseAffiliateBenefits || isSubscribed) {
      return;
    }

    const handleClickSubmit = () => {
      amplitudeService.logEvent(new SelectMembership({ selection_type: 'members_partner_benefits' }));
      dispatch(redirectTo({ url: MEMBERSHIP_PATH.membership.uri }));
    };

    Confirm({
      contents: (
        <BenefitAlert>
          <strong>제휴혜택 제공 대상자가 아닙니다.</strong>
          <p>컬리멤버스에 가입하면 매월 다양한 제휴 혜택을 즐길 수 있어요.</p>
          <p className="info">
            <Info width={16} height={16} />
            컬리멤버스 가입 후 다음날부터 제휴 혜택을 이용할 수 있어요.
          </p>
        </BenefitAlert>
      ),
      leftButtonText: '닫기',
      rightButtonText: '컬리멤버스 가입하기',
      showRightButton: true,
      buttonStyle: `${isPC ? buttonStylePC : buttonStyleMo}`,
      swalStyle: `${isPC ? popupStylePC : defaultSwalStyle}`,
      onClickLeftButton: handleClickBack,
      onClickRightButton: handleClickSubmit,
      allowOutsideClick: false,
    });
  }, [dispatch, handleClickBack, canUseAffiliateBenefits, isSubscribed, memberLoading]);

  if (loading || memberLoading) {
    return <Loading testId="loading" />;
  }

  if (!canUseAffiliateBenefits || isAffiliateBenefitsEmpty) {
    return null;
  }

  return (
    <>
      <TopInfo>
        <Title>{AFFILILATE_BENEFIT_TITLE}</Title>
        {`${startAffiliateDate} - ${endAffiliateDate}`}
      </TopInfo>
      <BenefitList>
        {affiliateBenefits?.map(({ affiliateId, benefitType, imgUrl, title, content, redirectLink, couponNumber }) => (
          <BenefitItem key={title}>
            {couponNumber ? (
              <>
                <BenefitBanner
                  onClick={() =>
                    handleClickLanding(
                      affiliateId,
                      benefitType === AffiliateBenefitType.LINK_RANDOM_NUMBER ? couponNumber : redirectLink,
                    )
                  }
                >
                  {renderBenefitInfo(imgUrl, title, content)}
                </BenefitBanner>

                {benefitType === AffiliateBenefitType.NUMBER && (
                  <BenefitCoupon>
                    <CouponNumber>{couponNumber}</CouponNumber>
                    <input type="hidden" value={couponNumber} />
                    <CopyButton
                      type="button"
                      onClick={() =>
                        copyLink({
                          link: couponNumber,
                          successCopyLinkText: '혜택 정보가 복사되었습니다.',
                        })
                      }
                    >
                      <Copy />
                      복사
                    </CopyButton>
                  </BenefitCoupon>
                )}
              </>
            ) : (
              <BenefitBannerText>
                {renderBenefitInfo(imgUrl, title, content)}
                <UpdateInfo>업데이트 중입니다.</UpdateInfo>
              </BenefitBannerText>
            )}
          </BenefitItem>
        ))}
      </BenefitList>
      <BenefitNotice>
        {AFFILILATE_BENEFIT_NOTICE.map((data, index) => (
          <li key={`benefit-notice${index}`}>{data}</li>
        ))}
      </BenefitNotice>
    </>
  );
}
