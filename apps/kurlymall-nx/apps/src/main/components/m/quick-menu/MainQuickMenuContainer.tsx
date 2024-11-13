// eslint-disable-next-line import/no-unresolved
import Link from 'next/link';

import styled from '@emotion/styled';
import { css } from '@emotion/css';

import { eq, isUndefined } from 'lodash';

import { MainSection, QuickMenuData, QuickMenuSection } from '../../../interfaces/MainSection.interface';
import SectionContents from '../shared/SectionContents';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';
import { hiddenScrollBar } from '../../../../shared/utils/hidden-scrollbar';
import { checkIsExternalLink, createInternalUrlPath } from '../../../../shared/utils/url';
import { amplitudeService } from '../../../../shared/amplitude';
import { useAppSelector } from '../../../../shared/store';
import { MainQuickMenuCard } from './MainQuickMenuCard';
import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';
import { SelectQuickMenu } from '../../../../shared/amplitude/events/main/SelectQuickMenu';

const DEFAULT_MENU_COUNT = 5;

enum menuCountResultType {
  FIT = 'FIT',
  OVER = 'OVER',
  UNDER = 'UNDER',
}

const fitTypeClassName = css`
  justify-content: space-between;
`;

const overTypeClassName = css`
  > :last-of-type {
    padding-right: 76px;
  }
`;

const getDynamicMenuStyles = ({ menuCountResult, gap }: { menuCountResult: menuCountResultType; gap?: number }) => {
  switch (menuCountResult) {
    case menuCountResultType.FIT:
      return fitTypeClassName;
    case menuCountResultType.OVER:
      return overTypeClassName;
    case menuCountResultType.UNDER:
      return css`
        gap: ${gap || 0}px;
      `;
    default:
      return '';
  }
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 0 12px;
  scroll-snap-type: x mandatory;
  ${hiddenScrollBar({ x: 'auto', y: 'hidden' })};
`;

const InnerWrapper = styled.div<{
  isSecondRow?: boolean;
}>`
  display: flex;
  ${({ isSecondRow }) => (isSecondRow ? 'margin-top: 4px;' : '')};
  & > a {
    max-width: 66px;
  }
`;

interface Props {
  section: QuickMenuSection;
}

const onClickMenu = (
  section: QuickMenuSection,
  sections: MainSection<unknown>[],
  rowIndex: number,
  index: number,
  title: string,
  link: string,
) => {
  amplitudeService.logEvent(
    new SelectQuickMenu({
      eventName: section.type,
      section,
      sections,
      sectionType: 'quick_menu',
      row: rowIndex,
      position: index,
      title,
      link,
    }),
  );
};

const renderQuickMenu = (
  menu: QuickMenuData,
  section: QuickMenuSection,
  sections: MainSection<unknown>[],
  rowIndex: number,
  index: number,
) => {
  const { title, resizedImageUrl: imageUrl, lottieUrl, lottieLoop, link, isNew } = menu;
  const internalHost = checkBrowserEnvironment() ? window.location.host : '';
  const isExternalLink = checkIsExternalLink(link, internalHost);

  const handleClickMenu = () => onClickMenu(section, sections, rowIndex, index, title, link);

  return isExternalLink ? (
    <a href={link} onClick={handleClickMenu}>
      <MainQuickMenuCard
        key={title}
        title={title}
        imageUrl={imageUrl}
        lottieUrl={lottieUrl}
        lottieLoop={lottieLoop}
        isNew={isNew}
      />
    </a>
  ) : (
    <Link href={createInternalUrlPath(link)} passHref>
      <a href={createInternalUrlPath(link)} onClick={handleClickMenu}>
        <MainQuickMenuCard
          key={title}
          title={title}
          imageUrl={imageUrl}
          lottieUrl={lottieUrl}
          lottieLoop={lottieLoop}
          isNew={isNew}
        />
      </a>
    </Link>
  );
};

export default function MainQuickMenuContainer({ section }: Props) {
  const sections = useAppSelector(({ main }) => main.sections);
  const { payload, type } = section;
  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }
  const { rows, maxMenuCount } = payload.data;
  const [firstRow, secondRow] = rows;
  const isSingleRow = isUndefined(secondRow);
  const minMenuCount = !isSingleRow ? Math.min(firstRow.length, secondRow.length, maxMenuCount) : maxMenuCount;
  const isShortRowUnderDefaultMenuCount = minMenuCount < DEFAULT_MENU_COUNT;

  const getMenuCountStatus = (menuCount: number): menuCountResultType => {
    if (menuCount > DEFAULT_MENU_COUNT) {
      return menuCountResultType.OVER;
    }
    if (menuCount < DEFAULT_MENU_COUNT) {
      return menuCountResultType.UNDER;
    }
    return menuCountResultType.FIT;
  };

  const maxMenuCountResult = getMenuCountStatus(maxMenuCount);
  const minMenuCountResult = getMenuCountStatus(minMenuCount);

  const determineRowStyle = (rowLength: number) => {
    if (isSingleRow || eq(rowLength, maxMenuCount)) {
      return maxMenuCountResult;
    }

    if (eq(maxMenuCountResult, 'FIT') && isShortRowUnderDefaultMenuCount) {
      return menuCountResultType.UNDER;
    }

    if (eq(maxMenuCountResult, 'OVER') && !eq(minMenuCountResult, 'OVER')) {
      return menuCountResultType.OVER;
    }

    return maxMenuCountResult;
  };

  const computedGap = () => {
    if (minMenuCount >= DEFAULT_MENU_COUNT) return 0;
    let result = 0;
    let ITEM_WIDTH = 56;
    const PADDING = 12;
    const SCREEN_WIDTH = screen.width;

    if (SCREEN_WIDTH < 320) {
      result = (SCREEN_WIDTH - ITEM_WIDTH * DEFAULT_MENU_COUNT - PADDING * 2) / 4;
    }

    if (SCREEN_WIDTH >= 320) {
      ITEM_WIDTH = 64;
      result = (SCREEN_WIDTH - ITEM_WIDTH * DEFAULT_MENU_COUNT - PADDING * 2) / 4;
    }

    return result;
  };

  const className = getDynamicMenuStyles({
    menuCountResult: determineRowStyle(isSingleRow ? firstRow.length : secondRow.length),
    gap: computedGap(),
  });

  return (
    <Wrapper>
      <InnerWrapper className={className}>
        {firstRow.map((menu, idx) => renderQuickMenu(menu, section, sections, 1, idx))}
      </InnerWrapper>
      {!isSingleRow ? (
        <InnerWrapper className={className} isSecondRow>
          {secondRow.map((menu, idx) => renderQuickMenu(menu, section, sections, 2, idx))}
        </InnerWrapper>
      ) : null}
    </Wrapper>
  );
}
