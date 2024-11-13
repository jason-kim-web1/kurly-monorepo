import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import { Arrow10x4C898989 } from '../../../../../shared/images';
import SectionWrapper from '../SectionWrapper';

const SectionOrderCancellationGuide = styled.div`
  padding-top: 30px;
  color: ${COLOR.kurlyGray600};
  text-align: center;
`;

const Title = styled.h5`
  font-weight: 600;
  font-size: 16px;
`;

const SubTitle = styled.strong`
  display: block;
  padding-top: 19px;
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
`;

const Text = styled.p`
  padding-bottom: 31px;
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
`;

const MoreButton = styled.button<{ isMoreOpen: boolean }>`
  display: block;
  position: relative;
  width: 100%;
  padding: 14px 0 16px;
  border-bottom: ${(props) => (props.isMoreOpen ? 'none' : `1px solid ${COLOR.bg};`)};
  font-weight: 600;
  font-size: 13px;
  color: ${COLOR.kurlyPurple};

  &:first-of-type {
    border-top: 1px solid ${COLOR.bg};
  }

  &:after {
    content: '';
    position: absolute;
    right: 23px;
    top: 50%;
    width: 10px;
    height: 4px;
    margin-top: -2px;
    background: url(${Arrow10x4C898989}) no-repeat 50% 50%;
    transform: ${(props) => (props.isMoreOpen ? 'rotate(0)' : 'rotate(180deg)')};
  }
`;

const MoreContent = styled.div`
  padding: 0 16px 30px;
  background-color: ${COLOR.bg};
  font-size: 13px;
  color: ${COLOR.kurlyGray800};
  line-height: 18px;
  text-align: center;
`;

const MoreTitle = styled.strong`
  display: block;
  padding-top: 30px;
  font-size: 12px;
  color: ${COLOR.kurlyPurple};
  line-height: 17px;
`;

const MoreList = styled.ul`
  padding-top: 20px;
`;

const MoreItem = styled.li`
  padding-top: 16px;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  line-height: 18px;

  &:before {
    content: '·';
    display: inline-block;
    margin-right: 5px;
    font-size: 20px;
    color: ${COLOR.kurlyGray600};
    vertical-align: -1px;
  }
`;

export default function OrderCancellationGuide() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleClickMore = useCallback(() => {
    setIsMoreOpen(!isMoreOpen);
  }, [isMoreOpen]);

  return (
    <SectionWrapper>
      <SectionOrderCancellationGuide>
        <Title>주문 취소 안내</Title>
        <Text>
          <SubTitle>[주문완료] 상태일 경우에만 주문 취소 가능합니다.</SubTitle>
          <SubTitle>[마이컬리{' > '}주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.</SubTitle>
        </Text>
        <MoreButton type="button" onClick={() => handleClickMore()} isMoreOpen={isMoreOpen}>
          자세히 보기
        </MoreButton>
        {isMoreOpen && (
          <MoreContent>
            <MoreTitle>주문 취소 관련</MoreTitle>
            <MoreList>
              <MoreItem>
                [배송준비중] 부터는 취소가 불가하니 이후 단계에는 취소가 제한되는 점 고객님의 양해 부탁드립니다.
              </MoreItem>
              <MoreItem>
                비회원은 모바일 App / Web
                {' > '}
                마이컬리
                {' > '}
                비회원 주문 조회 페이지에서 주문을 취소하실 수 있습니다.
              </MoreItem>
              <MoreItem>일부 예약 상품은 배송 3~4일 전에만 취소하실 수 있습니다.</MoreItem>
              <MoreItem>주문 상품의 부분 취소는 불가능합니다. 전체 주문 취소 후 재구매해 주세요.</MoreItem>
              <MoreItem>미성년자 결제 시 법정대리인이 그 거래를 취소할 수 있습니다.</MoreItem>
            </MoreList>
            <MoreTitle>결제 승인 취소 / 환불 관련</MoreTitle>
            <MoreList>
              <MoreItem>카드 환불은 카드사 정책에 따르며, 자세한 사항은 카드사에 문의해주세요.</MoreItem>
              <MoreItem>결제 취소 시, 사용하신 적립금과 쿠폰도 모두 복원됩니다.</MoreItem>
            </MoreList>
          </MoreContent>
        )}
      </SectionOrderCancellationGuide>
    </SectionWrapper>
  );
}
