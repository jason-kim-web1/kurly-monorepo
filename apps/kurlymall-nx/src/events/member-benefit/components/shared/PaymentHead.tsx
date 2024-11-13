import styled from '@emotion/styled';

import { PaymentBenefitsHead } from '../../../../shared/api/events/member/benefit.api';
import NextImage from '../../../../shared/components/NextImage';
import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import { responsiveClass } from '../../shared/constants';

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  .title {
    display: flex;
    align-items: center;
  }
  .date {
    font-size: 12px;
  }

  &.mobile {
    padding: 30px 20px;

    .title {
      flex-direction: row-reverse;
      gap: 10px;
      font-weight: 600;
      font-size: 24px;
      letter-spacing: -0.6px;
    }
    .date {
      padding-top: 4px;
    }
  }

  &.pc {
    align-items: center;
    padding: 65px 0 25px;
    border-bottom: 1px solid ${COLOR.kurlyGray200};

    .title {
      gap: 12px;
      font-weight: 500;
      font-size: 31px;
      letter-spacing: -1.5px;
    }
    .date {
      padding-top: 0;
    }
  }
`;

const IconWrap = styled.div<{ width: string; height: string }>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: 2px;

  span {
    border-radius: 4px;
    vertical-align: top;
  }
`;

interface Props {
  paymentHead: PaymentBenefitsHead;
}

export default function PaymentHead({ paymentHead }: Props) {
  const { headTitle, headText, iconUrl, pcIconWidth, pcIconHeight, moWebIconWidth, moWebIconHeight, benefitDate } =
    paymentHead;

  const iconWidth = isPC ? pcIconWidth : moWebIconWidth;
  const iconHeight = isPC ? pcIconHeight : moWebIconHeight;

  return (
    <Container className={responsiveClass}>
      <div className="title">
        {headText}
        <IconWrap width={iconWidth} height={iconHeight}>
          <NextImage src={iconUrl} layout="fill" objectFit="contain" alt={headTitle} />
        </IconWrap>
      </div>
      <div className="date">{benefitDate}</div>
    </Container>
  );
}
