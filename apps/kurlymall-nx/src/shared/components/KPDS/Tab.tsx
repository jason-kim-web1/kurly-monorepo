import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import { css } from '@emotion/react';
import { MouseEvent } from 'react';

export const TAB_STYLE = {
  BLACK: 'black',
  PURPLE: 'purple',
};

export type TypeStyle = typeof TAB_STYLE[keyof typeof TAB_STYLE];

const Wrapper = styled.span<{ height: string }>`
  position: relative;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 56px;
    height: ${({ height }) => height};
    background: linear-gradient(to left, ${vars.color.$white} 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Slide = styled.div<{ height: string }>`
  overflow: hidden;
  overflow-x: scroll;
  position: relative;
  height: ${({ height }) => height};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TabGroup = styled.div<{ height: string; padding: string }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
`;

const DefaultTabStyle = styled.button`
  white-space: nowrap;
  padding: ${vars.spacing.$10} ${vars.spacing.$12};
  border-radius: ${vars.radius.$20};
  background-color: ${vars.color.background.$background3};
  color: ${vars.color.text.$tertiary};

  ~ button {
    margin-left: ${vars.spacing.$8};
  }
`;

const TabButton = styled(DefaultTabStyle)<{
  isActive?: boolean;
  tabStyle?: TypeStyle;
}>`
  height: 40px;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${vars.color.main.$secondary};
      color: ${vars.color.text.$inverse};
    `}

  ${({ tabStyle }) =>
    tabStyle === TAB_STYLE.PURPLE &&
    css`
      background-color: ${vars.color.background.$background2};
    `}

  ${({ isActive, tabStyle }) =>
    isActive &&
    tabStyle === TAB_STYLE.PURPLE &&
    css`
      background-color: ${vars.color.$violet100};
      color: ${vars.color.$purple800};
    `}
`;

export interface TabList {
  tabName: string;
  isActive?: boolean;
  value?: string;
}

export interface ClickTab {
  tabEvent: MouseEvent<HTMLButtonElement>;
  tabIndex: number;
  tabValue?: string;
}

interface TabProps {
  tabList: TabList[];
  onClickTab: ({ tabEvent, tabIndex, tabValue }: ClickTab) => Promise<void> | void;
  height: string;
  padding: string;
  tabStyle?: TypeStyle;
}

export function Tab({ tabList, onClickTab, height, padding, tabStyle = TAB_STYLE.BLACK }: TabProps) {
  return (
    <Wrapper height={height}>
      <Slide height={height}>
        <TabGroup height={height} padding={padding}>
          {tabList.map(({ tabName, isActive, value }, index) => {
            return (
              <TabButton
                key={index}
                isActive={isActive}
                onClick={(event) => onClickTab({ tabEvent: event, tabIndex: index, tabValue: value })}
                tabStyle={tabStyle}
              >
                <Typography variant={isActive ? '$largeSemibold' : '$largeRegular'}>{tabName}</Typography>
              </TabButton>
            );
          })}
        </TabGroup>
      </Slide>
    </Wrapper>
  );
}
