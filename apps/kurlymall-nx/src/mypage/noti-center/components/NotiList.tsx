import styled from '@emotion/styled';
import { Fragment } from 'react';

import COLOR from '../../../shared/constant/colorset';
import NotiItemCard from './NotiItemCard';
import { NotificationItem } from '../../../shared/interfaces/Notification';

const Container = styled.div`
  padding: 16px 20px;
`;

const TitleBox = styled.div`
  padding: 28px 20px 0;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.2px;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: ${COLOR.kurlyGray150};
`;

export default function NotiList({
  title,
  list,
  showCategoryName,
}: {
  title?: string;
  list: NotificationItem[];
  showCategoryName?: boolean;
}) {
  return (
    <>
      {title && (
        <TitleBox>
          <Title>{title}</Title>
        </TitleBox>
      )}
      <Container>
        {list.map((item, idx) => (
          <Fragment key={item.id}>
            <NotiItemCard item={item} showCategoryName={showCategoryName} />
            {idx < list.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Container>
    </>
  );
}
