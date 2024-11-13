import { Button, Checkbox, Typography } from '@thefarmersfront/kpds-react';
import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { zIndex } from '../../../../shared/styles';
import useFloatingMenu from '../../hooks/useFloatingMenu';

import { isPC } from '../../../../../util/window/getDevice';

import { MOBILE_HEADER_HEIGHT, MOBILE_ITEM_CONTROL_HEIGHT } from '../../constants';

const Wrapper = styled.div`
  ${isPC
    ? css`
        overflow: hidden;
        border-radius: ${vars.radius.$16};
        margin-bottom: ${vars.spacing.$16};
      `
    : css`
        position: sticky;
        top: ${MOBILE_HEADER_HEIGHT}px;
        z-index: ${zIndex.floatingMenu};
        pointer-events: none;
      `}
`;

const CartItemMenu = styled.div<{ isShowDeliveryTypeTab: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${vars.color.background.$background1};
  pointer-events: auto;

  ${isPC
    ? css`
        padding: ${vars.spacing.$16};
      `
    : css`
        z-index: ${zIndex.floatingMenu};
        padding: ${vars.spacing.$12} ${vars.spacing.$16} ${vars.spacing.$8};
        height: ${MOBILE_ITEM_CONTROL_HEIGHT}px;
        margin-top: ${vars.spacing.$1};
      `}

  ${({ isShowDeliveryTypeTab }) =>
    isShowDeliveryTypeTab &&
    css`
      padding-bottom: ${vars.spacing.$8};
    `}
`;

interface FloatingMenuProps {
  children: JSX.Element;
}

export default function FloatingMenu({ children }: FloatingMenuProps) {
  const { isReady } = useRouter();

  const {
    selectedStatusText,
    isAllChecked,
    allCheckDisabled,
    isUnselectedItem,
    onToggleAll,
    onDeleteAll,
    isShowDeliveryTypeTab,
  } = useFloatingMenu();

  if (!isReady) return null;

  return (
    <Wrapper>
      <CartItemMenu isShowDeliveryTypeTab={isShowDeliveryTypeTab}>
        <Checkbox
          disabled={allCheckDisabled}
          label={`전체선택 ${selectedStatusText}`}
          checked={isAllChecked}
          onChange={onToggleAll}
        />
        <Button
          _type={'secondary'}
          _style={'stroke'}
          color={'light'}
          size={'small'}
          shape={'square'}
          disabled={isUnselectedItem}
          onClick={onDeleteAll}
        >
          <Typography variant={'$largeSemibold'}>선택삭제</Typography>
        </Button>
      </CartItemMenu>
      {isShowDeliveryTypeTab && children}
    </Wrapper>
  );
}
