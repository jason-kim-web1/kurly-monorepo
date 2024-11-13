import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { differenceInDays, format } from 'date-fns';

import { useQueryClient } from '@tanstack/react-query';

import { amplitudeService, ScreenName } from '../../../../shared/amplitude';
import { SelectWriteReview } from '../../../../shared/amplitude/events/review';
import { multiMaxLineText } from '../../../../shared/utils';
import COLOR from '../../../../shared/constant/colorset';
import { Button, ThumbnailImageWrap } from './styled-components';
import { WritableReviews } from '../../types';
import NextImage from '../../../../shared/components/NextImage';
import { redirectTo } from '../../../../shared/reducers/page';
import { useReviewProductLink } from '../../hooks/useReviewProductLink';
import { isPC } from '../../../../../util/window/getDevice';
import ReviewModal from '../pc/ReviewModal';
import ReviewModalProductContent from '../pc/ReviewModal/ReviewModalProductContent';
import RegistrationForm from '../pc/ReviewForm/RegistrationForm';
import ReviewInstructionContent from '../pc/ReviewModal/ReviewInstructionContent';
import { useWrittenReviewCount } from '../../hooks';
import { logReviewRegisterNotification, logReviewRegisterNotificationSelect } from '../../ProductReview.service';
import Alert, { checkClosedByBackDrop } from '../../../../shared/components/Alert/Alert';
import { ALERT_MESSAGES } from '../../constants';
import { SELECTION_TYPES } from '../../../../shared/amplitude/events/review/SelectSubmitReviewNotification';
import { ignoreError } from '../../../../shared/utils/general';
import { QueryKeys } from '../../queries';
import ReviewGuide from './ReviewGuide';

type Props = WritableReviews['orderedProducts'][number];
const LOCAL_STORAGE_KEY = 'HAS_CONFIRMED_REVIEW_INSTRUCTION';

const ProductInfo = styled.div`
  display: flex;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const View = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 0 10px;
  border-bottom: 1px solid ${COLOR.bg};
`;

const ThumbnailLink = styled.a`
  margin-right: 12px;
`;

const ProductDetail = styled.div`
  flex-grow: 1;
  padding-top: 5px;
`;

const ProductName = styled.p`
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.kurlyGray800};
  ${multiMaxLineText(1)}
`;

const ReviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -1px;
`;

const ExpiryDate = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: ${COLOR.invalidRed};

  span:first-of-type {
    padding-right: 6px;
    color: ${COLOR.kurlyGray600};
  }
`;

const currentDate = Date.now();

export default function WritableReviewItem({
  contentsProductNo,
  dealProductName,
  dealProductNo,
  expirationDate,
  orderNo,
  shippedDate,
  thumbnailImage,
  productVerticalSmallUrl,
  orderType,
}: Props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: writtenReviewCount } = useWrittenReviewCount();
  const expirationDays = useMemo(() => differenceInDays(expirationDate, currentDate), [expirationDate]);
  const productDetailPath = `/goods/${contentsProductNo}`;
  const isExpiredWithinWeek = expirationDays <= 7;
  const { onClickReviewProduct } = useReviewProductLink(orderType, contentsProductNo);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const modalTitle = hasConfirmed ? '후기 작성' : '후기 작성 시 유의사항';
  const hasWrittenReview = !!writtenReviewCount && writtenReviewCount.count > 0;

  const handleClickProduct: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    onClickReviewProduct();
  };

  const handleClickWriteReview = () => {
    amplitudeService.setScreenName(ScreenName.MY_REVIEWABLE_LIST);
    amplitudeService.logEvent(new SelectWriteReview());

    if (isPC) {
      setIsFormOpen(true);
      return;
    }

    dispatch(
      redirectTo({
        url: '/mypage/review/form',
        query: {
          order: orderNo,
          contents: contentsProductNo,
          deal: dealProductNo,
        },
      }),
    );
  };

  const handleDismiss = async () => {
    if (isTouched) {
      logReviewRegisterNotification('NULL');
      const { isDismissed, dismiss } = await Alert({
        text: ALERT_MESSAGES.CONFIRM_LEAVE_REGISTRATION_FORM,
        showCancelButton: true,
      });
      const isChooseNothing = checkClosedByBackDrop(dismiss);
      if (isDismissed || isChooseNothing) {
        logReviewRegisterNotificationSelect('NULL', SELECTION_TYPES.EDIT);
        return;
      }
      logReviewRegisterNotificationSelect('NULL', SELECTION_TYPES.BACK);
    }
    setIsFormOpen(false);
    await amplitudeService.setScreenName(ScreenName.PRODUCT_REVIEW_WRITING);
  };

  const handleConfirm = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, String(true));
    setHasConfirmed(true);
  };

  const handleReviewWriteSuccess = async () => {
    ignoreError(async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.base(),
      });
    });
    await Alert({ text: ALERT_MESSAGES.REVIEW_WRITE_SUCCESS, allowOutsideClick: false });
  };

  useEffect(() => {
    if (isPC) {
      const hasConfirmedInstruction = Boolean(localStorage.getItem(LOCAL_STORAGE_KEY));
      setHasConfirmed(hasConfirmedInstruction || hasWrittenReview);
    }
  }, [hasWrittenReview, isFormOpen]);

  return (
    <>
      <View>
        <ProductInfo>
          <ThumbnailLink href={productDetailPath} onClick={handleClickProduct}>
            <ThumbnailImageWrap isPC={isPC}>
              <NextImage
                objectFit="cover"
                src={productVerticalSmallUrl || thumbnailImage}
                alt={dealProductName}
                layout="fill"
              />
            </ThumbnailImageWrap>
          </ThumbnailLink>
          <ProductDetail>
            <a href={productDetailPath} onClick={handleClickProduct}>
              <ProductName>{dealProductName}</ProductName>
            </a>
            {shippedDate && <span>{format(shippedDate, 'yyyy.MM.dd')} 배송완료</span>}
            <ReviewInfo>
              <ExpiryDate>
                {expirationDate && <span>{format(expirationDate, 'MM.dd')}까지 작성 가능</span>}
                {isExpiredWithinWeek && <span>{expirationDays > 0 ? `${expirationDays}일 남음` : '오늘까지'}</span>}
              </ExpiryDate>
              <Button onClick={handleClickWriteReview}>후기작성</Button>
            </ReviewInfo>
          </ProductDetail>
        </ProductInfo>
      </View>
      {isPC && (
        <ReviewModal
          title={modalTitle}
          isOpen={isFormOpen}
          onDismiss={hasWrittenReview || hasConfirmed ? handleDismiss : undefined}
        >
          {hasConfirmed ? (
            <div>
              <ReviewModalProductContent contentsProductNo={contentsProductNo} dealProductNo={dealProductNo} />
              <ReviewGuide />
              <RegistrationForm
                orderNo={orderNo}
                dealProductNo={dealProductNo}
                onTouch={setIsTouched}
                onDismiss={() => setIsFormOpen(false)}
                onSuccess={handleReviewWriteSuccess}
              />
            </div>
          ) : (
            <ReviewInstructionContent onClick={handleConfirm} />
          )}
        </ReviewModal>
      )}
    </>
  );
}
