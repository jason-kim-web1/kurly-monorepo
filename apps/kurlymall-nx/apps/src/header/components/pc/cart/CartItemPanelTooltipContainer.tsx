import { DialogContent, Fade, styled as muiStyled, Tooltip } from '@mui/material';

import styled from '@emotion/styled';

import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import CartItemPanel from './CartItemPanel';
import COLOR from '../../../../shared/constant/colorset';
import { useAppSelector } from '../../../../shared/store';
import { setOpenCartItemPanel } from '../../../header.slice';

const TOOLTIP_TRANSITION_TIMEOUT = 500;
const TOOLTIP_POINTER_ICON = 'https://res.kurly.com/pc/ico/1903/ico_layer_point.png';

const HtmlTooltip = muiStyled(({ className, children, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    placement="bottom-end"
    TransitionComponent={Fade}
    TransitionProps={{
      timeout: TOOLTIP_TRANSITION_TIMEOUT,
    }}
  >
    {children}
  </Tooltip>
))(() => ({
  '&.positionFixed .MuiTooltip-tooltip': {
    marginTop: '28px !important',
    fontFamily: 'Noto Sans KR',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    position: 'relative',
    maxWidth: '346px',
    border: `1px solid ${COLOR.lightGray}`,
    backgroundColor: `${COLOR.kurlyWhite}`,
    borderRadius: 0,
    padding: '20px 20px 18px',
    margin: '16px -5px 0 0 !important',
  },
  '.MuiDialogContent-root': {
    padding: 0,
  },
}));

const TOOLTIP_DISPLAY_MILLI_SECOND = 3000;

const Point = styled.span`
  position: absolute;
  right: 13px;
  top: -14px;
  width: 20px;
  height: 14px;
  background: url(${TOOLTIP_POINTER_ICON}) no-repeat 0 0;
`;

interface Props {
  isSticky: boolean;
  children?: JSX.Element;
}

export default function CartItemPanelTooltipContainer({ isSticky, children }: Props) {
  const {
    cartItemPanel: { imageUrl, name, isInCart },
    openCartItemPanel,
  } = useAppSelector(({ header }) => ({
    cartItemPanel: header.cartItemPanel,
    openCartItemPanel: header.openCartItemPanel,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (openCartItemPanel) {
      setTimeout(() => {
        dispatch(setOpenCartItemPanel(false));
      }, TOOLTIP_DISPLAY_MILLI_SECOND);
    }
  }, [dispatch, openCartItemPanel]);

  if (!children) {
    return null;
  }

  if (!openCartItemPanel) {
    return <>{children}</>;
  }

  return (
    <HtmlTooltip
      open={openCartItemPanel}
      className={isSticky ? 'positionFixed' : ''}
      title={
        <DialogContent>
          <Point />
          <CartItemPanel productImageUrl={imageUrl} productName={name} isInCart={isInCart} />
        </DialogContent>
      }
    >
      {children}
    </HtmlTooltip>
  );
}
