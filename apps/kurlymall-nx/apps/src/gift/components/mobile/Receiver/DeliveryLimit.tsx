import styled from '@emotion/styled';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../shared/store';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div`
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 20px;
  color: #333;
`;

const ShippingNotice = styled.strong`
  display: block;
  padding-bottom: 3px;
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
`;

const LimitDate = styled.span`
  font-weight: bold;
`;

const Limit = styled.span`
  color: #f03f40;
`;

export default function DeliveryLimit({ isNoticeTime }: { isNoticeTime: boolean }) {
  const {
    receiver: { availableDate },
  } = useSelector(({ gift }: AppState) => gift);

  return (
    <Wrapper>
      <ShippingNotice>배송지 정보</ShippingNotice>
      {isNoticeTime ? (
        <LimitDate>선물의 배송지 입력 기간이 지나 자동 취소 예정입니다.</LimitDate>
      ) : (
        <>
          <LimitDate>5일 </LimitDate>
          이내 입력하지 않으시면 자동 취소됩니다.
        </>
      )}
      <br />
      <Limit>{moment(availableDate).format('YYYY년 MM월 DD일')} 까지</Limit>
    </Wrapper>
  );
}
