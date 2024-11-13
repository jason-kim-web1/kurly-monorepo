import styled from '@emotion/styled';

import { LOVERS_BENEFIT_CAUTION, LOVERS_TOP_INFO } from '../../constants';

import { useLoversBenefitInfo } from '../../hooks/useLoversBenefitQuery';

import ContentTopInfo from '../../components/shared/ContentTopInfo';
import ThePurpleGift from '../../components/pc/ThePurpleGift';
import MemberBenefitNav from '../../components/pc/MemberBenefitNav';
import LoversGradeBenefit from '../../components/pc/LoversGradeBenefit';
import LoversBenefitCaution from '../../components/pc/LoversBenefitCaution';
import BenefitShareButton from '../../components/shared/BenefitShareButton';
import LoversInfoBox from '../../components/shared/LoversInfoBox';
import useLoversClose from '../../hooks/useLoversClose';

const Container = styled.div`
  min-width: 1050px;
  padding-bottom: 100px;
`;

const LoversTopWrap = styled.div`
  width: 780px;
  margin: 0 auto;
`;

export default function LoversContainer() {
  const { isLoading, loversBenefitInfo, isGiftHistoryEmpty, updateDate } = useLoversBenefitInfo();

  useLoversClose(isLoading);

  if (isLoading || !loversBenefitInfo) {
    return null;
  }

  return (
    <Container>
      <MemberBenefitNav />
      <LoversTopWrap>
        <ContentTopInfo title={LOVERS_TOP_INFO.title} description={LOVERS_TOP_INFO.text} />
        <LoversInfoBox />
      </LoversTopWrap>
      <LoversGradeBenefit
        gradeBenefit={loversBenefitInfo.gradeBenefit}
        gradeBenefitTerms={loversBenefitInfo.gradeBenefitTerms}
      />
      <ThePurpleGift loversBenefitInfo={loversBenefitInfo} />
      <LoversBenefitCaution
        isGiftHistoryEmpty={isGiftHistoryEmpty}
        updateDate={updateDate}
        loversCaution={LOVERS_BENEFIT_CAUTION}
      />
      <BenefitShareButton titleMarginBottom={25} titleFontSize={18} iconSize={68} iconMargin={'0 7px'} />
    </Container>
  );
}
