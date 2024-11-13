import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { size } from 'lodash';

import type { ReviewFilterTabList, ReviewFilterType } from '../../../types';
import COLOR from '../../../../../../shared/constant/colorset';
import { isNotEqual } from '../../../../../../shared/utils/lodash-extends';
import { addComma } from '../../../../../../shared/services';
import { PRODUCT_REVIEW_COMMON_TRANSITION, REVIEW_FILTER_TYPE_LIST } from '../../../constants';
import Repeat from '../../../../../../shared/components/Repeat';
import SkeletonLoading from '../../../../../../shared/components/Loading/SkeletonLoading';

const TabList = styled.ul`
  flex-shrink: 0;
  padding: 0 18px;
  display: flex;
  gap: 20px;
  background-color: ${COLOR.kurlyWhite};
  box-shadow: inset 0px -0.5px 0px ${COLOR.lightGray};
`;

const TabItemButton = styled.button`
  display: flex;
  gap: 2px;
  padding: 13px 0;
  font-size: 15px;
  font-weight: 400;
  color: ${COLOR.kurlyGray600};
`;

const TabItem = styled(motion.li)`
  position: relative;
  &.active {
    ${TabItemButton} {
      font-weight: 600;
      color: ${COLOR.kurlyPurple};
    }
  }
`;

const TabIndicator = styled.span`
  opacity: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: ${COLOR.kurlyPurple};
  &.active {
    opacity: 1;
  }
`;

interface Props {
  isLoading: boolean;
  tabList: ReviewFilterTabList;
  onClickTabItem(filterType: ReviewFilterType): () => void;
}

export const TabBar = ({ isLoading, tabList, onClickTabItem }: Props) => {
  return (
    <TabList>
      {isLoading ? (
        <Repeat count={size(REVIEW_FILTER_TYPE_LIST)}>
          <motion.li {...PRODUCT_REVIEW_COMMON_TRANSITION}>
            <SkeletonLoading width={60} height={44} />
          </motion.li>
        </Repeat>
      ) : (
        tabList.map(({ label, value, active, count }) => {
          const className = active ? 'active' : '';
          const hasSelectedFilter = isNotEqual(count, 0);
          return (
            <TabItem key={value} className={className} {...PRODUCT_REVIEW_COMMON_TRANSITION}>
              <TabItemButton type="button" onClick={onClickTabItem(value)}>
                <span>{label}</span>
                {hasSelectedFilter ? <span>{addComma(count)}</span> : null}
              </TabItemButton>
              <TabIndicator className={className} />
            </TabItem>
          );
        })
      )}
    </TabList>
  );
};
