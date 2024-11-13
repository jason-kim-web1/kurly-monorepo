import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';
import { Alert } from '@thefarmersfront/kpds-react';

import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import { isEmpty } from 'lodash';

import { RoundSection } from '../shared/styled';
import { useAppSelector } from '../../../shared/store';
import ArrowUp14x8 from '../../../shared/components/icons/svg/ArrowUp14x8';
import useToggle from '../../../order/checkout/shared/hooks/useToggle';
import CurrentBenefits from './CurrentBenefits';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import { MYPAGE_PATH } from '../../../shared/constant';
import { redirectTo } from '../../../shared/reducers/page';
import SlideToggleContent from '../../../shared/components/motion/SlideToggleContent';
import { fadeOutAnimation, slideArrowIconStyle } from '../../../shared/styles/motions/common/common';
import TooltipArrow from '../../../shared/components/icons/svg/TooltipArrow';
import { checkBrowserEnvironment } from '../../../shared/utils/checkBrowserEnvironment';
import InfoAlertContent from './InfoAlertContent';
import { useMyBenefitInfo } from '../hooks/useMyBenefitQuery';
import InfoIcon18x18 from '../../../shared/components/icons/svg/InfoIcon18x18';

const AUTO_CLOSE_TIME = 5000;

const TopAreaWrapper = styled.div`
  color: ${vars.color.$white};
  background-color: ${vars.color.member.$members};
  border-radius: 16px 16px 0 0;
`;

const BenefitBox = styled.div`
  display: flex;
  padding: ${vars.spacing.$20} ${vars.spacing.$16} ${vars.spacing.$16} ${vars.spacing.$16};
  justify-content: space-between;
`;

const BenefitInfo = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

const BenefitAmount = styled.div`
  min-height: 26px;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;

  @media (max-width: 342px) {
    padding-right: 7vw;
  }
`;

const BenefitInfoButton = styled.button`
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  margin-left: 6px;
`;

const ChangeButtonWrapper = styled.div`
  position: relative;
`;

const BenefitChangeButton = styled.button`
  width: 76px;
  height: 32px;
  font-weight: 600;
  line-height: 32px;
  border-radius: 6px;
  background-color: #029ec1;
  color: ${vars.color.$white};
`;

const ToggleWrapper = styled.div`
  overflow: hidden;
  border-radius: 0 0 16px 16px;
  background-color: ${vars.color.$white};
  color: ${vars.color.text.$primary};
`;

const ToggleButton = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: ${vars.color.member.$members};
  color: ${vars.color.$white};

  .button-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    span {
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
    }
  }

  .arrow-icon {
    height: 24px;

    svg {
      transform: rotate(-180deg);
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 16px;
    right: 16px;
    height: 1px;
    opacity: 0.2;
    background-color: ${vars.color.$white};
    content: '';
  }
`;

const TooltipLayer = styled.div<{
  autoCloseTime?: number;
}>`
  position: absolute;
  top: -36px;
  right: -16px;
  padding: ${vars.spacing.$6} ${vars.spacing.$10};
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  background-color: ${vars.color.main.$secondary};
  color: ${vars.color.text.$inverse};
  white-space: nowrap;

  ${({ autoCloseTime }) =>
    autoCloseTime &&
    css`
      animation: ${fadeOutAnimation} 0.3s forwards;
      animation-delay: ${autoCloseTime / 1000}s;
    `};

  > svg {
    position: absolute;
    bottom: -6px;
    right: 32px;
  }
`;

declare global {
  interface Window {
    MEMBERSHIP_FINISH_AND_REFRESH?: () => void;
  }
}

export default function MyHeader() {
  const { selectedBenefit, providedBenefit } = useAppSelector(({ myMembership }) => ({
    selectedBenefit: myMembership.selectedBenefit,
    providedBenefit: myMembership.providedBenefit,
  }));

  const dispatch = useDispatch();

  const { isOpen, toggle } = useToggle(true);

  const { data: myBenefitInfo } = useMyBenefitInfo();

  const isCoreBenefit = providedBenefit.benefitOptionName === '코어';

  const goToCouponPackChange = useCallback(() => {
    if (isWebview()) {
      appService.openWebview({
        url: `${window.location.origin}${MYPAGE_PATH.couponpack.uri}`,
        title: '컬리멤버스 쿠폰팩 변경',
      });
      return;
    }

    dispatch(redirectTo({ url: MYPAGE_PATH.couponpack.uri }));
  }, [dispatch]);

  const couponPackFinishAndRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }

    window.MEMBERSHIP_FINISH_AND_REFRESH = couponPackFinishAndRefresh;
    return () => {
      delete window.MEMBERSHIP_FINISH_AND_REFRESH;
    };
  }, []);

  if (!myBenefitInfo || isEmpty(myBenefitInfo)) {
    return null;
  }

  const handleClickInfo = () => {
    Alert({
      contents: <InfoAlertContent myBenefitInfo={myBenefitInfo} />,
      confirmButtonTitle: '확인',
      allowOutsideClick: true,
    });
  };

  return (
    <RoundSection className="header">
      <TopAreaWrapper>
        <BenefitBox>
          <BenefitInfo>
            이달의 멤버스 혜택은
            <BenefitAmount>
              {myBenefitInfo.value}
              <BenefitInfoButton onClick={handleClickInfo}>
                <InfoIcon18x18 />
              </BenefitInfoButton>
            </BenefitAmount>
          </BenefitInfo>
          <ChangeButtonWrapper>
            <BenefitChangeButton onClick={goToCouponPackChange}>혜택 변경</BenefitChangeButton>
            {isCoreBenefit ? (
              <TooltipLayer autoCloseTime={AUTO_CLOSE_TIME}>
                더 좋은 혜택 받아보기
                <TooltipArrow />
              </TooltipLayer>
            ) : null}
          </ChangeButtonWrapper>
        </BenefitBox>
      </TopAreaWrapper>
      <ToggleWrapper>
        <ToggleButton onClick={toggle}>
          <div className="button-text">
            {`이용중인 ${providedBenefit.benefitOptionName} 혜택`}
            {providedBenefit.benefitOptionName !== selectedBenefit.benefitOptionName && (
              <span>{`다음 회차부터 [${selectedBenefit.benefitOptionName}] 쿠폰팩 지급 예정`}</span>
            )}
          </div>
          <div className="arrow-icon" css={slideArrowIconStyle(isOpen)}>
            <ArrowUp14x8 stroke={vars.color.$white} strokeWidth={2} width={14} height={24} />
          </div>
        </ToggleButton>
        <SlideToggleContent opened={isOpen}>
          <CurrentBenefits />
        </SlideToggleContent>
      </ToggleWrapper>
    </RoundSection>
  );
}
