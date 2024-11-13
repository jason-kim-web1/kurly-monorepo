import { eq } from 'lodash';
import { css } from '@emotion/react';

import { Platform } from '../../constants';
import COLOR from '../../../../constant/colorset';
import { useProductImageBase } from '../../ProductImageBase';
import { isNotEmpty } from '../../../../utils/lodash-extends';

const rootStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const desktopTitleStyle = css`
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR.kurlyWhite};
  line-height: 35px;
  text-transform: capitalize;
`;

const mobileTitleStyle = css`
  font-size: 16px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  line-height: 20px;
`;

const desktopMessageStyle = css`
  display: block;
  margin-bottom: -6px;
  padding: 9px 16px 0;
  font-size: 13px;
  color: rgb(255, 255, 255);
  line-height: 18px;
  font-weight: 400;
`;

const mobileMessageStyle = css`
  padding: 4px 16px 2px;
  font-size: 12px;
  color: rgb(255, 255, 255);
  line-height: 16px;
`;

export const SoldOut = () => {
  const { soldOutTitle, soldOutMessage, platform } = useProductImageBase();
  const isDesktop = eq(platform, Platform.DESKTOP);
  const title = soldOutTitle || 'Coming Soon';
  const shouldRenderMessage = isNotEmpty(soldOutMessage);
  const titleStyle = isDesktop ? desktopTitleStyle : mobileTitleStyle;
  const messageStyle = isDesktop ? desktopMessageStyle : mobileMessageStyle;
  return (
    <div css={rootStyle}>
      <div css={contentStyle}>
        <div css={titleStyle}>{title}</div>
        {shouldRenderMessage ? <div css={messageStyle}>{soldOutMessage}</div> : null}
      </div>
    </div>
  );
};
