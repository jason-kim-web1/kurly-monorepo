import { LOVERS_BENEFIT_CAUTION, LOVERS_TOP_INFO } from '../../constants';

import MemberBenefitNav from '../../components/m/MemberBenefitNav';
import ContentTopInfo from '../../components/shared/ContentTopInfo';
import LoversGradeBenefit from '../../components/m/LoversGradeBenefit';
import ThePurpleGift from '../../components/m/ThePurpleGift';
import { useLoversBenefitInfo } from '../../hooks/useLoversBenefitQuery';
import LoversBenefitCaution from '../../components/m/LoversBenefitCaution';
import BenefitShareButton from '../../components/shared/BenefitShareButton';
import LoversInfoBox from '../../components/shared/LoversInfoBox';
import useLoversClose from '../../hooks/useLoversClose';

export default function LoversContainer() {
  const { isLoading, loversBenefitInfo, isGiftHistoryEmpty, updateDate } = useLoversBenefitInfo();

  useLoversClose(isLoading);

  if (isLoading || !loversBenefitInfo) {
    return null;
  }

  return (
    <>
      <MemberBenefitNav />
      <ContentTopInfo title={LOVERS_TOP_INFO.title} description={LOVERS_TOP_INFO.text} />
      <LoversInfoBox />
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
      <BenefitShareButton />
    </>
  );
}
