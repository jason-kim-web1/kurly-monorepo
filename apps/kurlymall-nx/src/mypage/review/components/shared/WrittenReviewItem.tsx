import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { chain, eq, get, head, size, some } from 'lodash';
import { MouseEventHandler, useState } from 'react';

import type { WrittenReviews } from '../../types';
import { Lock } from '../../../../shared/icons';
import COLOR from '../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../shared/utils';
import ReviewTextContent from './ReviewTextContent';
import { Button, ThumbnailImageWrap } from './styled-components';
import NextImage from '../../../../shared/components/NextImage';
import ReviewRowCommentList from './ReviewRowCommentList';
import ThumbsUp from '../../../../shared/components/icons/ThumbsUp';
import { redirectTo } from '../../../../shared/reducers/page';
import { isDefined, isNotEmpty } from '../../../../shared/utils/lodash-extends';
import { useReviewProductLink } from '../../hooks/useReviewProductLink';
import { isPC } from '../../../../../util/window/getDevice';

import ReviewModalProductContent from '../pc/ReviewModal/ReviewModalProductContent';
import ModificationForm from '../pc/ReviewForm/ModificationForm';
import ReviewFormModal from '../pc/ReviewModal';
import { ReviewContentGrid } from '../../../../product/board/review/pc/ReviewModal/styled-components';
import ReviewModalImagContent from '../../../../product/board/review/pc/ReviewModal/ReviewModalImagContent';
import ReviewModalPostContent from '../../../../product/board/review/pc/ReviewModal/ReviewModalPostContent';
import ReviewModal from '../../../../product/board/review/pc/ReviewModal/ReviewModal';
import ReviewGuide from '../shared/ReviewGuide';
import { QueryKeys } from '../../queries';
import Alert from '../../../../shared/components/Alert/Alert';
import { useReview } from '../../../../product/board/review/hooks';
import { ReviewTypeBadge } from '../../../../product/review/components/Badges';

type Props = WrittenReviews['writtenReviews'][number];

const View = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0 9px;
  border-bottom: 1px solid ${COLOR.bg};
`;

const ReviewInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 12px;
  padding-bottom: 7px;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
`;

const DateWrapper = styled.div`
  display: flex;
  span {
    position: relative;
    ::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: -6px;
      height: 12px;
      border-right: 1px solid ${COLOR.lightGray};
      margin: auto;
    }
    :last-of-type::after {
      display: none;
    }
  }
  > span:not(:first-of-type) {
    margin-left: 12px;
  }
`;

const ProductName = styled.p`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
  ${multiMaxLineText(1)}
`;

const SecretPost = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const ImageCount = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 18px;
  height: 18px;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 3px;
  font-weight: 400;
  font-size: 10px;
  line-height: 18px;
  background-color: hsla(0, 0%, 0%, 0.4);
  text-align: center;
  color: ${COLOR.kurlyWhite};
`;

const JustifyBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 11px;
`;

const AlignCenter = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;

export const HelpfulReview = styled.span`
  display: flex;
  align-items: center;

  > span {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: ${COLOR.kurlyGray450};
    margin-left: 4px;
  }
`;

