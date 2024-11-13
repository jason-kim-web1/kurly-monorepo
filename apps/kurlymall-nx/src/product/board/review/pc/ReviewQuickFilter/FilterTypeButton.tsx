import { forwardRef, ForwardedRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { addComma } from '../../../../../shared/services';
import { isNotEqual } from '../../../../../shared/utils/lodash-extends';
import { ArrowUp } from '../../../../../shared/icons';
import COLOR from '../../../../../shared/constant/colorset';

const LabelWrapper = styled.p`
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.kurlyGray600};
`;

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 9px 10px 9px 14px;
  border: 1px solid ${COLOR.kurlyGray200};
  background-color: ${COLOR.kurlyWhite};
  border-radius: 18px;
  gap: 2px;
  &.active {
    border-color: ${COLOR.loversFriends};
    ${LabelWrapper} {
      color: ${COLOR.loversLavender};
      font-weight: 500;
    }
  }
`;

const IconWrap = styled(motion.span)`
  line-height: 0;
`;

interface Props {
  label: string;
  count: number;
  open: boolean;
  onClick(): void;
}

export const FilterTypeButton = ({ label, count, open, onClick }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  const hasSelectedFilter = isNotEqual(count, 0);
  return (
    <Wrapper ref={ref} onClick={onClick} className={hasSelectedFilter ? 'active' : ''}>
      <LabelWrapper>
        <span>{label}</span>
        {hasSelectedFilter ? <span>{addComma(count)}</span> : null}
      </LabelWrapper>
      <IconWrap
        initial={false}
        animate={open ? 'open' : 'close'}
        variants={{
          open: { transform: 'rotate(0deg)' },
          close: { transform: 'rotate(180deg)' },
        }}
      >
        <ArrowUp stroke={hasSelectedFilter ? COLOR.loversLavender : COLOR.kurlyGray600} />
      </IconWrap>
    </Wrapper>
  );
};

export default forwardRef(FilterTypeButton);
