import { css } from '@emotion/react';

import { Button, Typography } from '@thefarmersfront/kpds-react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { isPC } from '../../../../util/window/getDevice';

import { IconExclamation64x64 } from '../../../shared/images';

import { StatusText } from '../constants/status';
import { MOBILE_HEADER_HEIGHT } from '../../cart/constants';
import { ORDER_FILTER_HEADER } from '../constants/order-list';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  ${isPC
    ? css`
        height: 700px;
        background-color: ${vars.color.background.$background1};
        margin-top: 16px;
        border-radius: ${vars.radius.$16};
      `
    : css`
        position: absolute;
        height: calc(100% - (${ORDER_FILTER_HEADER}px + ${MOBILE_HEADER_HEIGHT}px));
      `}
`;

const MainText = styled(Typography)`
  margin-top: ${vars.spacing.$16};
  color: ${vars.color.text.$primary};
`;

const SecondaryText = styled(Typography)`
  margin-top: ${vars.spacing.$16};
  color: ${vars.color.text.$tertiary};
`;

const ActionButton = styled(Button)`
  margin-top: ${vars.spacing.$24};
`;

interface Props {
  text: StatusText;
  period?: string;
  onClick: () => void;
}

export function Empty({ text, period, onClick }: Props) {
  const { mainText, subText, buttonText } = text;

  return (
    <Wrapper>
      <Image src={IconExclamation64x64} alt="Error" width={64} height={64} />
      <MainText variant={'$xxlargeSemibold'}>
        {period}
        {mainText}
      </MainText>
      {subText && <SecondaryText variant={'$xlargeRegular'}>{subText}</SecondaryText>}
      <ActionButton type={'button'} _type="secondary" _style="stroke" color="light" onClick={onClick}>
        {buttonText}
      </ActionButton>
    </Wrapper>
  );
}
