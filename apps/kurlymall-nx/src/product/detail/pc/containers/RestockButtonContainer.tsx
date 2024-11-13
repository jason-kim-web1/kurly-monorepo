import { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import { useAppSelector } from '../../../../shared/store';

import { Restock32x32C5f0080, Restock32x32Cccc } from '../../../../shared/images';

import Button from '../../../../shared/components/Button/Button';
import RestockNotificationModal from '../../../../shared/components/Restock/RestockNotificationModal';
import { selectRestockNotifiableDealProducts } from '../../selectors';
import { redirectToLogin } from '../../../../shared/reducers/page';

export default function RestockButtonContainer() {
  const dispatch = useDispatch();

  const [openedModal, setOpenedModal] = useState(false);

  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const productNo = useAppSelector(({ productDetail }) => productDetail.no);
  const canRestockNotify = useAppSelector(({ productDetail }) => productDetail.canRestockNotify);
  const restockNotifiableDealProducts = useAppSelector(selectRestockNotifiableDealProducts);
  const queryId = useAppSelector(({ productList }) => productList.queryId);

  const isActiveRestockNotification = useMemo(
    () => canRestockNotify && !isEmpty(restockNotifiableDealProducts),
    [canRestockNotify, restockNotifiableDealProducts],
  );

  const closeModal = () => {
    setOpenedModal(false);
  };

  const handleClickRestock = () => {
    if (!isGuest) {
      setOpenedModal(true);
      return;
    }

    dispatch(redirectToLogin());
  };

  return (
    <>
      <Button
        theme="tertiary"
        text=""
        width={56}
        height={56}
        radius={3}
        styleIcon={{ src: isActiveRestockNotification ? Restock32x32C5f0080 : Restock32x32Cccc }}
        onClick={handleClickRestock}
        disabled={!isActiveRestockNotification}
      />
      <RestockNotificationModal
        queryId={queryId}
        contentProductNo={productNo}
        open={openedModal}
        closeModal={closeModal}
      />
    </>
  );
}
