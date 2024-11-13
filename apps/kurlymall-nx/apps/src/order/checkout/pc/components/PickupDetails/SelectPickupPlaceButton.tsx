import { css } from '@mui/material';

import Button from '../../../../../shared/components/Button/Button';
import { PICKUP_PLACE_INFOMATION_ROW_TEXT, PICKUP_PLACE_SELECT_TEXT } from '../../../../shared/shared/constants';
import { DeliveryPinPickup } from '../../../../../shared/images';
import InformationRow from '../../../../../shared/components/layouts/InformationRow';
import COLOR from '../../../../../shared/constant/colorset';

const DeliveryPinPickupCss = css`
  margin: 2px 2px 0 0;
`;

const row = css`
  padding: 20px 0;
  > span {
    font-weight: 500;
    font-size: 14px;
    color: ${COLOR.kurlyGray800};
  }
`;

interface Props {
  openDialog: () => void;
}

export default function SelectPickupPlaceButton({ openDialog }: Props) {
  return (
    <InformationRow css={row} title={PICKUP_PLACE_INFOMATION_ROW_TEXT}>
      <Button
        text={PICKUP_PLACE_SELECT_TEXT}
        theme="secondary"
        width={414}
        height={44}
        radius={5}
        fontSize={14}
        styleIcon={{
          src: DeliveryPinPickup,
          css: DeliveryPinPickupCss,
        }}
        css={css`
          span {
            line-height: 20px;
          }
        `}
        onClick={openDialog}
      />
    </InformationRow>
  );
}
