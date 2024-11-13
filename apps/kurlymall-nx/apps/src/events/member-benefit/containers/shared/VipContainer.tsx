import ContentTopInfo from '../../components/shared/ContentTopInfo';
import Loading from '../../../../shared/components/Loading/Loading';
import VipTabMenu from '../../components/shared/VipTabMenu';
import { useVipBenefitInfo } from '../../hooks/useVipBenefitQuery';
import { Section } from '../../shared/styled';
import { CLASS_NAME_DEVICE } from '../../../../mypage/membership/shared/constants';
import VipNotice from '../../components/shared/VipNotice';
import VipSelectionCroteria from '../../components/shared/VipSelectionCroteria';

export default function VipContainer() {
  const { isLoading, vipBenefit } = useVipBenefitInfo();

  if (isLoading || !vipBenefit) {
    return <Loading />;
  }

  return (
    <>
      <ContentTopInfo title={vipBenefit.title} description={vipBenefit.description} />
      <Section className={CLASS_NAME_DEVICE}>
        <VipSelectionCroteria selectionCriteria={vipBenefit.selectionCriteria} />
        <VipTabMenu tabs={vipBenefit.tabs} />
        <VipNotice notice={vipBenefit.notice} />
      </Section>
    </>
  );
}
