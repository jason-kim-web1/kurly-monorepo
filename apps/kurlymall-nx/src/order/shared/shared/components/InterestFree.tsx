import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';

import Info from '../../../../shared/icons/Info';
import { INTEREST_FREE_TITLE } from '../../shared/constants/interestFree';
import InterestFreeList from '../../shared/components/InterestFreeList';
import useInterestFree from '../../shared/hooks/queries/useInterestFree';
import Dialog from '../../shared/components/Dialog';
import useToggle from '../../../checkout/shared/hooks/useToggle';
import { isPC } from '../../../../../util/window/getDevice';
import DialogAction from './DialogAction';

const InterestFreeButton = styled.button`
  display: flex;
  align-items: center;
  color: ${COLOR.kurlyGray450};
  font-weight: 500;
  font-size: 13px;
  column-gap: 4px;
  letter-spacing: -0.5px;
  padding: 10px;
  margin-right: -10px;

  ${isPC &&
  css`
    svg {
      margin-top: 1px;
    }
  `}
`;

export default function InterestFree() {
  const { isOpen, open, close } = useToggle();
  const { interestFreeList } = useInterestFree();

  if (isEmpty(interestFreeList)) {
    return null;
  }

  return (
    <>
      <InterestFreeButton onClick={open}>
        무이자 혜택 안내 <Info width={12} height={12} />
      </InterestFreeButton>
      <Dialog
        isOpen={isOpen}
        maxWidth={'343px'}
        title={INTEREST_FREE_TITLE}
        contents={<InterestFreeList />}
        actions={<DialogAction close={close} />}
      />
    </>
  );
}
