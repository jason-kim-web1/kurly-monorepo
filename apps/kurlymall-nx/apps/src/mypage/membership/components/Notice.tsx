import { Fragment } from 'react';

import { NoticeSection } from '../shared/styled';

const textArray = [
  {
    title: '이용 기간 안내',
    items: ['컬리멤버스 신규 가입 시 가입 즉시 혜택이 지급됩니다.', '정기 결제 시 결제일 다음날 혜택이 지급됩니다.'],
  },
  {
    title: '컬리멤버스 제휴 혜택 안내',
    items: ['제휴 혜택은 컬리멤버스 이용 기간 시작일 다음날부터 이용 기간 종료일 하루 전까지 확인 가능합니다.'],
  },
  {
    title: '정기결제 실패 유의사항',
    items: [
      '결제 실패 시 당일 3회 시도 후 정기결제 보류 상태로 전환됩니다. 정기결제 보류 상태인 경우 멤버십 혜택은 제공되지 않습니다.',
      '정기결제 보류 상태에서 7일 이내 결제수단을 변경하여 결제 완료하지 않으면 멤버십 해지 처리됩니다.',
    ],
  },
  {
    title: '멤버십 해지 유의사항',
    items: [
      '이용 기간 시작일로부터 7일 이내 혜택을 사용하지 않은 경우, 고객 의사에 따라 멤버십 해지 및 결제 취소가 가능합니다.',
      '이용 기간 시작 후 7일 이후 혹은 혜택 이용 후 해지 요청 시, 다음 달 정기 결제일까지 멤버십이 유지되며 이후 자동 해지됩니다.',
      '구독 해지 예약 이후, 이용 기간 종료 예정일 전까지 멤버십 혜택 계속 받기를 클릭할 경우 혜택 유지가 가능합니다.',
    ],
  },
  {
    title: 'T우주패스를 통한 멤버십 가입 시 유의사항',
    items: ['T우주패스에서 제공하는 이용 기간으로 적용됩니다.', '구독 해지 및 결제수단 변경은 T우주에서 확인해주세요.'],
  },
];

export default function Notice() {
  return (
    <NoticeSection>
      <div className="main-title">유의사항</div>
      {textArray.map(({ title, items }) => (
        <Fragment key={title}>
          <div className="sub-title">{title}</div>
          <div className="items">
            {items.map((str) => (
              <div className="item" key={str}>
                {str}
              </div>
            ))}
          </div>
        </Fragment>
      ))}
      <p>이 외 궁금한 사항은 1:1문의를 이용해주세요.</p>
    </NoticeSection>
  );
}
