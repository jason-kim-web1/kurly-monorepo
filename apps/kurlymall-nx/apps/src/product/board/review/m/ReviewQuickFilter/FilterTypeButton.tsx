import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import COLOR from '../../../../../shared/constant/colorset';
import { ArrowDown } from '../../../../../shared/icons';
import { isNotEqual } from '../../../../../shared/utils/lodash-extends';
import { addComma } from '../../../../../shared/services';
import { PRODUCT_REVIEW_COMMON_TRANSITION } from '../../constants';

const LabelWrap = styled.p`
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

const Wrap = styled(motion.li)``;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  padding: 9px 10px 9px 14px;
  border: 1px solid ${COLOR.kurlyGray200};
  background-color: ${COLOR.kurlyWhite};
  border-radius: 18px;
  gap: 2px;
  &.active {
    border-color: ${COLOR.loversFriends};
    ${LabelWrap} {
      color: ${COLOR.loversLavender};
      font-weight: 600;
    }
  }
`;

interface Props {
  label: string;
  count: number;
  onClick(): void;
}

export const FilterTypeButton = ({ label, count, onClick }: Props) => {
  const hasSelectedFilter = isNotEqual(count, 0);
  return (
    <Wrap {...PRODUCT_REVIEW_COMMON_TRANSITION}>
      <FilterButton type="button" onClick={onClick} className={hasSelectedFilter ? 'active' : ''}>
        <LabelWrap>
          <span>{label}</span>
          {hasSelectedFilter ? <span>{addComma(count)}</span> : null}
        </LabelWrap>
        <ArrowDown stroke={hasSelectedFilter ? COLOR.loversLavender : COLOR.kurlyGray600} />
      </FilterButton>
    </Wrap>
  );
};
