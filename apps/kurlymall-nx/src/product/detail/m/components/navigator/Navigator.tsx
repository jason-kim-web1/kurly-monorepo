import styled from '@emotion/styled';

import { useCallback } from 'react';

import { useRouter } from 'next/router';

import COLOR from '../../../../../shared/constant/colorset';
import { zIndex } from '../../../../../shared/styles';

import { ProductDetailContentType } from '../../../types';

import MenuItem from './MenuItem';
import useBannerView from '../../../../../shared/hooks/useBannerView';
import { productDetailSubtabEvent } from '../../../shared/utils/productDetailEvent';
import { useAppSelector } from '../../../../../shared/store';
import { compareCountWithLimit } from '../../../../../shared/utils/compare';
import { REVIEW_LIMIT_COUNT } from '../../../../../shared/constant';

const MenuList = styled.nav<{ isBanner: boolean }>`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  width: 100%;
  height: 44px;
  padding-top: 44px;
  background-color: ${COLOR.kurlyWhite};
  z-index: ${zIndex.mobileHeader};
`;

interface Props {
  reviewCount: number;
  selectedContent: ProductDetailContentType;
  isReviewWritable: boolean;
  isInquiryWritable: boolean;
}

export default function Navigator({ reviewCount, selectedContent, isReviewWritable, isInquiryWritable }: Props) {
  const router = useRouter();

  const { queryId } = useAppSelector(({ productList }) => productList);

  const { bannerView } = useBannerView();

  const onClickContentMenu = useCallback(
    (content: ProductDetailContentType) => {
      const { productCode } = router.query;
      router.replace(
        {
          query: { ...router.query, tab: content },
        },
        `/goods/${productCode}?tab=${content}`,
        { shallow: true, scroll: true },
      );
      productDetailSubtabEvent(content, queryId);
    },
    [router, queryId],
  );

  const navigatorOffsetTop = bannerView ? -42 : -4;

  const reviewCountText = isReviewWritable ? compareCountWithLimit(reviewCount, REVIEW_LIMIT_COUNT) : '0';

  return (
    <MenuList isBanner={bannerView}>
      <MenuItem
        name="상품설명"
        value={ProductDetailContentType.DESCRIPTION}
        selected={ProductDetailContentType.DESCRIPTION === selectedContent}
        onClickContentMenu={onClickContentMenu}
        navigatorOffsetTop={navigatorOffsetTop}
      />
      <MenuItem
        name="상세정보"
        value={ProductDetailContentType.DETAIL}
        selected={ProductDetailContentType.DETAIL === selectedContent}
        onClickContentMenu={onClickContentMenu}
        navigatorOffsetTop={navigatorOffsetTop}
      />
      {isReviewWritable && (
        <MenuItem
          name="후기"
          value={ProductDetailContentType.REVIEW}
          selected={ProductDetailContentType.REVIEW === selectedContent}
          onClickContentMenu={onClickContentMenu}
          navigatorOffsetTop={navigatorOffsetTop}
          isCount
          count={reviewCountText}
        />
      )}
      {isInquiryWritable && (
        <MenuItem
          name="문의"
          value={ProductDetailContentType.INQUIRY}
          selected={ProductDetailContentType.INQUIRY === selectedContent}
          onClickContentMenu={onClickContentMenu}
          navigatorOffsetTop={navigatorOffsetTop}
        />
      )}
    </MenuList>
  );
}
