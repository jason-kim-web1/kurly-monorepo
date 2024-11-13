import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { useRouter } from 'next/router';

import { RefObject } from 'react';

import type { PageType } from '../../../types';
import Banner from '../../../pc/components/Banner';
import COLOR from '../../../../../shared/constant/colorset';
import { useCategory } from '../../hook/useCategory';
import Menu from '../../../pc/components/Menu';
import { amplitudeService } from '../../../../../shared/amplitude';
import { SelectCategoryBanner, SelectCategoryMenu } from '../../../../../shared/amplitude/events';
import useProductList from '../../../hook/useProductList';
import { PRODUCT_LIST_HEADING_TOP_MARGIN } from '../../../constants';
import { useCategoriesPageQueries } from '../../Context/CategoriesDataProvider';

const PageTitle = styled.h3`
  margin-top: 50px;
  font-weight: 500;
  font-size: 28px;
  color: ${COLOR.kurlyGray800};
  line-height: 35px;
  letter-spacing: -1px;
  text-align: center;
`;

interface Props {
  section: Exclude<PageType, 'search'>;
  defaultSortType: string;
  titleRef: RefObject<HTMLHeadingElement>;
}

export default function CategoryListTopContainer({ section, defaultSortType, titleRef }: Props) {
  const { categoryNo, site: mainSite } = useCategoriesPageQueries();
  const { data: categoryData, status: fetchCategoryStatus } = useCategory({ categoryNo });

  const { data: productsData } = useProductList({
    section,
    code: categoryNo,
    defaultSortType,
  });

  const router = useRouter();
  const { pathname, query } = router;

  const handleMenuChange = (code: string, name: string) => {
    router
      .push(
        {
          pathname: pathname,
          query: {
            ...query,
            filters: null,
            page: 1,
            categoryNo: code,
            ...(mainSite === 'BEAUTY' && { site: 'beauty' }),
          },
        },
        undefined,
        { scroll: false },
      )
      .then(() => {
        if (titleRef && titleRef.current) {
          const $headerHeight = document.getElementById('header')?.clientHeight ?? 0;
          titleRef.current.scrollIntoView();
          window.scrollBy(0, -$headerHeight - PRODUCT_LIST_HEADING_TOP_MARGIN);
        }

        amplitudeService.logEvent(
          new SelectCategoryMenu({
            rootCategory: {
              code: categoryData?.rootCategory.code ?? '',
              name: categoryData?.rootCategory.name ?? '',
            },
            siblingCategory: {
              code,
              name,
            },
          }),
        );
      });
  };

  const handleClickBanner = (url: string) => {
    amplitudeService.logEvent(
      new SelectCategoryBanner({
        url,
        rootCategory: {
          code: categoryData?.rootCategory.code ?? '',
          name: categoryData?.rootCategory.name ?? '',
        },
        siblingCategory: {
          code: categoryData?.code ?? '',
          name: categoryData?.name ?? '',
        },
      }),
    );
  };

  if (!categoryData || fetchCategoryStatus === 'error') {
    return null;
  }

  return (
    <>
      {!isEmpty(categoryData.rootCategory.banner) ? (
        <Banner
          key={categoryNo}
          banner={categoryData.rootCategory.banner}
          site={mainSite}
          onClickBanner={handleClickBanner}
          productTotal={productsData?.meta.pagination.total}
          titleRef={titleRef}
        />
      ) : null}
      <PageTitle ref={titleRef}>{categoryData.rootCategory.name}</PageTitle>
      {fetchCategoryStatus === 'success' && categoryData ? (
        <Menu
          parentCategoryNo={categoryData.parentCodes.length > 0 ? categoryData.parentCodes[0] : categoryData.code}
          isShowAll={categoryData.isShowAll}
          onMenuChange={handleMenuChange}
        />
      ) : null}
    </>
  );
}
