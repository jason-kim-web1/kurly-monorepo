import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { SweetAlertResult } from 'sweetalert2';

import { AppState } from '../../../src/shared/store';
import { loadGiftInformation, postGiftReject, setExternalOrderNo } from '../../../src/gift/slice';

import CloseButton from '../../../src/shared/components/Button/CloseButton';
import HeaderButtons from '../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../src/shared/components/layouts/MobileHeader';
import GiftRefusal from '../../../src/shared/components/Address/SearchAddress/result/GiftRefusal';
import SearchAnotherAddress from '../../../src/shared/components/Address/SearchAddress/result/SearchAnotherAddress';
import Alert from '../../../src/shared/components/Alert/Alert';
import { redirectTo } from '../../../src/shared/reducers/page';

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 44px);
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export default function SearchAddressResultPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { externalOrderNo } = useSelector(({ gift }: AppState) => gift);
  const { ordererName, status } = useSelector(({ gift }: AppState) => gift.receiver);

  const handleRefusal = () => {
    Alert({
      text: `${ordererName}님이 보내신 선물을 거절하시겠습니까?`,
      showCancelButton: true,
    }).then(({ isConfirmed }: SweetAlertResult) => {
      if (!isConfirmed) {
        return;
      }
      dispatch(postGiftReject(externalOrderNo));
    });
  };

  const moveGiftPage = () => {
    dispatch(
      redirectTo({
        url: '/m/gift',
        query: {
          externalGroupOrderNo: externalOrderNo,
        },
      }),
    );
  };

  const moveAddressPage = () => {
    dispatch(
      redirectTo({
        url: '/m/address',
        query: {
          externalGroupOrderNo: externalOrderNo,
        },
      }),
    );
  };

  useEffect(() => {
    if (status === 'REJECTED' || status === 'CANCELED') {
      moveGiftPage();
    }
  }, [status, dispatch, externalOrderNo]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!router.query.externalGroupOrderNo) {
      router.push('/m2/error.php');

      return;
    }

    // 주소 검색 시 새로고침 했을 경우, 다시 정보를 조회합니다.
    dispatch(setExternalOrderNo(router.query.externalGroupOrderNo));
    dispatch(loadGiftInformation(String(router.query.externalGroupOrderNo)));
  }, [router.isReady, dispatch]);

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <CloseButton onClick={moveGiftPage} />
        </HeaderButtons>
        <HeaderTitle>주소 검색</HeaderTitle>
      </MobileHeader>
      <Wrapper>
        <SearchAnotherAddress handleSearchAddress={moveAddressPage} />
        <GiftRefusal handleRefusal={handleRefusal} />
      </Wrapper>
    </>
  );
}
