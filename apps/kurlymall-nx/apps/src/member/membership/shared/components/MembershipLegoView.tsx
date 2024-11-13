import { useMembersInfo } from '../hooks/useMembersInfo';
import useOpenTerms from '../hooks/useOpenTerms';
import LegoViewComponent from '../../../../lego/components/LegoViewComponent';

export default function MembershipLegoView() {
  const { legoUrl, isLoading } = useMembersInfo();

  const { setIsLegoLoaded } = useOpenTerms();

  return <LegoViewComponent legoUrl={legoUrl} isMetaLoading={isLoading} setIsLegoLoaded={setIsLegoLoaded} />;
}
