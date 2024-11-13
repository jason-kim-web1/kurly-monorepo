import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import { useAppSelector } from '../../../shared/store';
import useDeliveryLocation from '../../hooks/useDeliveryLocation';

import { DeliveryPin as DeliveryPinDefault, DeliveryPinOff, DeliveryPinOn } from '../../../shared/images';

import LocationPC from '../../components/Location/LocationPC';
import useOpenAddress from '../../../shared/hooks/useOpenAddress';

const Button = styled.div<{ disabled?: boolean }>`
  width: 36px;
  height: 36px;
  margin-right: 20px;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  ${({ disabled }) =>
    disabled
      ? css`
          background-image: url(${DeliveryPinOff});
          cursor: default;
        `
      : css`
          background-image: url(${DeliveryPinDefault});
          cursor: pointer;
          :hover {
            background-image: url(${DeliveryPinOn});
          }
        `}
`;

const DeliveryTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    position: 'absolute',
    zIndex: -1,
    backgroundColor: 'transparent',
    width: 0,
    height: 0,
    padding: '0 !important',
    margin: '0 !important',
  },
}));

interface Props {
  sticky: boolean;
}

export default function DeliveryLocationContainer({ sticky }: Props) {
  const handleOpenAddress = useOpenAddress();
  const {
    moveLoginPage,
    toggleAddressLayer,
    tooltip: { tooltipOpen, isDisabled },
  } = useDeliveryLocation();

  const { currentAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);
  const { isGuest } = useAppSelector(({ auth }) => auth);

  return (
    <DeliveryTooltip
      PopperProps={{
        disablePortal: true,
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 1 }}
      onClose={() => toggleAddressLayer(false)}
      open={tooltipOpen}
      title={
        isDisabled ? (
          <></>
        ) : (
          <LocationPC
            isSticky={sticky}
            isGuest={isGuest}
            currentAddress={currentAddress}
            onClick={handleOpenAddress}
            onClickLogin={moveLoginPage}
          />
        )
      }
    >
      <Button disabled={isDisabled} onMouseEnter={() => toggleAddressLayer(true)} />
    </DeliveryTooltip>
  );
}