export default function WrittenReviewItem({
  content,
  contentsProductNo,
  dealProductNo,
  dealProductName,
  images,
  likeCount,
  modificationDate,
  registrationDate,
  reviewId,
  type: reviewType,
  visibility,
  comments,
  orderType,
}: Props) {
  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, status } = useReview(contentsProductNo, reviewId, {
    enabled: isModalOpen,
  });
  const [hasEdited, setHasEdited] = useState(false);

  const firstImage = head(images);
  const thumbnailImageUrl = get(firstImage, 'url');
  const reviewSquareSmallUrl = get(firstImage, 'reviewSquareSmallUrl');
  const thumbnailImageId = get(firstImage, 'imageId');
  const imageCount = size(images);
  const productDetailPath = `/goods/${contentsProductNo}`;
  const reviewUrl = `${productDetailPath}/review/${reviewId}?imageId=${thumbnailImageId}&cta=false`;
  const shouldRenderThumbnailImage = some([thumbnailImageUrl, reviewSquareSmallUrl], isNotEmpty);
  const imageUrl = chain([reviewSquareSmallUrl, thumbnailImageUrl]).filter(isDefined).head().value();
  const { onClickReviewProduct } = useReviewProductLink(orderType, contentsProductNo);

  const handleClickProduct: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    onClickReviewProduct();
  };

  const handleClickEditReview = () => {
    if (eq(reviewType, '베스트')) {
      Alert({
        text: '베스트후기로 선정된 후기는 수정하실 수 없습니다. 고객센터로 문의해주세요.',
      });
      return;
    }

    if (isPC) {
      setIsFormOpen(true);
      return;
    }

    dispatch(
      redirectTo({
        url: '/mypage/review/form',
        query: {
          contents: contentsProductNo,
          review: reviewId,
        },
      }),
    );
  };

  const handleDismiss = async () => {
    if (!hasEdited) {
      setIsFormOpen(false);
      return;
    }
    const { isDismissed } = await Alert({
      text: '수정화면을 나가실건가요?\n수정하신 내용은 저장되지 않습니다.',
      showCancelButton: true,
    });
    if (isDismissed) {
      return;
    }
    setIsFormOpen(false);
  };

  return (
    <>
      <View>
        <ReviewInfo>
          {shouldRenderThumbnailImage ? (
            <a href={reviewUrl} onClick={handleClickProduct}>
              <ThumbnailImageWrap isPC={isPC}>
                <NextImage objectFit="cover" src={imageUrl} alt={dealProductName} layout="fill" />
                {imageCount > 1 ? <ImageCount>{imageCount}</ImageCount> : null}
              </ThumbnailImageWrap>
            </a>
          ) : null}
          <div>
            <a href={productDetailPath} onClick={handleClickProduct}>
              <ProductName>{dealProductName}</ProductName>
            </a>
            <DateWrapper>
              {registrationDate ? <span>{format(registrationDate, 'yyyy.MM.dd')} 작성</span> : null}
              {modificationDate ? <span>{format(modificationDate, 'yyyy.MM.dd')} 수정</span> : null}
              {visibility !== 'PUBLIC' ? (
                <SecretPost>
                  <Lock fill={COLOR.kurlyGray400} />
                  비공개
                </SecretPost>
              ) : null}
            </DateWrapper>
          </div>
        </ReviewInfo>
        <ReviewTextContent content={content} />
        <JustifyBetween>
          <AlignCenter>
            <ReviewTypeBadge type={reviewType} />
            {likeCount > 0 && (
              <HelpfulReview>
                <ThumbsUp width={12} height={12} />
                <span>도움돼요 {likeCount.toLocaleString()}</span>
              </HelpfulReview>
            )}
          </AlignCenter>
          <Button onClick={handleClickEditReview}>후기수정</Button>
        </JustifyBetween>
        <ReviewRowCommentList comments={comments} />
      </View>
      {isPC ? (
        <>
          <ReviewFormModal title="후기 수정" isOpen={isFormOpen} onDismiss={handleDismiss}>
            <ReviewModalProductContent
              contentsProductNo={contentsProductNo}
              dealProductNo={dealProductNo}
              isModification
            />
            <ReviewGuide />
            <ModificationForm
              contentsProductNo={contentsProductNo}
              reviewNo={reviewId}
              contents={content}
              images={images.map(({ imageId, url, reviewSquareSmallUrl: smallUrl }) => ({
                imageId,
                url,
                reviewSquareSmallUrl: smallUrl,
              }))}
              visibility={visibility}
              onDismiss={() => setIsFormOpen(false)}
              onChangeForm={setHasEdited}
            />
          </ReviewFormModal>
          <ReviewModal isOpen={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
            {status === 'success' && !!data ? (
              <ReviewContentGrid>
                <ReviewModalImagContent
                  images={images.map((image) => ({
                    id: image.imageId,
                    url: image.url,
                    reviewSquareSmallUrl: image.reviewSquareSmallUrl,
                  }))}
                />
                <ReviewModalPostContent queryKey={QueryKeys.base()} reviewType={'POST'} {...data} />
              </ReviewContentGrid>
            ) : null}
          </ReviewModal>
        </>
      ) : null}
    </>
  );
}
