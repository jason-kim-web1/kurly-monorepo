import { useState } from 'react';
import styled from '@emotion/styled';
import { Tab, TabProps, Tabs } from '@mui/material';

import COLOR from '../../../shared/constant/colorset';

const StyledTab = styled(Tab)`
  min-width: 0;
  padding: 13px 2px 11px 2px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  min-height: 0;

  &.Mui-selected {
    color: ${COLOR.kurlyPurple};
    font-weight: 600;
  }
`;

function MenuTab(props: TabProps) {
  return <StyledTab {...props} disableRipple />;
}

const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    padding: 0 16px;
  }

  button {
    margin-right: 16px;
  }

  .MuiTabs-indicator {
    background-color: ${COLOR.kurlyPurple};
  }

  min-height: 0;
`;

export default function TabMenu<T extends string | number>({
  tabList,
  onSelect,
}: {
  tabList: { label: string; value: T }[];
  onSelect: (value: T) => void;
}) {
  const [selected, select] = useState(0);
  const onChange = (event: unknown, value: number) => {
    const selectedMenu = tabList[value];
    select(value);
    onSelect(selectedMenu.value);
  };

  return (
    <StyledTabs value={selected} onChange={onChange} variant="scrollable" scrollButtons={false}>
      {tabList.map((menu) => (
        <MenuTab key={menu.value.toString()} label={menu.label} />
      ))}
    </StyledTabs>
  );
}
