import { ButtonHTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { DeliveryPin as DeliveryPinDefault, DeliveryPinOn, DeliveryPinOff } from '../../images';

const Button = styled.button<{ disabled?: boolean }>`
  width: 36px;
  height: 36px;
  background-size: cover;
  background-image: url(${(props) => (props.disabled ? DeliveryPinOff : DeliveryPinDefault)});

  ${(props) => !props.disabled && `:hover { background-image: url(${DeliveryPinOn}); }`}
`;

export default function DeliveryPinButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button type="button" {...props} />;
}
