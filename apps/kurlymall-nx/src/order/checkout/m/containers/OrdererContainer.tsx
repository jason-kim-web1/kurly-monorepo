import useToggle from '../../shared/hooks/useToggle';
import useCheckoutOrderer from '../../shared/hooks/useCheckoutOrderer';

import Collapse from '../../../../shared/components/Collapse/Collapse';
import { Divider } from '../../../../shared/components/Divider/Divider';
import MemberOrdererInfo from '../components/MemberOrdererInfo';
import LoadingCollapse from '../components/Loading/LoadingCollapse';
import CollapseSummary from '../../../../shared/components/Collapse/CollapseSummary';

export default function OrdererContainer({ isGiftOrder }: { isGiftOrder?: boolean }) {
  const { toggleWithAmplitude, isOpen } = useToggle();
  const { isLoading, isError, data } = useCheckoutOrderer();

  const title = isGiftOrder ? '보내는 분' : '주문자 정보';

  if (isLoading || isError) {
    return (
      <>
        <LoadingCollapse title={title} />
        <Divider />
      </>
    );
  }

  return (
    <>
      <Collapse
        title={title}
        summary={<CollapseSummary text={data?.name} divider=", " suffix={data?.phone} />}
        opened={isOpen}
        onClick={() => toggleWithAmplitude(title)}
      >
        <MemberOrdererInfo
          receiverInfo={{
            name: data?.name ?? '',
            phone: data?.phone ?? '',
            email: data?.email ?? '',
          }}
        />
      </Collapse>
      <Divider />
    </>
  );
}
