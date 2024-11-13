import { useDispatch } from 'react-redux';

import ContentTopInfo from '../../components/shared/ContentTopInfo';
import Loading from '../../../../shared/components/Loading/Loading';
import { Section, BottomArea } from '../../shared/styled';
import { useMembersBenefitInfo } from '../../hooks/useMembersBenefitQuery';
import { CLASS_NAME_DEVICE } from '../../../../mypage/membership/shared/constants';
import { redirectTo } from '../../../../shared/reducers/page';
import { MEMBERSHIP_PATH } from '../../../../shared/constant';
import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../shared/services/app.service';
import MembersDefaultBenefit from '../../components/shared/MembersDefaultBenefit';
import MembersCouponPack from '../../components/shared/MembersCouponPack';
import ShareBenefit from '../../components/shared/ShareBenefit';

export default function MembersContainer() {
  const dispatch = useDispatch();

  const { isLoading, membersBenefit } = useMembersBenefitInfo();

  if (isLoading || !membersBenefit) {
    return <Loading />;
  }

  const handleClickMembers = () => {
    if (isWebview()) {
      appService.openWebview({
        url: `${window.location.origin}${MEMBERSHIP_PATH.membership.uri}`,
        is_modal: false,
      });
      return;
    }
    dispatch(
      redirectTo({
        url: MEMBERSHIP_PATH.membership.uri,
      }),
    );
  };

  return (
    <>
      <ContentTopInfo title={membersBenefit.title} description={membersBenefit.description} />
      <Section className={CLASS_NAME_DEVICE}>
        <MembersDefaultBenefit defaultBenefit={membersBenefit.defaultBenefit} />
        <MembersCouponPack couponPack={membersBenefit.couponPack} caution={membersBenefit.caution} />
      </Section>
      <ShareBenefit shared={membersBenefit.shared} />
      <BottomArea className={CLASS_NAME_DEVICE}>
        <button onClick={handleClickMembers}>{membersBenefit.buttonText}</button>
      </BottomArea>
    </>
  );
}
