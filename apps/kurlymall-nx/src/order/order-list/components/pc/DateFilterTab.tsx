import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { useDispatch } from 'react-redux';
import { MouseEvent } from 'react';

import { Tab, TabList } from '../../../../shared/components/KPDS/Tab';
import { changeDateTab } from '../../store/order-list';

const FilterContainer = styled.div`
  background-color: ${vars.color.background.$background1};
  border-bottom-right-radius: ${vars.radius.$16};
  border-bottom-left-radius: ${vars.radius.$16};
  height: 80px;

  > span {
    ::after {
      background: none;
    }
  }

  > span > div {
    height: 80px;

    > div {
      display: flex;
      width: 100%;
      height: 80px;
      padding: ${vars.spacing.$20} ${vars.spacing.$16};

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

  const handleChangeTab = ({ tabValue, tabEvent }: { tabValue?: string; tabEvent?: MouseEvent<HTMLButtonElement> }) => {
    dispatch(changeDateTab({ date: tabValue, clickTabEvent: tabEvent }));
  };

  return (
    <FilterContainer>
      <Tab
        tabList={tabState}
        onClickTab={handleChangeTab}
        height="56px"
        padding={`${vars.spacing.$8} ${vars.spacing.$16}`}
      />
    </FilterContainer>
  );
}
