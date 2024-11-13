import styled from '@emotion/styled';

import { eq, head, isEmpty } from 'lodash';

import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

import { InView } from 'react-intersection-observer';

import { vars } from '@thefarmersfront/kpds-css';

import { Category, CategoryKindType, CategoryMeta, PrimaryCategory } from '../../../../shared/reducers/category';
import TitleMenuItem from './TitleMenuItem';
import MenuItem from './MenuItem';
import usePrimaryMenuTriggerRootMargin from '../../../hooks/usePrimaryMenuTriggerRootMargin';
import { CategoryMenuImperativeRef, ScrollToFn } from '../../../types';
import { getCategorySiteLink } from '../../../shared/util/link';
import { useAppSelector } from '../../../../shared/store';
import { isNotEmpty, ne } from '../../../../shared/utils/lodash-extends';
import { logSecondaryCategoryItem } from '../../../amplitude/events';
import useInViewEnabled from '../../../hooks/useInViewEnabled';
import useScrollOnceToCode from '../../../hooks/useScrollOnceToCode';
import BannerSwiper from '../BannerSwiper';
import { waitScrollStops } from '../../../../shared/utils/wait-scroll-stops';
import { useScroll } from '../../../../shared/hooks';

interface Props {
  categories: PrimaryCategory[];
  categoriesMeta: CategoryMeta;
  onShouldChangePrimaryCategory: (code: string) => void;
  minHeight: number;
  currentCode: string;
}

const ListWrapper = styled.ul`
  background-color: ${vars.color.background.$background1};
  width: 100%;
`;

// 마지막 카테고리 그룹은 보이는 영역을 다 차지해야 해서 minHeight 처리
const ListItemWrapper = styled.li<{ minHeight: number; isLast: boolean }>`
  padding: ${vars.spacing.$12} ${vars.spacing.$16} ${({ isLast }) => (isLast ? vars.spacing.$32 : 0)} 1rem;
  ${({ minHeight, isLast }) => isLast && minHeight && `min-height: ${minHeight}px;`}
  ${({ isLast }) =>
    !isLast &&
    `&:after {
    content: '';
    display: block;
    margin: 0.75rem auto 0 auto;
    width: 100%;
    height: 1px;
    background-color: ${vars.color.line.$line1};
  }`};
`;

const MenuGroupWrapper = styled.div``;

export default forwardRef(function SecondaryMenu(
  { categories, minHeight, onShouldChangePrimaryCategory, currentCode }: Props,
  ref: ForwardedRef<CategoryMenuImperativeRef>,
) {
  const site = useAppSelector(({ main }) => main.site);

  const wrapperRef = useRef<HTMLUListElement>(null);
  const elRefs = useRef<HTMLElement[]>([]);

  const { inViewEnabled, removeScrollEventListener, addScrollEventListener } = useInViewEnabled(site);
  const rootMargin = usePrimaryMenuTriggerRootMargin(wrapperRef, minHeight);
  const { scrollY } = useScroll();

  const currentSelectedCode = useMemo(() => {
    if (isEmpty(categories)) return null;
    return currentCode || categories[0].code || null;
  }, [currentCode, categories]);

  const getTitleMenuLink = (
    kind: CategoryKindType,
    code: string,
    isShowAll: boolean,
    subCategoryGroups: Category[],
  ) => {
    const targetCode = kind === 'product_category' && !isShowAll ? head(subCategoryGroups)?.code ?? code : code;
    return getCategorySiteLink({ kind, code: targetCode, mainSite: site });
  };

  const scrollToCode: ScrollToFn = useCallback(
    (code, behavior, delay) => {
      if (isEmpty(categories) || !wrapperRef.current) return;
      const index = Math.max(
        categories.findIndex((o) => o.code === code),
        0,
      );

      const targetElement = elRefs.current[index];
      if (targetElement) {
        removeScrollEventListener();

        setTimeout(() => {
          const offset = targetElement.offsetTop - (wrapperRef.current?.offsetTop ?? 0);
          window.scrollTo({
            top: offset,
            behavior,
          });

          waitScrollStops(window).then(addScrollEventListener);
        }, delay ?? 0);
      }
    },
    [categories, addScrollEventListener, removeScrollEventListener],
  );

  const handleCategoryInView = ({ code }: PrimaryCategory) => {
    return (inView: boolean) => {
      if (eq(scrollY, 0)) return;
      if (inView && inViewEnabled && ne(scrollY, 0)) {
        onShouldChangePrimaryCategory(code);
      }
    };
  };

  // NOTE 최상단 스크롤 시 첫번째 카테고리를 선택한다.
  useEffect(() => {
    const code = eq(scrollY, 0) ? head(categories)?.code : null;

    if (code && inViewEnabled) {
      onShouldChangePrimaryCategory(code);
    }
  }, [scrollY, categories, onShouldChangePrimaryCategory, inViewEnabled]);

  useScrollOnceToCode(
    currentSelectedCode ?? '',
    () => {
      if (!currentSelectedCode) return;
      scrollToCode(currentSelectedCode, 'auto', 300);
    },
    site,
    isNotEmpty(categories),
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollToCode,
    }),
    [scrollToCode],
  );

  return (
    <ListWrapper ref={wrapperRef}>
      {categories.map((categoryItem, index) => {
        return (
          <ListItemWrapper
            ref={(el) => el && (elRefs.current[index] = el)}
            key={`${categoryItem.code}-${index}`}
            isLast={eq(index, categories.length - 1)}
            minHeight={minHeight}
          >
            <MenuGroupWrapper>
              <InView rootMargin={rootMargin} onChange={handleCategoryInView(categoryItem)}>
                {isNotEmpty(categoryItem.banners) ? (
                  <BannerSwiper items={categoryItem.banners} name={categoryItem.name} code={categoryItem.code} />
                ) : null}
                <TitleMenuItem
                  link={getTitleMenuLink(
                    categoryItem.kind,
                    categoryItem.code,
                    categoryItem.isShowAll,
                    categoryItem.subCategoryGroups,
                  )}
                  name={categoryItem.name}
                  isNew={categoryItem.isNew}
                  icon={categoryItem.mobileIconV2Url}
                  onClick={() =>
                    logSecondaryCategoryItem({ name: categoryItem.name, code: categoryItem.code }, { name: '전체보기' })
                  }
                />
                {categoryItem.subCategoryGroups.map((o) => (
                  <MenuItem
                    key={o.code}
                    link={getCategorySiteLink({
                      kind: o.kind,
                      code: o.code,
                      mainSite: site,
                      parent: { kind: categoryItem.kind, code: categoryItem.code },
                    })}
                    onClick={() => logSecondaryCategoryItem(categoryItem, o)}
                  >
                    {o.name}
                  </MenuItem>
                ))}
              </InView>
            </MenuGroupWrapper>
          </ListItemWrapper>
        );
      })}
    </ListWrapper>
  );
});
