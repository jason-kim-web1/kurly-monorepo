import styled from '@emotion/styled';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../shared/store';
import { updateAcceptMemo, updateAcceptPhoneNumber, updateAddress, updateAddressDetail } from '../slice';

import { Panel } from '../../shared/components/Panel';
import DeliveryLimit from '../components/mobile/Receiver/DeliveryLimit';
import ShippingAddress from '../components/mobile/Receiver/ShippingAddress';
import { InputBoxMobileStyles } from '../../order/checkout/shared/constants/receiverDetails';
import { redirectTo } from '../../shared/reducers/page';

const Wrapper = styled.div`
  padding-bottom: 6px;
`;

export default function ShippingContainer({ isNoticeTime }: { isNoticeTime: boolean }) {
  const scrollArea = useRef<HTMLDivElement>(null);
  const [isDisabledScroll, setDisabledScroll] = useState<boolean>(false);

  const dispatch = useDispatch();

  const acceptInfo = useSelector(({ gift }: AppState) => gift.acceptInfo);
  const { externalOrderNo } = useSelector(({ gift }: AppState) => gift);

  const handleChangeAcceptInfo = (props: 'phoneNumber' | 'memo' | 'address', value: string) => {
    if (props === 'address') {
      dispatch(updateAddress(acceptInfo.address));
      dispatch(updateAddressDetail(value));
    } else if (props === 'phoneNumber') {
      dispatch(updateAcceptPhoneNumber(value));
    } else {
      dispatch(updateAcceptMemo(value));
    }
  };

  const handleSearchAddress = () => {
    setDisabledScroll(false);

    dispatch(
      redirectTo({
        url: '/m/address',
        query: {
          externalGroupOrderNo: externalOrderNo,
        },
      }),
    );
  };

  const moveScroll = () => {
    if (scrollArea.current === null || isDisabledScroll) {
      return;
    }
    window.scrollTo(0, scrollArea.current.offsetTop);
    setDisabledScroll(true);
  };

  useEffect(() => {
    // 주소지가 있을 경우 스크롤 처리
    if (acceptInfo.address) {
      moveScroll();
    }
  }, [acceptInfo]);

  return (
    <Panel>
      <Wrapper ref={scrollArea}>
        <DeliveryLimit isNoticeTime={isNoticeTime} />
        {!isNoticeTime && (
          <ShippingAddress
            onChangeAcceptInfo={handleChangeAcceptInfo}
            onSearchAddress={handleSearchAddress}
            css={{
              ...InputBoxMobileStyles,
            }}
          />
        )}
      </Wrapper>
    </Panel>
  );
}
