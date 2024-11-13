import { Checkbox } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { css } from '@emotion/react';

import { CartDeliveryGroup } from '../../constants/CartDeliveryGroup';
import useDeliveryGroup from '../../hooks/useDeliveryGroup';
import KurlyDeliveryProgress from './KurlyDeliveryProgress';
import useDeliveryTitle from '../../hooks/useDeliveryTitle';

const TEXT_PROPS = { size: `$18`, weight: `semibold`, lineHeight: `$26` } as const;

const DeliveryTitleWrapper = styled.div<{ isShowProgress?: boolean }>`
  display: flex;
  > label {
    height: 26px;
  }

  ${({ isShowProgress }) =>
    isShowProgress &&
    css`
      > label > p {
        position: absolute;
        top: 0;
        left: ${vars.spacing.$18};
      }
    `}}
`;

interface Props {
  type: CartDeliveryGroup;
}

export default function DeliveryTitle({ type }: Props) {
  const { getDisplayName } = useDeliveryGroup();
  const { isShowProgress, handleToggleAll, isAllChecked } = useDeliveryTitle(type);

  return (
    <DeliveryTitleWrapper isShowProgress={isShowProgress}>
      <Checkbox
        checked={isAllChecked()}
        onChange={handleToggleAll}
        {...{
          label: getDisplayName(type),
          textProps: TEXT_PROPS,
        }}
      />
      {isShowProgress && <KurlyDeliveryProgress />}
    </DeliveryTitleWrapper>
  );
}
