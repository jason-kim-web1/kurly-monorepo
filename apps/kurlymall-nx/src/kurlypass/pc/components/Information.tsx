import { Fragment } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ScreenOut from '../../../shared/components/Pagination/ScreenOut';

const Wrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
  background: #cac8c4;
  img {
    display: block;
    width: 100%;
  }
`;

const Inner = styled.div`
  position: relative;
  width: 712px;
  margin: 0 auto;
  padding-bottom: 53px;
`;

const ApplyButton = styled.button`
  position: absolute;
  left: 50%;
  top: 400px;
  width: 386px;
  height: 100px;
  transform: translateX(-50%);
  background: url('https://res.kurly.com/pc/service/pass/1806/btn_pass_off.png') no-repeat 0 0;
  &:hover {
    background-image: url('https://res.kurly.com/pc/service/pass/1806/btn_pass_on.png');
  }
`;

const DetailStyle = css`
  padding-bottom: 53px;
`;

const NoticeStyle = css`
  padding-bottom: 85px;
`;

const mustReads = [
  {
    title: '자동 결제 관련',
    items: [
      '본 상품은 매월 첫 결제일과 같은 날짜에 자동으로 결제됩니다.(예시: 5월 21일 구매 시, 매월 21일에 결제)',
      '첫 결제일과 같은 날짜가 없는 달에는 말일에 결제됩니다. (예시: 8월 31일 구매 시, 9월은 30일에 결제)',
      '매월 자동 결제 내역은 [마이컬리] 내 [컬리패스] 메뉴에서 확인하실 수 있습니다.',
      '신용카드 정보 변경 및 잔액 부족 등의 이유로 결제가 실패한 경우 고객님께 별도로 안내드리며, 5일 후에도 결제가 실패한 경우 자동으로 취소됩니다. 자세한 문의는 고객행복센터 또는 1:1문의를 이용해주세요.',
      '결제 수단 변경을 원하실 경우, 새로운 신용카드로 컬리패스를 구매하시면 자동으로 결제 수단이 변경됩니다. (예시: 1월 1일에 A카드로 컬리패스 구매 후, 1월 2일에 카드를 변경하기 위해 B카드로 컬리패스를 재구매하면 2월 1일에는 이미 두 번 결제하셨기 때문에 추가 결제가 없고, 3월 1일부터 B카드로 자동 결제가 시작됩니다)',
      '컬리패스는 타 상품과 함께 구매하실 수 없으며, 적립금을 사용해 구매하실 수 없습니다.',
      '택배 지역 고객님의 경우 컬리패스를 구매하실 수 없습니다. 자세한 지역 확인은 [배송 안내]를 확인해주세요.',
    ],
  },
  {
    title: '이용 안내',
    items: [
      '컬리패스 구매 이후 즉시 무료 배송 혜택이 적용됩니다.',
      '무료 배송의 기준이 되는 15,000원은 주문하실 상품 금액에서 상품 할인 금액을 공제한 금액 기준입니다.',
      '컬리패스의 무료 배송 혜택은 샛별배송 지역으로 주문하신 건에 한해 적용됩니다. 즉, 택배 지역으로 주문하신 경우 무료 배송 혜택이 적용되지 않습니다.',
      '기존에 컬리패스 연간 및 월간 상품을 구매하신 상태에서 본 상품을 구매하시면, 기존에 구매하셨던 컬리패스의 만료일 다음 날부터 정기결제가 시작됩니다.',
      '컬리패스의 명백한 오남용(동일 ID를 다수가 공유하여 이용)이 발견된 경우, 사전 고지 없이 혜택이 취소될 수 있습니다.',
      '본 상품은 당사의 사정에 따라 구매자에게 사전 고지 후 변경될 수 있습니다.',
    ],
  },
  {
    title: '취소 및 환불',
    items: [
      '본 상품은 첫 결제일 기준 7일 이내, 무료 배송 혜택을 받지 않으신 경우에 한해 환불이 가능합니다.',
      '첫 결제일로부터 7일이 지난 후에는 취소 시 환불이 불가하나, 남은 기한(다음 달 결제 예정일 전일) 동안은 컬리패스 혜택을 받으실 수 있습니다.',
      '컬리패스 취소는 [마이컬리] 내 [컬리패스] 메뉴에서 가능하며, 고객행복센터(1644-1107)를 통해서도 접수하실 수 있습니다.',
    ],
  },
];

export default function Information({ onClick }: { onClick: () => void }) {
  return (
    <Wrapper data-testid="kurly-pass-information">
      <img
        src="https://res.kurly.com/pc/service/pass/1806/img_kurlypass1_v2.jpg"
        alt="샛별배송을 더 알뜰하게! KURLY PASS 월 4,500원 무제한 무료배송"
      />
      <Inner>
        <img src="https://res.kurly.com/pc/service/pass/1806/img_kurlypass2.jpg" alt="컬리패스란?" css={DetailStyle} />
        <ApplyButton type="button" onClick={onClick}>
          <ScreenOut>컬리패스 구매하기</ScreenOut>
        </ApplyButton>
        <ScreenOut>
          <p>
            샛별배송 지역 고객님에 한해 15,000원 이상 주문 시 무제한으로 무료배송 받으실 수 있는 혜택입니다. ※ 주문
            금액은 상품금액에서 상품할인금액을 제외한 금액입니다.
          </p>
          <strong>이런 분께 추천드려요</strong>
          <ul>
            <li>한 번에 소량씩만 구매하는 1-2인 가구</li>
            <li>4만 원 이상 주문 시 무료 배송 조건을 맞추기 힘든 분</li>
            <li>배송비를 추가로 결제한 경험이 여러 번 있으신 분</li>
          </ul>
        </ScreenOut>
        <img
          src="https://res.kurly.com/pc/service/pass/1806/img_kurlypass3.jpg"
          alt="꼭 읽어 주세요"
          css={NoticeStyle}
        />
        <ScreenOut>
          {mustReads.map(({ title, items }) => (
            <Fragment key={title}>
              <strong>{title}</strong>
              <ul>
                {items.map((item, index) => (
                  <li key={item}>{`${index + 1}. ${item}`}</li>
                ))}
              </ul>
            </Fragment>
          ))}
        </ScreenOut>
      </Inner>
    </Wrapper>
  );
}
