import { memo } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';
import { mq } from '../../styles';

const Container = styled.div`
  background-color: white;
  ${mq({
    padding: ['0 15px 0 15px', 0],
    margin: [0, '0 20px'],
  })}
  box-shadow: inset 0 -0.5px 0 0 ${COLOR.lightGray};
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
`;

const Button = styled.button<{ selected: boolean }>`
  display: block;
  flex-grow: 1;
  position: relative;
  height: 48px;
  font-weight: ${({ selected }) => (selected ? 500 : 400)};
  font-size: 16px;
  color: ${({ selected }) => (selected ? COLOR.kurlyPurple : '#666')};
  line-height: 18px;
  ${({ selected }) =>
    selected && {
      boxShadow: 'inset 0px -2px 0px 0px #5f0080',
    }};
`;

interface Props {
  selectedTab: string;
  tabs: string[];
  onChange(value: string): void;
}

function PcTabs({ selectedTab, tabs, onChange }: Props) {
  const handleClick = (menu: string) => () => {
    onChange(menu);
  };

  return (
    <>
      <Container>
        {tabs.map((menu) => (
          <Button key={`${menu}`} selected={selectedTab === menu} onClick={handleClick(menu)} type="button">
            {menu}
          </Button>
        ))}
      </Container>
    </>
  );
}

export default memo(PcTabs);
