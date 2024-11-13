import styled from '@emotion/styled';

import { Fragment, useState } from 'react';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import SlideToggleWrapper from '../../../../shared/components/motion/SlideToggleWrapper';
import { VipTabs } from '../../../../shared/api/events/member/benefit.api';
import { BenefitIconType } from '../../shared/constants';
import { VvipLogo } from '../../../../shared/icons/VvipLogo';
import { VipLogo } from '../../../../shared/icons/VipLogo';
import DropDownArrow from '../../../../shared/icons/DropDownArrow';
import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';
import { arrowIconStyle } from '../../shared/styled';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import VipTabList from './VipTabList';

const Container = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-top: 52px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  width: 50%;
  height: 40px;
  border: 1px solid #dfe4eb;
  font-weight: 600;
  line-height: 40px;

  &:first-of-type {
    left: 0;
    border-radius: 8px 0 0 8px;
  }
  &:last-of-type {
    right: 0;
    border-radius: 0 8px 8px 0;
  }

  ${({ isActive }) =>
    isActive
      ? css`
          border-color: ${COLOR.kurlyPurple};
          background-color: ${COLOR.kurlyPurple};
          color: ${COLOR.kurlyWhite};
          transition: background-color 0.3s ease-in-out;
        `
      : css`
          background-color: ${COLOR.kurlyWhite};
          color: ${COLOR.benefitTextGray};
        `};
`;

const TabContent = styled.div`
  border-radius: 16px;
  border: 1px solid #dfe4eb;
`;

const RankInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 24px 16px 12px;
  font-weight: 400;
  font-size: 13px;
  color: #a7b2bc;
`;

const ToggleButton = styled.button<{ isVipTag: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;

  &::after {
    position: absolute;
    top: 0;
    left: 16px;
    right: 16px;
    height: 1px;
    background-color: #eceff3;
    content: '';
  }
  &:first-of-type::after {
    display: none;
  }

  .title-area {
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    text-align: left;
    color: ${COLOR.benefitTextGray};
  }

  .title-text {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 2px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${COLOR.benefitGray};

    ${({ isVipTag }) =>
      isVipTag &&
      css`
        margin-bottom: 6px;
      `}

    .tag {
      height: 20px;
      padding: 0 6px;
      border-radius: 14px;
      font-size: 10px;
      line-height: 20px;
      background: linear-gradient(to right, #9c4ae1, #61c5db);
      color: ${COLOR.kurlyWhite};
    }
  }
`;

interface Props {
  tabs: VipTabs[];
}

const INFO_ICON: BenefitIconType = {
  ['VVIP']: <VvipLogo />,
  ['VIP']: <VipLogo />,
};

export default function VipTabMenu({ tabs }: Props) {
  const [activeMenu, setActiveMenu] = useState(tabs[0].id);

  const [toggle, setToggle] = useState<Record<number, boolean>>({});

  const handleClickTabButton = (name: string) => {
    setActiveMenu(name);

    if (name !== activeMenu) {
      setToggle({});
      return;
    }
  };

  const toggleComment = (idx: number) => {
    setToggle((prevToggle) => ({
      ...prevToggle,
      [idx]: !prevToggle[idx],
    }));
  };

  return (
    <Container>
      {tabs.map(({ id, rank, dropdown }) => (
        <Fragment key={id}>
          <TabButton isActive={id === activeMenu} onClick={() => handleClickTabButton(id)}>
            {id}
          </TabButton>
          {activeMenu === id && (
            <TabContent>
              <RankInfo>
                {INFO_ICON[id]}
                <ScreenOut>
                  <h3>{id}</h3>
                </ScreenOut>
                <span>{rank}</span>
              </RankInfo>
              {dropdown.map(({ vvipTag, title: slideTitle, subTitle, list }, index) => (
                <Fragment key={`vip-dropdown-${index}`}>
                  <ToggleButton onClick={() => toggleComment(index)} isVipTag={!!vvipTag}>
                    <div className="title-area">
                      <h4 className={`title-text ${vvipTag ? 'tag-type' : undefined}`}>
                        {vvipTag && <div className="tag">{vvipTag}</div>}
                        {slideTitle}
                      </h4>
                      <RawHTML html={subTitle} />
                    </div>
                    <DropDownArrow css={arrowIconStyle(toggle[index])} />
                  </ToggleButton>
                  <SlideToggleWrapper opened={toggle[index]}>
                    <VipTabList list={list} />
                  </SlideToggleWrapper>
                </Fragment>
              ))}
            </TabContent>
          )}
        </Fragment>
      ))}
    </Container>
  );
}
