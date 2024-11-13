import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { format, parseISO } from 'date-fns';
import { isEmpty } from 'lodash';
import type { QueryKey } from '@tanstack/react-query';

import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { ViewReviewDetail } from '../../../../../shared/amplitude/events/review';
import { useAppSelector } from '../../../../../shared/store';
import { QuestionMark, Close } from '../../../../../shared/icons';
import COLOR from '../../../../../shared/constant/colorset';

import type { ProductReview } from '../../ProductReview.service';
import type { ProductReviewSortType } from '../../types';
import HelpfulButton from '../../pc/HelpfulButton';
import ReviewComment from '../../components/ReviewComment';
import { hiddenScrollBar } from '../../../../../shared/utils/hidden-scrollbar';
import { redirectTo } from '../../../../../shared/reducers/page';
import NextImage from '../../../../../shared/components/NextImage';
import { zIndex } from '../../../../../shared/styles';
import { Badges } from '../../../../review/components/Badges';

interface Props extends ProductReview {
  sortType: ProductReviewSortType;
  queryKey: QueryKey;
}

const ProductDealToolTipWrapper = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;

  button {
    width: 16px;
    height: 16px;
    margin-left: 4px;
  }
`;

const Contents = styled.p`
  padding: 10px 0 14px;
  word-break: break-word;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
  white-space: pre-wrap;
`;

const ProductName = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageSlider = styled.div`
  display: flex;
  gap: 2px;
  flex-wrap: nowrap;
  padding: 10px 16px 0;
  margin: 0 -16px;
  overflow: auto;
  ${hiddenScrollBar({ x: 'auto', y: 'hidden' })}
  > span {
    flex-shrink: 0;
    :first-of-type {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    :last-of-type {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

const KurlyProfile = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 2px;
`;

const RegistrationDate = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray400};
`;

const Reviewer = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  vertical-align: middle;
  color: ${COLOR.kurlyGray800};
`;

const ToolTip = styled.div`
  position: absolute;
  z-index: ${zIndex.productReviewItemToolTip};
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: self-start;
  gap: 10px;
  width: calc(100% - 32px);
  max-width: 543px;
  padding: 12px;
  margin: 0 16px;
  border: 1px solid ${COLOR.kurlyGray800};
  border-radius: 4px;
  background-color: ${COLOR.kurlyWhite};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const View = styled.div`
  padding: 20px 0 11px;
  border-bottom: 1px solid ${COLOR.kurlyGray150};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-bottom: 14px;
`;

export default function ReviewItem({ sortType, queryKey, ...review }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const productData = useAppSelector(({ productDetail }) => productDetail);
  const { productSites } = productData;

  const handleClickReviewImage = (imageId: number) => () => {
    const { productCode } = router.query;
    if (!productCode) {
      return;
    }
    amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
    amplitudeService.logEvent(
      new ViewReviewDetail({
        reviewData: review,
        sortType,
        productData,
      }),
    );
    dispatch(
      redirectTo({
        url: `/goods/${productCode}/review/${review.id}`,
        query: {
          imageId,
        },
      }),
    );
  };

  return (
    <View>
      <Wrapper>
        <Badges type={review.type} grade={review.reviewerGrade} isMembership={review.isMembership} />
        <Reviewer>{review.reviewer}</Reviewer>
      </Wrapper>
      {!isEmpty(review.profiles.beautyProfile) && productSites?.includes('BEAUTY') ? (
        <KurlyProfile>
          <div>
            <span>{review.profiles.beautyProfile}</span>
          </div>
        </KurlyProfile>
      ) : null}
      <ProductName>
        {review.dealProductName}
        {Number(router.query.productCode) !== review.contentsProductNo && (
          <ProductDealToolTipWrapper>
            <button onClick={() => setIsOpen(true)}>
              <QuestionMark stroke={COLOR.kurlyGray350} fill={COLOR.kurlyGray350} />
            </button>
            {isOpen && (
              <ToolTip>
                <p>
                  이 후기는 판매구성이 다르지만 본품이 동일한 상품을 구매 후 작성된 후기입니다. 판매구성에 따라 용량,
                  구성, 상품명 등 일부 정보가 상이할 수 있습니다.
                </p>
                <button type="button" onClick={() => setIsOpen(false)}>
                  <Close width={16} height={16} fill={COLOR.kurlyGray800} stroke={COLOR.kurlyGray800} />
                </button>
              </ToolTip>
            )}
          </ProductDealToolTipWrapper>
        )}
      </ProductName>
      {review.images.length > 0 ? (
        <ImageSlider>
          {review.images.map(({ id: imageId, url, reviewSquareSmallUrl }, index) => (
            <NextImage
              key={`${imageId}-${index}`}
              src={reviewSquareSmallUrl || url}
              alt={`review-${review.id}`}
              objectFit="cover"
              layout="fixed"
              width={84}
              height={84}
              onClick={handleClickReviewImage(imageId)}
            />
          ))}
        </ImageSlider>
      ) : null}
      <Contents>{review.contents}</Contents>
      <Footer>
        {review.registrationDate ? (
          <RegistrationDate>{format(parseISO(review.registrationDate), 'yyyy.MM.dd')}</RegistrationDate>
        ) : (
          <span />
        )}
        <HelpfulButton
          queryKey={queryKey}
          reviewId={review.id}
          reviewType="POST"
          sortType={sortType}
          count={review.likeCount}
          isChecked={review.hasLiked}
        />
      </Footer>
      {review.comment && <ReviewComment {...review.comment} />}
    </View>
  );
}
