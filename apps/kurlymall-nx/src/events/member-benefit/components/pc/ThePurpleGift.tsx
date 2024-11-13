import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { LoversBenefitInfo } from '../../../../shared/api/events/member/benefit.api';
import NextImage from '../../../../shared/components/NextImage';
import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';
import GiftHistory from './GiftHistory';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div<{ giftBackgroundColor: string }>`
  background-color: ${({ giftBackgroundColor }) => (giftBackgroundColor ? giftBackgroundColor : COLOR.kurlyWhite)};
`;

const GiftInfo = styled.div`
  width: 780px;
  margin: 0 auto;
`;

const GiftImage = styled.div`
  > span {
    position: unset !important;
    > img {
      position: static !important;
      height: auto !important;
    }
  }
`;

interface Props {
  loversBenefitInfo: LoversBenefitInfo;
}

export default function ThePurpleGift({ loversBenefitInfo }: Props) {
  const { title, giftName, giftDescription, giftImgPC, giftHistory, currentMonthGift, giftBackgroundColor } =
    loversBenefitInfo;

  return (
    <Container giftBackgroundColor={giftBackgroundColor}>
      <GiftInfo>
        <ScreenOut>
          <h3>{title}</h3>
        </ScreenOut>
        <GiftImage>
          <NextImage src={giftImgPC} layout="fill" objectFit="contain" alt={giftName} />
        </GiftImage>
        <ScreenOut>
          <p>{giftDescription}</p>
        </ScreenOut>
      </GiftInfo>
      {!isEmpty(giftHistory) && <GiftHistory giftHistory={giftHistory} currentMonthGift={currentMonthGift} />}
    </Container>
  );
}
