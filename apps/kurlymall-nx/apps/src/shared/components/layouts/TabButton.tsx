import { memo } from 'react';

import styled from '@emotion/styled';

import Icon from '../icons/Icon';

import COLOR from '../../constant/colorset';

const Button = styled.button`
  width: 25%;
  height: 48px;
`;

const Inner = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span<{ active: boolean }>`
  margin-top: 4px;
  font-size: 10px;
  ${(props) => props.active && { color: COLOR.kurlyPurple }}
`;

interface Props {
  className?: string;
  selectedTab: string;
  tab: {
    name: string;
    icon: {
      on: string;
      off: string;
    };
  };
  onClick(): void;
}

function TabButton({ className, selectedTab, tab, onClick }: Props) {
  const active = selectedTab === tab.name;

  return (
    <Button className={className} type="button" onClick={onClick}>
      <Inner>
        <Icon src={active ? tab.icon.on : tab.icon.off} alt={tab.name} />
        <Text active={active}>{tab.name}</Text>
      </Inner>
    </Button>
  );
}

export default memo(TabButton);
