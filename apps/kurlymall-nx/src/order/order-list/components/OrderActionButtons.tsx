import styled from '@emotion/styled';
import { Button } from '@thefarmersfront/kpds-react';

import { isEmpty } from 'lodash';

import { vars } from '@thefarmersfront/kpds-css';

import { OrderStatus } from '../../common/constants/OrderStatus';
import { getButtonList, useOrderActionButtons } from '../hook/useOrderActionButton';
import { ACTION_BUTTON_TEXT } from '../constants/OrderActionButtonList';
import Progress from '../../../shared/icons/kpds/progress';
import { REVIEW_STATUS, ReviewStatus } from '../../common/constants/ReviewStatus';

const Wrapper = styled.div`
  display: flex;

  > button + button {
    margin-left: ${vars.spacing.$6};
  }
`;

const ActionButton = styled(Button)`
  width: 100%;
  margin-top: ${vars.spacing.$20};
`;

interface Props {
  orderStatus: OrderStatus;
  groupOrderNo: number;
  orderNos: number[];
  isSelfCancelable: boolean;
  reviewStatusType: ReviewStatus;
}

export function OrderActionButtons({ orderStatus, groupOrderNo, orderNos, isSelfCancelable, reviewStatusType }: Props) {
  const { handleClickButton, isActionLoading } = useOrderActionButtons({
    groupOrderNo,
    orderNos,
  });

  const buttonList = getButtonList({ orderStatus });

  if (isEmpty(buttonList)) {
    return null;
  }

  return (
    <Wrapper>
      {buttonList.map((list) =>
        list.buttons.map((button) => {
          const buttonType = button === ACTION_BUTTON_TEXT.후기작성 ? 'primary' : 'secondary';

          if (button === ACTION_BUTTON_TEXT.주문취소 && !isSelfCancelable) {
            return null;
          }

          if (button === ACTION_BUTTON_TEXT.후기작성 && reviewStatusType !== REVIEW_STATUS.WRITABLE) {
            return null;
          }

          return (
            <ActionButton
              key={button}
              _type={buttonType}
              _style="fill"
              color="light"
              size="large"
              disabled={isActionLoading}
              shape="square"
              onClick={() => handleClickButton(button)}
            >
              {isActionLoading ? <Progress type="white" /> : button}
            </ActionButton>
          );
        }),
      )}
    </Wrapper>
  );
}
