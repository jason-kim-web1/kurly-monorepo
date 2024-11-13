import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';
import { KURLY_DELIVERY } from '../../../../shared/constant';
import { DeliveryType } from '../../../../shared/interfaces/ShippingAddress';

const Delivery: Record<DeliveryType, string> = {
  direct: KURLY_DELIVERY.direct,
  indirect: KURLY_DELIVERY.indirect,
  disable: KURLY_DELIVERY.disable,
};

const colors: Record<DeliveryType, string> = {
  direct: COLOR.kurlyPurple,
  indirect: COLOR.validBlue,
  disable: COLOR.disabled,
};

const DeliveryBadge = styled.span<{ type: DeliveryType }>(
  ({ type }) => `
  color: ${colors[type]};
  font-size: ${isPC ? '14px' : '12px'};
`,
);

const EarlyBirdNotice = styled.span<{ hasLimit: boolean }>`
  color: ${COLOR.kurlyGray600};
  font-size: ${isPC ? '14px' : '12px'};
  ${({ hasLimit }) =>
    hasLimit
      ? ''
      : `
    margin-left: 5px;
  `}
`;

interface Props {
  className?: string;
  type: DeliveryType;
  earlyBirdText?: string;
}

export default function AddressDeliveryType({ type, className, earlyBirdText }: Props) {
  const hasLimit = earlyBirdText && earlyBirdText.length > 14;
  return (
    <div className={className}>
      <DeliveryBadge type={type}>{Delivery[type]}</DeliveryBadge>
      {hasLimit && <br />}
      {earlyBirdText && <EarlyBirdNotice hasLimit={Boolean(hasLimit)}>{earlyBirdText}</EarlyBirdNotice>}
    </div>
  );
}
