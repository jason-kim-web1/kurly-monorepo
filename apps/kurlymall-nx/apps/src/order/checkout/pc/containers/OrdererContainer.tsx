import MemberOrdererInfo from '../components/MemberOrdererInfo';
import LoadingOrderer from '../components/Loading/LoadingOrderer';
import useCheckoutOrderer from '../../shared/hooks/useCheckoutOrderer';

export default function OrdererContainer() {
  const { isLoading, isError, data } = useCheckoutOrderer();

  if (isLoading || isError || !data) {
    return <LoadingOrderer />;
  }

  return (
    <MemberOrdererInfo
      receiverInfo={{
        name: data.name,
        phone: data.phone,
        email: data.email,
      }}
    />
  );
}
