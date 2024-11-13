import styled from '@emotion/styled';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import { ComponentType, useMemo } from 'react';

import DefaultCartButton, { CartButtonProps } from '../../components/Button/CartButton';
import useDeliveryLocation from '../../../header/hooks/useDeliveryLocation';
import { useAppSelector } from '../../store';
import Location from '../../../header/components/Location/Location';
import useHeaderCartIcon from '../../../order/cart/hooks/useHeaderCartIcon';

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
  deliveryTooltip?: boolean;
  cartButtonRenderer?: ComponentType<CartButtonProps>;
}

export default function CartButtonContainer({ color = 'black', deliveryTooltip, cartButtonRenderer }: Props) {
  const { moveCart, basketCount } = useHeaderCartIcon();

  const {
    tooltip: { tooltipOpen },
  } = useDeliveryLocation();

  const { currentAddress, addressChanged, isAddressAssigned } = useAppSelector(
    ({ shippingAddress }) => shippingAddress,
  );

  const CartButton = useMemo(() => {
    return cartButtonRenderer || DefaultCartButton;
  }, [cartButtonRenderer]);

  if (!deliveryTooltip) {
    return <CartButton color={color} count={basketCount} onClick={moveCart} />;
  }

  return (
    <DeliveryTooltip
      PopperProps={{
        disablePortal: true,
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      open={tooltipOpen}
      title={
        <Location
          currentAddress={currentAddress}
          addressChanged={addressChanged}
          isAddressAssigned={isAddressAssigned}
          isOnCart
        />
      }
    >
      <CartButton color={color} count={basketCount} onClick={moveCart} />
    </DeliveryTooltip>
  );
}
