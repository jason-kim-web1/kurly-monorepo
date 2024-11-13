import styled from '@emotion/styled';
import { differenceInMinutes, format, isToday } from 'date-fns';
import { Fragment, SyntheticEvent, useMemo } from 'react';

import COLOR from '../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../shared/utils';
import { NotificationItem } from '../../../shared/interfaces/Notification';
import { categoryNames } from '../constants/category.constant';
import { NoProductImageLogo } from '../../../shared/images';

const CardLink = styled.a`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  padding-right: 14px;
`;

const CardTitle = styled.h3`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: -0.2px;
  ${multiMaxLineText(1)};
`;

const CardContents = styled.p`
  margin-bottom: 4px;
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  color: ${COLOR.kurlyGray600};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const CategoryDateBlock = styled.div`
  display: flex;
  margin-bottom: 4px;
  font-weight: 400;
  color: ${COLOR.kurlyGray450};
  font-size: 12px;
  line-height: 16px;
  align-items: center;
`;

const DividerDot = styled.div`
  margin: 0 4px;
  width: 2px;
  height: 2px;
  borderradius: 1px;
  background-color: ${COLOR.kurlyGray350};
`;

const Thumbnail = styled.img`
  border-radius: 4px;
  object-fit: cover;
  background-color: ${COLOR.kurlyGray150};
`;

const ThumbnailWrapper = styled.div`
  flex-shrink: 0;
`;

function getDateLabel(dateTime: Date) {
  if (isToday(dateTime)) {
    const diffMin = differenceInMinutes(Date.now(), dateTime);
    if (diffMin < 1) {
      return '방금';
    } else if (diffMin < 60) {
      return `${diffMin}분 전`;
    } else {
      return `${Math.round(diffMin / 60)}시간 전`;
    }
  } else {
    return format(dateTime, 'M월 d일');
  }
}

const handleImageError = ({ currentTarget }: SyntheticEvent<HTMLImageElement>) => {
  currentTarget.src = NoProductImageLogo;
};

export default function NotiItemCard({
  item: { title, contents, imageUrl, landingLink, notificationCategory, createdAt, hideDate },
  showCategoryName,
}: {
  item: NotificationItem;
  showCategoryName?: boolean;
}) {
  const categoryDate = useMemo(() => {
    const result: string[] = [];
    if (showCategoryName) {
      result.push(categoryNames[notificationCategory]);
    }
    if (!hideDate) {
      result.push(getDateLabel(createdAt));
    }
    return result;
  }, [createdAt, hideDate, notificationCategory, showCategoryName]);

  return (
    <CardLink href={landingLink}>
      <Container>
        <CardTitle>{title}</CardTitle>
        <CardContents>{contents.split('\n').flatMap((x, idx) => (idx > 0 ? [<br key={idx} />, x] : x))}</CardContents>
        <CategoryDateBlock>
          {categoryDate.map((text, idx) => (
            <Fragment key={text + idx}>
              {idx > 0 && <DividerDot />}
              <span>{text}</span>
            </Fragment>
          ))}
        </CategoryDateBlock>
      </Container>
      {imageUrl && (
        <ThumbnailWrapper>
          <Thumbnail src={imageUrl} width={64} height={64} onError={handleImageError} />
        </ThumbnailWrapper>
      )}
    </CardLink>
  );
}
