import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { AddressData } from 'react-daum-postcode';

import CloseButton from '../../../../shared/components/Button/CloseButton';
import COLOR from '../../../../shared/constant/colorset';
import AddressForm from './AddressForm';
import { refinementAddress } from '../../../../shared/utils/shipping-address';

import Alert from '../../../../shared/components/Alert/Alert';
import AddressCheckResult from './AddressCheckResult';
import { DeliveryProps, DeliveryType } from '../../../../shared/interfaces/ShippingAddress';
import { fetchShippingAreaPolicy } from '../../../../shared/services/shippingAddress.service';

const DaumPostcode = dynamic(() => import('react-daum-postcode'), {
  ssr: false,
});

const Container = styled.div<{ showing: boolean }>`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  opacity: ${({ showing }) => (showing ? 1 : 0)};
  transition: opacity 250ms;
`;
const Modal = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 5px;
`;

const Contents = styled.div<{ isPC?: boolean }>`
  width: ${({ isPC }) => (isPC ? '530px' : '95vw')};
  height: ${({ isPC }) => (isPC ? '472px' : '90vh')};
  position: relative;
`;

const Dimmed = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const CloseButtonWrapper = styled.div`
  background-color: ${COLOR.kurlyWhite};
  text-align: right;
  margin-bottom: -15px;
`;

export default function AddressCheckLayer({
  onClose: onCloseOrg,
  isPC = false,
}: {
  onClose: () => void;
  isPC?: boolean;
}) {
  const [showing, setShowing] = useState(false);

  const [result, setResult] = useState<DeliveryType>();

  useEffect(() => {
    setShowing(true);
  }, []);

  const onClose = useCallback(() => {
    setShowing(false);
    setTimeout(onCloseOrg, 250);
  }, [onCloseOrg]);

  const [address, setAddress] = useState<
    DeliveryProps & {
      areaName: string;
    }
  >();

  const clearResult = useCallback(() => {
    setAddress(undefined);
  }, []);

  const onComplete = (data: AddressData) => {
    setAddress({
      ...refinementAddress(data),
      areaName: `${data.sido} ${data.sigungu}`,
    });
  };

  const setAddressDetail = useCallback((addressDetail: string) => {
    setAddress((prev) =>
      prev
        ? {
            ...prev,
            addressDetail,
          }
        : undefined,
    );
  }, []);

  const onClickSubmit = useCallback(async () => {
    if (!address) {
      return;
    }
    try {
      const { deliveryType } = await fetchShippingAreaPolicy({
        address: address.baseAddressType === 'road' ? address.roadAddress : address.address,
        addressDetail: address.addressDetail,
        baseAddressType: address.baseAddressType,
      });

      setResult(deliveryType);
    } catch (e) {
      await Alert({ text: e.message });
    }
  }, [address]);

  return (
    <Container showing={showing}>
      <Dimmed onClick={onClose} />
      <Modal>
        {result ? (
          <AddressCheckResult result={result} areaName={address?.areaName} onClickConfirm={onClose} />
        ) : (
          <>
            <CloseButtonWrapper>
              <CloseButton onClick={onClose} />
            </CloseButtonWrapper>
            <Contents isPC={isPC}>
              <DaumPostcode
                height="100%"
                onComplete={onComplete}
                hideEngBtn
                hideMapBtn
                style={{ display: address ? 'none' : 'block' }}
              />
              {address && (
                <AddressForm
                  address={address}
                  onClickBack={clearResult}
                  setAddressDetail={setAddressDetail}
                  onClickSubmit={onClickSubmit}
                />
              )}
            </Contents>
          </>
        )}
      </Modal>
    </Container>
  );
}
