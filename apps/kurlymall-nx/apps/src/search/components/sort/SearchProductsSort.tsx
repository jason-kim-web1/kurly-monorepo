import styled from '@emotion/styled';
import { MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { chain, eq } from 'lodash';

import COLOR from '../../../shared/constant/colorset';

import { Question21x21cccc } from '../../../shared/images';

import type { SearchAvailableSort } from '../../shared/types';

import { ArrowDown } from '../../../shared/icons';
import { useScroll } from '../../../shared/hooks';
import { ignoreError } from '../../../shared/utils/general';
import Alert from '../../../shared/components/Alert/Alert';
import { RECOMMEND_MESSAGE_SEARCH } from '../../shared/constants';

const SortWrap = styled.div`
  display: flex;
  position: relative;
`;

const SortTitle = styled.strong`
  display: flex;
  align-items: center;
  padding: 13px 12px;
  font-weight: 400;
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  text-align: right;
  outline: none;
  &:after {
    content: '';
    height: 20px;
    margin-top: -2px;
  }
  > svg {
    margin-left: -2px;
  }
`;

const ArrowUp = styled(ArrowDown)`
  transform: rotate(180deg);
`;

const SortList = styled.ul`
  position: absolute;
  right: 0;
  top: 35px;
  width: 104px;
  border-radius: 6px;
  background-color: ${COLOR.kurlyWhite};
  box-shadow: 2px 2px 10px ${COLOR.dropShadow};
`;

const SortItem = styled.li<{ isRecommend: boolean }>`
  ${({ isRecommend }) => isRecommend && 'display:  flex;'};
`;

const SortLink = styled.a<{ isCurrent: boolean }>`
  display: block;
  overflow: hidden;
  width: 104px;
  padding: 19px 0 19px 16px;
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  white-space: nowrap;
  -webkit-tap-highlight-color: ${COLOR.tabHighlight};
  &:first-of-type {
    padding: 16px 0 16px 16px;
  }
  ${({ isCurrent }) => isCurrent && `font-weight: 700; color: ${COLOR.kurlyPurple};`}
  &:hover {
    font-weight: 600;
    color: ${COLOR.kurlyPurple};
  }
`;

const ButtonLayer = styled.button`
  overflow: hidden;
  width: 26px;
  height: 26px;
  margin: 11px 15px 0 0;
  background: url(${Question21x21cccc}) no-repeat 50% 50%;
  font-size: 0;
`;

const contentsStyle = `
  .popup-content {
    text-align: left;
    color: ${COLOR.kurlyGray600};
  }
`;

interface Props {
  selectedType: string;
  sortOptions: SearchAvailableSort[];
  onSortingEvent: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeSortEvent: ({ type, name }: { type: string; name: string }) => void;
}

const SORT_HEIGHT = 46;
export default function SearchProductsSort({ selectedType, sortOptions, onSortingEvent, onChangeSortEvent }: Props) {
  const layerRef = useRef<HTMLUListElement>(null);
  const [isSortLayerShown, setIsSortLayerShown] = useState(false);
  const { scrollY } = useScroll();
  const selectedSortName = chain(sortOptions)
    .filter(({ type }) => eq(type, selectedType))
    .head()
    .get('name')
    .value();

  const handleSortOpen = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsSortLayerShown(!isSortLayerShown);
    },
    [isSortLayerShown],
  );

  const handleClickRecommendDescriptionButton = () => {
    Alert({
      title: '추천순',
      text: RECOMMEND_MESSAGE_SEARCH,
      contentsStyle,
    });
  };

  const handleSortChange = (value: SearchAvailableSort) => {
    setIsSortLayerShown(false);

    if (value.type === selectedType) {
      return;
    }

    const { type, name } = value;

    onSortingEvent(true);
    onChangeSortEvent({ type, name });
  };

  const isRecommendedSortType = (name: string) => name === '추천순';
  const isSelectedSortType = (type: string) => type === selectedType;

  const handleWindowClick = (event: MouseEvent) =>
    ignoreError(() => {
      if (!layerRef.current) {
        return;
      }

      const { clientX: xPosition, clientY: yPosition } = event;
      const sortLayerArea = layerRef.current.getBoundingClientRect();
      const { x: xStart, y } = sortLayerArea;
      const yStart = y - SORT_HEIGHT; // 위쪽 정렬 영역 포함
      const xEnd = xStart + sortLayerArea.width;
      const yEnd = yStart + sortLayerArea.height;
      const isCollision = xStart <= xPosition && xEnd >= xPosition && yStart <= yPosition && yEnd >= yPosition;

      if (!isCollision) {
        setIsSortLayerShown(false);
      }
    });

  useEffect(() => {
    if (scrollY > 60) {
      setIsSortLayerShown(false);
    }
  }, [scrollY, setIsSortLayerShown]);

  useEffect(() => {
    if (!isSortLayerShown) {
      return;
    }
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [isSortLayerShown]);

  return (
    <SortWrap>
      <SortTitle onClick={handleSortOpen}>
        {selectedSortName}
        {isSortLayerShown ? (
          <ArrowUp width={20} height={20} stroke={COLOR.kurlyGray800} strokeWidth={1} />
        ) : (
          <ArrowDown width={20} height={20} stroke={COLOR.kurlyGray800} strokeWidth={1} />
        )}
      </SortTitle>
      {isSortLayerShown ? (
        <SortList ref={layerRef}>
          {sortOptions.map(({ type, name, link }) => (
            <SortItem key={type} isRecommend={isRecommendedSortType(name)}>
              <Link href={`${link}`} passHref>
                <SortLink
                  className={isSelectedSortType(type) ? 'active' : ''}
                  isCurrent={isSelectedSortType(type)}
                  onClick={() => handleSortChange({ type, name })}
                >
                  {name}
                </SortLink>
              </Link>
              {isRecommendedSortType(name) ? (
                <ButtonLayer type="button" onClick={handleClickRecommendDescriptionButton}>
                  추천순 설명보기
                </ButtonLayer>
              ) : null}
            </SortItem>
          ))}
        </SortList>
      ) : null}
    </SortWrap>
  );
}
