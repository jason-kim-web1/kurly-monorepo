import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { format, parseISO } from 'date-fns';
import { isUndefined } from 'lodash';
import type { QueryKey } from '@tanstack/react-query';

import { amplitudeService, ScreenName } from '../../../../../shared/amplitude';
import { ViewReviewDetail } from '../../../../../shared/amplitude/events/review';
import { QuestionMark } from '../../../../../shared/icons';
import { useAppSelector } from '../../../../../shared/store';

import type { ProductReview } from '../../ProductReview.service';
import ReviewModal from '../ReviewModal/ReviewModal';
import ReviewModalImagContent from '../ReviewModal/ReviewModalImagContent';
import ReviewModalPostContent from '../ReviewModal/ReviewModalPostContent';
import ReviewComment from '../../components/ReviewComment';
import HelpfulButton from '../HelpfulButton';

import COLOR from '../../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../../shared/utils';
import { ReviewContentGrid } from '../ReviewModal/styled-components';
import type { ProductReviewSortType } from '../../types';
import { ignoreError } from '../../../../../shared/utils/general';
import { parseQueryString } from '../../../../../shared/utils/parseQueryString';
import NextImage from '../../../../../shared/components/NextImage';
import { hiddenScrollBar } from '../../../../../shared/utils/hidden-scrollbar';
import { Badges } from '../../../../review/components/Badges';

const Alert = styled.div`
  position: absolute;
  display: none;
  bottom: -78px;
  padding: 12px;
  width: 317px;
  border: 1px solid ${COLOR.kurlyGray800};
  border-radius: 4px;
  background-color: ${COLOR.kurlyWhite};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const Contents = styled.p`
  padding-top: 12px;
  padding-right: 20px;
  word-break: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
`;

const DealProductName = styled.h3`
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: ${COLOR.kurlyGray450};
  ${multiMaxLineText(1)}
`;

const DistinctContentsNotice = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 14px;
  height: 14px;

  :hover div {
    display: block;
  }
`;

const ImageButton = styled.button`
  width: 93px;
  height: 93px;
  &:first-of-type > span {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &:last-of-type > span {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const ProductName = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 19px;
  padding-right: 20px;
`;

const View = styled.div`
  display: flex;
  padding: 30px 0 19px 20px;
  border-bottom: 1px solid ${COLOR.bg};
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
`;

const ProfileWrapper = styled.div`
  flex: 0 0 225px;
`;

const AboutUser = styled.div`
  display: flex;
  align-items: center;
  margin: -1px 0 7px;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const Profile = styled.p`
  padding-top: 2px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
`;

const ContentsWrapper = styled.article`
  flex: 1;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  ${hiddenScrollBar({ x: 'auto', y: 'hidden' })}
  padding: 15px 0 2px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 19px;
  padding-right: 20px;
`;

const ReviewDate = styled.span`
  color: ${COLOR.kurlyGray450};
`;

interface Props extends ProductReview {
  sortType: ProductReviewSortType;
  queryKey: QueryKey;
}

export default function ReviewRow({ sortType, queryKey, ...review }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { productCode } = parseQueryString(router.query);
  const productData = useAppSelector(({ productDetail }) => productDetail);
  const { productSites } = productData;
  const { beautyProfile, marketProfile } = review.profiles;

  const handleClick = (index: number) => () => {
    ignoreError(() => {
      amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_SUBTAB);
      amplitudeService.logEvent(
        new ViewReviewDetail({
          reviewData: review,
          sortType,
          productData,
        }),
      );
      amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_DETAIL);
    });
    setSelectedIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <View>
        <ProfileWrapper>
          <AboutUser>
            <Badges type={review.type} grade={review.reviewerGrade} isMembership={review.isMembership} />
            <UserName>{review.reviewer}</UserName>
          </AboutUser>
          {productSites?.includes('BEAUTY') && (
            <Profile>
              <span>{beautyProfile || marketProfile}</span>
            </Profile>
          )}
        </ProfileWrapper>
        <ContentsWrapper>
          <div>
            <ProductName>
              <DealProductName>{review.dealProductName}</DealProductName>
              {Number(productCode) !== review.contentsProductNo ? (
                <DistinctContentsNotice>
                  <QuestionMark stroke={COLOR.kurlyGray350} fill={COLOR.kurlyGray350} />
                  <Alert>
                    이 후기는 판매구성이 다르지만 본품이 동일한 상품을 구매 후 작성된 후기입니다. 판매구성에 따라 용량,
                    구성, 상품명 등 일부 정보가 상이할 수 있습니다.
                  </Alert>
                </DistinctContentsNotice>
              ) : null}
            </ProductName>
            <Contents>{review.contents}</Contents>
            {review.images.length > 0 && (
              <ImageWrapper>
                {review.images.map(({ id: imageId, url, reviewSquareSmallUrl }, index) => (
                  <ImageButton key={`${imageId}-${index}`} onClick={handleClick(index)}>
                    <NextImage
                      src={reviewSquareSmallUrl || url}
                      width={93}
                      height={93}
                      objectFit="cover"
                      alt="리뷰 이미지 썸네일"
                    />
                  </ImageButton>
                ))}
              </ImageWrapper>
            )}
            <Footer>
              <div>
                {review.registrationDate ? (
                  <ReviewDate>{format(parseISO(review.registrationDate), 'yyyy.MM.dd')}</ReviewDate>
                ) : null}
              </div>
              <HelpfulButton
                queryKey={queryKey}
                reviewId={review.id}
                sortType={sortType}
                count={review.likeCount}
                isChecked={review.hasLiked}
              />
            </Footer>
          </div>
          {!isUndefined(review.comment) ? <ReviewComment {...review.comment} /> : null}
        </ContentsWrapper>
      </View>
      <ReviewModal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <ReviewContentGrid>
          <ReviewModalImagContent images={review.images} initialSelectedIndex={selectedIndex} />
          <ReviewModalPostContent {...review} queryKey={queryKey} reviewType="POST" sortType={sortType} />
        </ReviewContentGrid>
      </ReviewModal>
    </>
  );
}
