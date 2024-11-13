import styled from '@emotion/styled';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../../shared/store';

import { GIFT_PATH, getPageUrl } from '../../../../../shared/constant';
import { isPC, isWebview } from '../../../../../../util/window/getDevice';
import deepLinkUrl from '../../../../../shared/constant/deepLink';
import Button from '../../../../../shared/components/Button/Button';
import { redirectTo } from '../../../../../shared/reducers/page';

const Wrapper = styled.div`
  position: relative;
  padding: 16px 20px 20px;
  button + button {
    margin-top: 10px;
  }
`;

const Notice = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 9px;
  color: #999;
`;

const NoticeText = styled.span`
  font-size: 12px;
  line-height: 16px;
  padding-right: 10px;
`;

const InquiryLink = styled.span`
  display: inline-block;
  padding-right: 15px;
  font-weight: 600;
  color: #5f0080;
  white-space: nowrap;
  background: url('https://res.kurly.com/kurly/ico/2021/direction_16_16_right_purple.svg') 100% 50% no-repeat;
`;

interface Props {
  isDiabledSend: boolean;
  handleSendMessage(): void;
}

export default function Inquiry({ isDiabledSend, handleSendMessage }: Props) {
  const dispatch = useDispatch();
  const { groupOrderNo, status, isSelfCancelable } = useAppSelector(({ mypageGift }) => mypageGift.orderDetails);

  const handleCancel = async () => {
    dispatch(
      redirectTo({
        url: `${getPageUrl(GIFT_PATH.cancel)}${groupOrderNo}`,
      }),
    );
  };

  return (
    <Wrapper>
      <Notice>
        {/* <span>주문취소는 &#39;선물 수락 대기&#39; 상태에서만 가능합니다.</span> */}
        <NoticeText>주문취소는 &#39;선물 수락 대기&#39; 상태에서만 가능합니다.</NoticeText>
        <Link
          href={isWebview() ? deepLinkUrl.PERSONAL_INQUIRY : '/m/mypage/inquiry/form'}
          as={isWebview() ? undefined : '/mypage/inquiry/form'}
          passHref={isWebview()}
        >
          <InquiryLink>1:1 문의하기</InquiryLink>
        </Link>
      </Notice>
      <Button
        text="전체 상품 주문 취소"
        theme="tertiary"
        height={50}
        disabled={!isSelfCancelable}
        onClick={handleCancel}
      />
      {!isPC && status === 'READY_FOR_ACCEPT' && (
        <Button text="메시지 재전송" height={50} disabled={isDiabledSend} onClick={handleSendMessage} />
      )}
    </Wrapper>
  );
}
