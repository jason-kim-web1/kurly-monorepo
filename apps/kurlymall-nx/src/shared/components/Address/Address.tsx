import dynamic from 'next/dynamic';

import { AddressData } from 'react-daum-postcode';

import { refinementAddress } from '../../utils/shipping-address';
import { DeliveryProps } from '../../interfaces/ShippingAddress';

const DaumPostcode = dynamic(() => import('react-daum-postcode'), {
  ssr: false,
});

export default function Address({ onSubmit }: { onSubmit: (result: DeliveryProps) => void }) {
  const onComplete = (data: AddressData) => {
    const requestBody: DeliveryProps = refinementAddress(data);
    onSubmit(requestBody);
  };

  return <DaumPostcode height="100%" onComplete={onComplete} />;
}
