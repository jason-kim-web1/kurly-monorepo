import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { MouseEvent } from 'react';

import { useDispatch } from 'react-redux';

import { FILTER_HIDE_TOP, FILTER_VISIBLE_TOP, ORDER_FILTER_HEADER } from '../../constants/order-list';
import { zIndex } from '../../../../shared/styles';
import { Tab, TabList } from '../../../../shared/components/KPDS/Tab';
import { useScroll } from '../../../../shared/hooks';

import { changeDateTab } from '../../store/order-list';

const FilterContainer = styled.div<{ isVisible: boolean }>`
  background-color: ${vars.color.background.$background1};
  position: sticky;
  top: ${({ isVisible }: { isVisible: boolean }) => (isVisible ? FILTER_VISIBLE_TOP : FILTER_HIDE_TOP)}px;
  height: ${ORDER_FILTER_HEADER}px;
  transition: top 0.3s ease-in-out;
  z-index: ${zIndex.orderLoader};

  > span {
    ::after {
      background: none;
    }

    > div > div {
      display: flex;
      width: 100%;
      padding: ${vars.spacing.$8} ${vars.spacing.$16};

      > button {
        flex: 1;
      }
    }
  }
`;

interface Props {
  tabState: TabList[];
}

export function DateFilterTab({ tabState }: Props) {
  const dispatch = useDispatch();
  const { scrollDirection } = useScroll();
  const isVisible = scrollDirection === 'up';

  const handleChangeTab = ({ tabValue, tabEvent }: { tabValue?: string; tabEvent?: MouseEvent<HTMLButtonElement> }) => {
    dispatch(changeDateTab({ date: tabValue, clickTabEvent: tabEvent }));
  };

  return (
    <FilterContainer isVisible={isVisible}>
      <Tab
        tabList={tabState}
        onClickTab={handleChangeTab}
        height={`${ORDER_FILTER_HEADER}px`}
        padding={`${vars.spacing.$8} ${vars.spacing.$16}`}
      />
    </FilterContainer>
  );
}
