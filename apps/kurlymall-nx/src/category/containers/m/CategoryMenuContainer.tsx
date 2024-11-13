import { useCallback, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { head, isEmpty } from 'lodash';

import PrimaryMenu from '../../components/m/PrimaryMenu';
import SecondaryMenu from '../../components/m/SecondaryMenu';
import { useGetCategoryGroups } from '../../queries';
import KPDSLoadingErrorPolicy from '../../../shared/components/KPDSLoadingErrorPolicy';
import { useAppSelector } from '../../../shared/store';
import { CategoryMenuImperativeRef } from '../../types';
import useCurrentPrimaryCode from '../../hooks/useCurrentPrimaryCode';
import { QuickMenuSwiper } from '../../components/m/QuickMenuSwiper';
import { isNotEmpty } from '../../../shared/utils/lodash-extends';

interface Props {
  minContentHeight: number;
  gutterHeight: number;
  isReady: boolean;
}

const SecondaryMenuWrapper = styled.div`
  margin-top: 1px;
  background-color: ${vars.color.background.$background1};
`;

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 8.5rem minmax(0, 1fr);
  align-items: stretch;
  background-color: ${vars.color.background.$background2};
`;

const Wrapper = styled.div<{ minHeight: number }>`
  height: 100%;
  ${({ minHeight }) => `min-height: ${minHeight}px;`}
  background-color: ${vars.color.background.$background2};

  @media (orientation: landscape) {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  } ;
`;

const CategoryMenuContainer = ({ minContentHeight, gutterHeight, isReady }: Props) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const site = useAppSelector(({ main }) => main.site);

  const { currentPrimaryCategoryCode, setCurrentPrimaryCategoryCode } = useCurrentPrimaryCode();
  const currentPrimaryCode = currentPrimaryCategoryCode[site];

  const {
    status: queryStatus,
    refetch,
    data: { categories, categoriesMeta, quick },
  } = useGetCategoryGroups(site, hasSession);
  const status = !isReady ? 'loading' : queryStatus;

  const primaryMenuRef = useRef<CategoryMenuImperativeRef>(null);
  const secondaryMenuRef = useRef<CategoryMenuImperativeRef>(null);

  const handleChangePrimaryMenu = useCallback(
    (code: string) => {
      setCurrentPrimaryCategoryCode(code, site);
      primaryMenuRef.current?.scrollToCode(code, 'smooth');
      secondaryMenuRef.current?.scrollToCode(code, 'auto');
    },
    [site, setCurrentPrimaryCategoryCode],
  );

  const handleChangeSecondaryMenu = useCallback(
    (code: string) => {
      setCurrentPrimaryCategoryCode(code, site);
      primaryMenuRef.current?.scrollToCode(code, 'smooth', 0);
    },
    [site, setCurrentPrimaryCategoryCode],
  );

  const quickMenuRef = useRef<HTMLDivElement>(null);
  const [menuMinHeight, setMenuMinHeight] = useState(minContentHeight);
  const [primaryMenuStickyTop, setPrimaryMenuStickyTop] = useState(0);

  useEffect(() => {
    if (status !== 'success') return;

    const quickMenuWrapperHeight = quickMenuRef.current?.getBoundingClientRect().height || 0;

    setMenuMinHeight(minContentHeight - quickMenuWrapperHeight);
    setPrimaryMenuStickyTop(gutterHeight + quickMenuWrapperHeight);
  }, [status, minContentHeight, gutterHeight]);

  // NOTE: 좌패널 영역 크기 변경됨에 따라 내부 스크롤 재조정
  useEffect(() => {
    requestAnimationFrame(() => {
      primaryMenuRef.current?.scrollToCode(currentPrimaryCode, 'smooth');
    });
  }, [currentPrimaryCode, menuMinHeight]);

  useEffect(() => {
    if (isEmpty(categories)) return;
    if (isEmpty(currentPrimaryCode)) {
      handleChangePrimaryMenu(head(categories)?.code ?? '');
    }
  }, [currentPrimaryCode, categories, handleChangePrimaryMenu]);

  return (
    <Wrapper minHeight={minContentHeight}>
      <KPDSLoadingErrorPolicy status={status} handleRefetch={refetch}>
        {isNotEmpty(quick) ? <QuickMenuSwiper ref={quickMenuRef} items={quick} stickyTop={gutterHeight} /> : null}
        <MenuWrapper>
          <PrimaryMenu
            ref={primaryMenuRef}
            currentCode={currentPrimaryCode}
            categories={categories}
            handleChangePrimaryMenu={handleChangePrimaryMenu}
            height={menuMinHeight}
            stickyTop={primaryMenuStickyTop}
          />

          <SecondaryMenuWrapper>
            <SecondaryMenu
              ref={secondaryMenuRef}
              categories={categories}
              currentCode={currentPrimaryCode}
              categoriesMeta={categoriesMeta}
              onShouldChangePrimaryCategory={handleChangeSecondaryMenu}
              minHeight={menuMinHeight}
            />
          </SecondaryMenuWrapper>
        </MenuWrapper>
      </KPDSLoadingErrorPolicy>
    </Wrapper>
  );
};

export { CategoryMenuContainer };
