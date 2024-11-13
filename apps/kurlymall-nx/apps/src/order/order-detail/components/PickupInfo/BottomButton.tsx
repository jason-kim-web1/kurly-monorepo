import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { vars } from '@thefarmersfront/kpds-css';

import Button from '../../../../shared/components/Button/Button';
import { PICKUP_STATUS, PickupStatus } from '../../../common/constants/PickupStatus';
import { PickupStrategy } from '../../../common/constants/PickupStrategy';
import { PICKUP_STRATEGY } from '../../../common/constants/PickupOrder';
import { QRIcon } from '../../../../shared/images';

interface Props {
  pickupStrategy: PickupStrategy;
  pickupStatus: PickupStatus;
  isLoading: boolean;
  onClick: () => void;
}

const StyledButton = styled(Button)`
  height: 48px;
  border-radius: ${vars.radius.$6};
  margin-top: 16px;
`;

const QRIconCss = css`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

const BottomButton = ({ isLoading, pickupStrategy, pickupStatus, onClick }: Props): React.ReactElement | null => {
  switch (pickupStatus) {
    case PICKUP_STATUS.CANCELED:
      return null;
    case PICKUP_STATUS.IMPOSSIBLE:
      return <StyledButton text="픽업 가능 기간이 아니에요" disabled />;
    case PICKUP_STATUS.COMPLETED:
      return <StyledButton text="픽업 완료" disabled />;
    case PICKUP_STATUS.PROGRESS:
      if (pickupStrategy === PICKUP_STRATEGY.COMMON) {
        return <StyledButton text="픽업 완료" onClick={onClick} isLoading={isLoading} />;
      }
      if (pickupStrategy === PICKUP_STRATEGY.QR) {
        return (
          <StyledButton
            text="QR 코드 보기"
            styleIcon={{
              src: QRIcon,
              css: QRIconCss,
            }}
            css={css`
              span {
                line-height: normal;
              }
            `}
            onClick={onClick}
          />
        );
      }
      return null;
    default:
      return null;
  }
};

export default BottomButton;
