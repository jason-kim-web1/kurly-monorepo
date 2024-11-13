import { css } from '@emotion/react';

import Button from '../../../../../shared/components/Button/Button';
import DeliveryPinOn from '../../../../../shared/icons/DeliveryPinOn';

const button = css`
  span {
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
  }
`;

interface Props {
  onClick: () => void;
}

export default function PickupPlaceButton({ onClick }: Props) {
  return (
    <Button
      css={button}
      text="픽업매장 선택"
      theme="secondary"
      icon={<DeliveryPinOn />}
      height={48}
      onClick={onClick}
      radius={6}
    />
  );
}
