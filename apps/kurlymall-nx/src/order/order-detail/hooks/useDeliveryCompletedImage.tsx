import useToggle from '../../checkout/shared/hooks/useToggle';
import useCheckImageURLValid, { IMAGE_VALIDATION_STATUS } from '../../common/hooks/useCheckImageURLValid';
import { DeliveryGroup } from '../../common/interface/DeliveryGroup';

const useDeliveryCompletedImage = (deliveryCompletedImageUrl: DeliveryGroup['deliveryCompletedImageUrl']) => {
  const { isOpen, open, close } = useToggle();
  const { status } = useCheckImageURLValid(deliveryCompletedImageUrl);

  const isValidImageURL = status === IMAGE_VALIDATION_STATUS.success;

  return {
    isValidImageURL,
    isZoomModalOpen: isOpen,
    openZoomModal: open,
    closeZoomModal: close,
  };
};

export default useDeliveryCompletedImage;
