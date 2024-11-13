import { Dispatch } from 'redux';

import { differenceInDays, format, parse } from 'date-fns';

import { isPC } from '../../../../util/window/getDevice';
import Alert, { closeAlert } from '../../../shared/components/Alert/Alert';
import BottomSheet from '../../../shared/components/BottomSheet/BottomSheet';
import { CancelReason, UnsubscribeConfirmMessage } from '../shared/type';
import Button from '../../../shared/components/Button/Button';
import { FinalAsk } from '../shared/styled';
import ModalCloseButton from '../../../shared/components/Button/ModalCloseButton';
import { CLASS_NAME_DEVICE } from '../shared/constants';

import FinalAskComponent from '../components/FinalAsk';
import { handleClickUnsubscribeConfirm } from '../shared/utils';

const COMMON_MESSAGES = [
  '매월 적립금 2,000원',
  '무료 배송 쿠폰 31장 + 할인쿠폰(코어 옵션 선택 시)',
  '멤버스 계란 특가 + 일일 특가 추가 할인',
  '최대 7% 적립(최대 10만원)',
];

type FinalAskProps = {
  returnUrl?: string;
  dispatch: Dispatch<any>;
  endSubscriptionDate: string;
  isCancelNow: boolean;
  cancelReason: CancelReason;
  showStayMembership: () => void;
};

const parseDate = (date: string): string => {
  const parsedDate = parse(date, 'yyyy.MM.dd', new Date());
  return format(parsedDate, 'yyyy-MM-dd');
};

function RemainingPeriodComponent({
  returnUrl,
  endSubscriptionDate,
  isCancelNow,
  cancelReason,
  dispatch,
  showStayMembership,
}: FinalAskProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const remainingDate = differenceInDays(new Date(parseDate(endSubscriptionDate)), new Date(today));

  const unsubscribeMembership = async () => {
    await FinalAskComponent({
      cancelReason: cancelReason,
      returnUrl,
      dispatch,
      isCancelNow,
      endSubscriptionDate,
      showStayMembership,
    });
  };

  const clickActionMap = {
    [UnsubscribeConfirmMessage.UNSUBSCRIBE_CONFIRMSHEET]: unsubscribeMembership,
    [UnsubscribeConfirmMessage.SUBSCRIBE_CONFIRMSHEET]: showStayMembership,
  };

  const CommonContents = (
    <FinalAsk className={CLASS_NAME_DEVICE}>
      <div className="title">
        <div>
          컬리멤버스 이용기간이 <span className="emph">{remainingDate}</span>일 남았어요
        </div>
        {isPC && <ModalCloseButton onClick={closeAlert} />}
      </div>
      <p className="benefit-text">
        컬리멤버스는 2번만 구매해도 <span className="emph">월 평균 23,000원 절약할 수 있어요</span> (컬리멤버스 평균
        구매 금액 * 2회 구매 시 기준)
      </p>
      <ul className="benefit-list">
        {COMMON_MESSAGES.map((data) => (
          <li key={data}>{data}</li>
        ))}
      </ul>
      <div className="button-group">
        <div>
          <Button
            theme="tertiary"
            radius={6}
            onClick={() =>
              handleClickUnsubscribeConfirm({
                pageName: 'confirmsheet',
                message: UnsubscribeConfirmMessage.UNSUBSCRIBE_CONFIRMSHEET,
                clickAction: clickActionMap[UnsubscribeConfirmMessage.UNSUBSCRIBE_CONFIRMSHEET],
              })
            }
            text={UnsubscribeConfirmMessage.UNSUBSCRIBE_CONFIRMSHEET}
          />
          <Button
            theme="primary"
            radius={6}
            onClick={() =>
              handleClickUnsubscribeConfirm({
                pageName: 'confirmsheet',
                message: UnsubscribeConfirmMessage.SUBSCRIBE_CONFIRMSHEET,
                clickAction: clickActionMap[UnsubscribeConfirmMessage.SUBSCRIBE_CONFIRMSHEET],
              })
            }
            text={UnsubscribeConfirmMessage.SUBSCRIBE_CONFIRMSHEET}
          />
        </div>
      </div>
    </FinalAsk>
  );

  if (isPC) {
    return Alert({
      showCancelButton: false,
      showConfirmButton: false,
      contentsStyle: `
          .swal2-popup {
            max-width: 440px;
          }
          .popup-content {
            padding: 30px;
          }
        `,
      contents: CommonContents,
    });
  }

  return BottomSheet({
    showCancelButton: false,
    showConfirmButton: false,
    contents: CommonContents,
  });
}

export default RemainingPeriodComponent;
