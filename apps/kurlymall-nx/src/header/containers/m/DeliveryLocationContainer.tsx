import { useCallback } from 'react';
import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../shared/store';
import useDeliveryLocation from '../../hooks/useDeliveryLocation';

import { DeliveryPinDisabled, DeliveryPinWhite, DeliveryPinBlack } from '../../../shared/images';
import COLOR from '../../../shared/constant/colorset';
import Location from '../../components/Location/Location';
import GuestInfo from '../../components/Location/GuestInfo';
import Alert from '../../../shared/components/Alert/Alert';
import useOpenAddress from '../../../shared/hooks/useOpenAddress';
import { resetAddressChanged } from '../../../shared/reducers/shipping-address.slice';

const contentsStyle = `
  .popup-footer {
    justify-content: space-around;
    border-top: 1px solid ${COLOR.bgLightGray};
  }
  .popup-footer button {
    flex: 1 1 50%;
    margin: 0;
  }
  .popup-footer button:nth-of-type(2) {
    border-left: 1px solid ${COLOR.bgLightGray};
  }
  @media (max-width: 720px) {
    .popup-content {
      padding-bottom: 16px;
    }
  }
`;

const getDefaultIcon = (disabled: boolean | undefined, color: string | undefined) =>
  disabled ? DeliveryPinDisabled : color === 'black' ? DeliveryPinBlack : DeliveryPinWhite;

const Button = styled.button<{ disabled?: boolean; isActive?: boolean; color?: string; icon?: string }>`
  width: 44px;
  height: 44px;
  background-image: url(${({ disabled, color, icon }) => icon || getDefaultIcon(disabled, color)});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  transition: all 0.3s ease-in-out;
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
  color?: 'black' | 'white';
  icon?: string;
}

export default function DeliveryLocationContainer({ icon, color = 'black' }: Props) {
  const handleOpenAddress = useOpenAddress();
  const {
    tooltip: { tooltipOpen },
  } = useDeliveryLocation();

  const dispatch = useDispatch();
  const { isGuest } = useAppSelector(({ auth }) => auth);
  const { currentAddress, addressChanged, isAddressAssigned } = useAppSelector(
    ({ shippingAddress }) => shippingAddress,
  );

  const handleAddressChange = useCallback(async () => {
    if (!isEmpty(currentAddress?.address) && isGuest) {
      const { isConfirmed } = await Alert({
        confirmButtonText: '배송지 변경',
        showCancelButton: true,
        showConfirmButton: true,
        contentsStyle,
        contents: <GuestInfo currentAddress={currentAddress} />,
      });

      if (!isConfirmed) {
        return;
      }
    }

    dispatch(resetAddressChanged());
    handleOpenAddress();
  }, [currentAddress, dispatch, isGuest, handleOpenAddress]);

  return (
    <DeliveryTooltip
      PopperProps={{
        disablePortal: true,
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      open={tooltipOpen}
      onClick={handleAddressChange}
      title={
        <Location
          currentAddress={currentAddress}
          addressChanged={addressChanged}
          isAddressAssigned={isAddressAssigned}
        />
      }
    >
      <Button color={color} isActive={tooltipOpen} icon={icon} />
    </DeliveryTooltip>
  );
}
