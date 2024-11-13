import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';

import Alert, { closeAlert } from '../../../shared/components/Alert/Alert';
import { useAppSelector } from '../../../shared/store';
import {
  loadCouponUsedDateByMemberNo,
  removeCouponUsedDateByMemberNo,
  storeCouponUsedDateByMemberNo,
} from '../shared/utils';
import { StyledAssociationCouponPopup, StyledCouponAlert } from '../shared/styled';
import { isPC, isWebview } from '../../../../util/window/getDevice';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectVipPageButton } from '../../../shared/amplitude/events/lounges';

type AssociationCouponPopupProps = {
  maxCount: number;
  couponCode?: string;
};

function AssociationCouponPopup({ maxCount, couponCode }: AssociationCouponPopupProps) {
  const { vipInfo } = useAppSelector(({ member }) => ({
    vipInfo: member.info?.vipInfo,
  }));

  const [isCouponUsed, setIsCouponUsed] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLSpanElement>(null);

  const memberNo = useAppSelector(({ member }) => member.info?.memberNo);

  useEffect(() => {
    if (memberNo) {
      const usedDate = loadCouponUsedDateByMemberNo(memberNo);

      const today = format(new Date(), 'yyyy-MM-dd');

      // 오늘 날짜에 카운팅된 숫자가 최대 수 (maxCount) 이상이면 사용 불가
      if (!!usedDate && !!usedDate[today] && usedDate[today] >= maxCount) {
        return;
      }

      if (!usedDate?.[today]) {
        removeCouponUsedDateByMemberNo(memberNo);
      }

      setIsCouponUsed(false);
    }
  }, [memberNo, maxCount]);

  const openModal = async () => {
    amplitudeService.logEvent(
      new SelectVipPageButton({
        url: location.href,
        pageName: vipInfo?.name ?? '',
        selectionType: 'benefit',
        message: '쿠폰 사용하기',
      }),
    );

    const clickCancel = () => {
      closeAlert();
    };

    const clickConfirm = async () => {
      if (memberNo) {
        if (inputRef.current?.value !== couponCode) {
          if (errorRef.current) {
            errorRef.current.style.display = 'block';
          }

          return false;
        }

        if (errorRef.current?.style.display === 'block') {
          errorRef.current.style.display = 'none';
        }

        storeCouponUsedDateByMemberNo(memberNo);

        setIsCouponUsed(true);

        amplitudeService.logEvent(
          new SelectVipPageButton({
            url: location.href,
            pageName: vipInfo?.name ?? '',
            selectionType: 'benefit_confirm',
            message: '쿠폰 사용 확인',
          }),
        );
      }

      clickCancel();
    };

    await Alert({
      title: '쿠폰 사용 확인',
      contents: (
        <StyledCouponAlert>
          <input type="text" ref={inputRef} placeholder="직원 확인 코드" />
          <span className="error" ref={errorRef}>
            확인 코드가 올바르지 않습니다.
          </span>
          <span>* 사용시 직원에게 제시해주세요.</span>
          <div className="div-buttons">
            <button onClick={clickCancel}>취소</button>
            <button className="btn-confirm" onClick={clickConfirm}>
              확인
            </button>
          </div>
        </StyledCouponAlert>
      ),
      showCancelButton: false,
      showConfirmButton: false,
    });
  };

  return (
    <StyledAssociationCouponPopup className={isPC ? 'pc' : 'mobile'}>
      {isWebview() ? (
        <button className="btn-coupon-open" onClick={openModal} disabled={isCouponUsed}>
          {isCouponUsed ? '쿠폰 사용 완료' : '쿠폰 사용하기'}
        </button>
      ) : (
        <button className="btn-coupon-open">쿠폰 사용은 모바일 앱에서만 가능합니다</button>
      )}
    </StyledAssociationCouponPopup>
  );
}

export default AssociationCouponPopup;
