import styled from '@emotion/styled';
import { memo, ReactNode } from 'react';

import { Typography } from '@thefarmersfront/kpds-react';

import { vars } from '@thefarmersfront/kpds-css';

import HeaderButtons from './HeaderButtons';
import DeliveryLocationContainer from '../../../../header/containers/m/DeliveryLocationContainer';
import CartButtonContainer from '../../../../shared/containers/m/CartButtonContainer';
import { IconCart24x24, IconDeliveryLocation24x24 } from '../../../../shared/images';
import { CartButtonProps } from '../../../../shared/components/Button/CartButton';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${vars.spacing.$2} ${vars.spacing.$16};
  width: 100%;
  height: 44px;
  gap: ${vars.spacing.$8};
  box-shadow: 0px 0.125rem 0.125rem 0px rgba(0, 0, 0, 0.03);
`;

const TitleText = styled.h1`
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${vars.fontSize.$20};
  line-height: ${vars.lineHeight.$28};
  font-weight: ${vars.fontWeight.$semibold};
`;

interface ButtonProps {
  withAddress?: boolean;
  withCart?: boolean;
}

interface Props {
  title: ReactNode;
  buttonProps?: ButtonProps;
}

const CartButton = memo(styled.button<Omit<CartButtonProps, 'count'>>`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-image: url(${IconCart24x24});
`);

const Count = styled(Typography)<{ count: number }>`
  position: absolute;
  display: inline-block;
  text-align: center;
  min-width: 1.25rem;
  height: 1.25rem;
  top: 0;
  right: 0;
  color: ${vars.color.$white};
  background-color: ${vars.color.$black};

  ${({ count }) =>
    count < 10
      ? `
          padding: 0.125rem 0.375rem;
          border-radius: 50%;
        `
      : `
          padding: 0.125rem 0.25rem;
          border-radius: 10px;
      `}
`;

function CarButtonWithCount({ count, ...props }: CartButtonProps) {
  return (
    <CartButton {...props}>
      {count > 0 && (
        <Count variant={'$smallSemibold'} as={'span'} count={count}>
          {count > 99 ? '99+' : count}
        </Count>
      )}
    </CartButton>
  );
}

export default function Header({ title, buttonProps }: Props) {
  return (
    <Container>
      <TitleText>{title}</TitleText>

      {buttonProps && (
        <HeaderButtons>
          {buttonProps.withAddress && <DeliveryLocationContainer color={'black'} icon={IconDeliveryLocation24x24} />}
          {buttonProps.withCart && <CartButtonContainer color={'black'} cartButtonRenderer={CarButtonWithCount} />}
        </HeaderButtons>
      )}
    </Container>
  );
}
