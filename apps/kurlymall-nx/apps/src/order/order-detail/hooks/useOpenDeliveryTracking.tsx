import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import useBottomSheetDialog from '../../common/hooks/useBottomSheetDialog';
import useFullTypeBottomSheet from '../../common/hooks/useFullTypeBottomSheet';
import { DeliveryGroup } from '../../common/interface/DeliveryGroup';
import { DealProduct } from '../../common/interface/DealProduct';
import { redirectTo } from '../../../shared/reducers/page';
import { MYPAGE_PATH, getPageUrl } from '../../../shared/constant';
import DeliveryTrackingModalContent from '../components/OrderDeliveryGroupList/DeliveryTrackingModalContent';
import { isPC } from '../../../../util/window/getDevice';

const useOpenDeliveryTracking = ({
  invoices,
  invoiceOfDealProduct,
}: {
  invoices?: DeliveryGroup['invoices'];
  invoiceOfDealProduct?: DealProduct['invoice'];
}) => {
  const dispatch = useDispatch();
  const { open: openBottomSheet } = useFullTypeBottomSheet();
  const { open: openDialog } = useBottomSheetDialog();

  const openDeliveryTracking = () => {
    if (invoiceOfDealProduct) {
      const { invoiceNo, extraCourierCode } = invoiceOfDealProduct;

      dispatch(
        redirectTo({
          url: getPageUrl(MYPAGE_PATH.deliveryTracking),
          query: {
            invoiceNo,
            extraCourierCode,
          },
        }),
      );
      return;
    }

    if (invoices && !isEmpty(invoices)) {
      const content = {
        title: '배송 조회하기',
        children: <DeliveryTrackingModalContent invoices={invoices} />,
      };

      if (isPC) {
        openDialog(content);
      } else {
        openBottomSheet(content);
      }
    }
  };

  return {
    openDeliveryTracking,
  };
};

export default useOpenDeliveryTracking;
