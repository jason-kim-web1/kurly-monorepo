import { useEffect, useState } from 'react';

import { AddressData } from 'react-daum-postcode';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import styled from '@emotion/styled';

import { loadDeliveryPolicy, loadGiftInformation, setExternalOrderNo, updateAddress } from '../../../src/gift/slice';
import CloseButton from '../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../src/shared/components/layouts/MobileHeader';

import { useAppSelector } from '../../../src/shared/store';

import { refinementAddress } from '../../../src/shared/utils/shipping-address';
import { redirectTo } from '../../../src/shared/reducers/page';
import { DeliveryProps, DeliveryType } from '../../../src/shared/interfaces/ShippingAddress';

const DaumPostcode = dynamic(() => import('react-daum-postcode'), {
  ssr: false,
});

const Container = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
`;

export default function SearchAddressPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { externalOrderNo, policy } = useAppSelector(({ gift }) => ({
    externalOrderNo: gift.externalOrderNo,
    policy: gift.policy,
  }));

  const [isUpdatePolicy, setUpdatePolicy] = useState(false);

  const handleSearchResult = () => {
    const { deliveryType } = policy;

    // 배송불가 지역일 때
    if (deliveryType === ('disable' as DeliveryType)) {
      dispatch(updateAddress(''));
      dispatch(
        redirectTo({
          url: '/m/address/result',
          query: {
            externalGroupOrderNo: externalOrderNo,
          },
        }),
      );
    } else {
      dispatch(
        redirectTo({
          url: '/m/gift',
          query: {
            externalGroupOrderNo: externalOrderNo,
          },
        }),
      );
    }
  };

  const onComplete = (data: AddressData) => {
    const requestBody: DeliveryProps = refinementAddress(data);
    const { roadAddress } = requestBody;
    dispatch(updateAddress(roadAddress));
    dispatch(loadDeliveryPolicy(requestBody));
    setUpdatePolicy(true);
  };

  const moveGiftPage = () => {
    dispatch(
      redirectTo({
        url: '/m/gift',
        query: {
          externalGroupOrderNo: externalOrderNo,
        },
        replace: true,
      }),
    );
  };

  useEffect(() => {
    if (!isUpdatePolicy) {
      return;
    }
    handleSearchResult();
  }, [policy]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!router.query.externalGroupOrderNo) {
      router.push('/m2/error.php');
    }

    // 주소 검색 시 새로고침 했을 경우, 다시 정보를 조회합니다.
    dispatch(setExternalOrderNo(router.query.externalGroupOrderNo));
    dispatch(loadGiftInformation(String(router.query.externalGroupOrderNo)));
  }, [router.isReady, dispatch]);

  return (
    <Container>
      <MobileHeader>
        <HeaderButtons position="left">
          <CloseButton onClick={moveGiftPage} />
        </HeaderButtons>
        <HeaderTitle>주소 검색</HeaderTitle>
      </MobileHeader>

      <DaumPostcode height="calc(100vh - 44px)" onComplete={onComplete} />
    </Container>
  );
}
