import styled from '@emotion/styled';

import { zIndex } from '../../../../../shared/styles';

import COLOR from '../../../../../shared/constant/colorset';

import MenuItem from './MenuItem';
import { productDetailSubtabEvent } from '../../../shared/utils/productDetailEvent';
import { useAppSelector } from '../../../../../shared/store';
import type { ProductDetailMenuType } from '../../../types';

const Container = styled.nav`
  z-index: ${zIndex.productDetailListFilter};
  position: sticky;
  top: 56px;
  width: 1010px;
  box-shadow: inset 0 -0.5px 0 0 ${COLOR.lightGray};
  background-color: ${COLOR.kurlyWhite};
  margin-top: 50px;
`;

const NavigatorWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  height: 60px;
`;

const DESCRIPTION_ACTIVE_OFFSET = -80;

interface Props {
  reviewCount: number;
  isInquiryWritable: boolean;
  isReviewWritable: boolean;
}

export default function Navigator({ reviewCount, isInquiryWritable, isReviewWritable }: Props) {
  const { queryId } = useAppSelector(({ productList }) => productList);

  const handleClickMenu = (content: ProductDetailMenuType) => {
    productDetailSubtabEvent(content, queryId);
  };

  return (
    <Container>
      <NavigatorWrapper>
        <MenuItem
          name="상품설명"
          target="description"
          onClickMenu={handleClickMenu}
          scrollOffset={DESCRIPTION_ACTIVE_OFFSET}
        />
        <MenuItem name="상세정보" target="detail" onClickMenu={handleClickMenu} />
        {isReviewWritable && (
          <MenuItem name="후기" target="review" onClickMenu={handleClickMenu} isCount count={reviewCount} />
        )}
        {isInquiryWritable && <MenuItem name="문의" target="inquiry" onClickMenu={handleClickMenu} />}
      </NavigatorWrapper>
    </Container>
  );
}
