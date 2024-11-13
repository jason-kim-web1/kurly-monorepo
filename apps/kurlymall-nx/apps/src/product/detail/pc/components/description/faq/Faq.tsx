import { Fragment, useCallback, useState } from 'react';

import FaqHeader from './FaqHeader';
import RefundExchangeGuide from './RefundExchangeGuide';
import OrderCancellationGuide from './OrderCancellationGuide';

const faqs = [
  {
    title: '교환 및 환불 안내',
    description: '교환 및 환불이 필요하신 경우 고객행복센터로 문의해주세요.',
    isStrongDescription: false,
    renderContent: <RefundExchangeGuide />,
  },
  {
    title: '주문 취소 안내',
    description:
      '- [주문완료] 상태일 경우에만 주문 취소 가능합니다.\n- [마이컬리 > 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.',
    isStrongDescription: true,
    renderContent: <OrderCancellationGuide />,
  },
];

export default function Faq() {
  const [answerOpen, setAnswerOpen] = useState([true, true]);

  const handleClickOpenAnswer = useCallback(
    (num) => {
      const isOpenAnswerArray = answerOpen.map((arry, index) => (index === num ? !arry : arry));
      setAnswerOpen(isOpenAnswerArray);
    },
    [answerOpen],
  );

  return (
    <>
      {faqs.map(({ title, description, isStrongDescription, renderContent }, i) => (
        <Fragment key={title}>
          <FaqHeader
            faqIndex={i}
            title={title}
            description={description}
            isStrongDescription={isStrongDescription}
            isOpenAnswer={answerOpen[i]}
            onClickOpenAnswer={handleClickOpenAnswer}
          />
          {answerOpen[i] && renderContent}
        </Fragment>
      ))}
    </>
  );
}
