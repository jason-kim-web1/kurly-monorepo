import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { isAfter, isBefore, parseISO } from 'date-fns';

import { isPC } from '../../../../../util/window/getDevice';

import { getGiftDeliveryNoticeItem } from '../../../service/product.service';

const Container = styled.div<{ isPC: boolean }>`
  padding: ${isPC ? '0 60px' : '0 16px'};
  margin: ${isPC ? '30px 0 100px' : '20px 0 50px'};
`;

const Image = styled.img`
  width: 100%;
`;

export default function GiftDeliveryNotice() {
  const [displayNotice, setDisplayNotice] = useState(false);

  useEffect(() => {
    const getGitfNotice = async () => {
      const { startDay, endDay } = await getGiftDeliveryNoticeItem();

      if (!startDay && !endDay) {
        return;
      }

      const isEventDay = isAfter(new Date(), parseISO(startDay)) && isBefore(new Date(), parseISO(endDay));

      setDisplayNotice(isEventDay);
    };

    getGitfNotice();
  }, []);

  if (!displayNotice) {
    return null;
  }

  return (
    <Container isPC={isPC}>
      <Image
        src={`https://res.kurly.com/images/gift/202209/gift_notice_${isPC ? 'pc' : 'm'}.jpg`}
        alt="명절 선물하기 공지"
      />
    </Container>
  );
}
