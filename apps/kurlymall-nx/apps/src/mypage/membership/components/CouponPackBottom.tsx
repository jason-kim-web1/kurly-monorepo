import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import Button from '../../../shared/components/Button/Button';
import { BottomWrapper } from '../shared/styled';
import { CLASS_NAME_DEVICE, COUPONPACK_BUTTON_TEXT } from '../shared/constants';
import { putCouponPackOptionId } from '../../../shared/api/membership/membership.api';
import Alert from '../../../shared/components/Alert/Alert';
import { redirectTo } from '../../../shared/reducers/page';
import { MYPAGE_PATH } from '../../../shared/constant';
import appService from '../../../shared/services/app.service';
import useCouponPackQuery from '../hooks/useCouponPackQuery';
import { isWebview } from '../../../../util/window/getDevice';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectMembershipCouponPackChange } from '../../../shared/amplitude/events/membership';

interface Props {
  isLoading: boolean;
  selected: number;
  selectedBenefitOptionId: number;
  selectedCode?: string;
}

const alertContentStyles = css`
  .popup-content {
    text-align: left;
  }
`;

export default function CouponPackBottom({ isLoading, selected, selectedBenefitOptionId, selectedCode }: Props) {
  const dispatch = useDispatch();

  const { refetch } = useCouponPackQuery();

  const handleClickChange = async () => {
    if (selectedBenefitOptionId !== selected) {
      await putCouponPackOptionId({ benefitOptionId: selected });

      await Alert({
        title: '쿠폰팩이 변경되었습니다.',
        text: '다음 정기결제 시 선택하신 쿠폰팩으로 지급됩니다.',
        contentsStyle: alertContentStyles.styles,
      });

      if (selectedCode) {
        amplitudeService.logEvent(
          new SelectMembershipCouponPackChange({
            option_name: selectedCode.toLocaleLowerCase(),
          }),
        );
      }

      await refetch();

      if (isWebview()) {
        appService.closeWebview({
          callback_function: `MEMBERSHIP_FINISH_AND_REFRESH()`,
        });
        return;
      }
    }

    if (isWebview()) {
      appService.closeWebview();
      return;
    }

    dispatch(redirectTo({ url: MYPAGE_PATH.myMembership.uri }));
  };

  return (
    <BottomWrapper className={CLASS_NAME_DEVICE}>
      <div className="text">
        쿠폰팩 변경 시 <span className="emph">다음 구독 회차부터 사용</span>할 수 있어요
      </div>
      <Button
        theme="primary"
        height={48}
        radius={8}
        text={COUPONPACK_BUTTON_TEXT}
        isSubmitLoading={isLoading}
        onClick={handleClickChange}
      />
    </BottomWrapper>
  );
}
