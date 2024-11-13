import { vars } from '@thefarmersfront/kpds-css';

import NextImage from '../../../../shared/components/NextImage';
import { DeliveryGroup } from '../../../common/interface/DeliveryGroup';

import useDeliveryCompletedImage from '../../hooks/useDeliveryCompletedImage';
import { isPC } from '../../../../../util/window/getDevice';
import DeliveryCompletedImageModal from './DeliveryCompletedImageModal';

interface Props {
  deliveryCompletedImageUrl: DeliveryGroup['deliveryCompletedImageUrl'];
}

const DeliveryCompletedImage = ({ deliveryCompletedImageUrl }: Props) => {
  const { isValidImageURL, isZoomModalOpen, openZoomModal, closeZoomModal } =
    useDeliveryCompletedImage(deliveryCompletedImageUrl);

  if (!isValidImageURL || !deliveryCompletedImageUrl) return null;

  return (
    <>
      <NextImage
        alt="completedDeliveryImage"
        width={isPC ? '48px' : '40px'}
        height={isPC ? '48px' : '40px'}
        style={{ borderRadius: `${vars.radius.$4}`, cursor: 'pointer' }}
        src={deliveryCompletedImageUrl}
        onClick={openZoomModal}
      />
      <DeliveryCompletedImageModal
        isOpen={isZoomModalOpen}
        close={closeZoomModal}
        deliveryCompletedImageUrl={deliveryCompletedImageUrl}
      />
    </>
  );
};

export default DeliveryCompletedImage;
