import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { format } from 'date-fns';

import COLOR from '../../../shared/constant/colorset';
import { CurrentKurlyPass, KurlyPassStatusTextMap } from '../../../shared/interfaces';

const Wrapper = styled.div<{ isPC: boolean }>`
  background-color: ${COLOR.bg};
  ${({ isPC }) =>
    isPC
      ? css`
          padding: 30px 0;
        `
      : css`
          position: relative;
          height: 193px;
          padding: 20px 64px 20px 64px;
          box-sizing: border-box;
          background-image: url('https://res.kurly.com/mobile/service/kurlypass/1904/bg_ticket_left_f4f4f4.png'),
            url('https://res.kurly.com/mobile/service/kurlypass/1904/bg_ticket_right_f4f4f4.png');
          background-position: 0 0, 100% 0;
          background-repeat: no-repeat;
          background-size: auto 100%;
        `}
`;

const Inner = styled.div<{ isPC: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${({ isPC }) =>
    isPC
      ? css`
          position: relative;
          width: 386px;
          height: 210px;
          padding: 35px 40px 40px 35px;
          margin: 0 auto;
          background: url('https://res.kurly.com/mobile/service/kurlypass/1805/bg_kurlypass_ticket.png') no-repeat 0 0;
          background-size: 386px 210px;
        `
      : css`
          height: 100%;
          padding: 20px 0;
          background-color: ${COLOR.kurlyWhite};
          box-sizing: border-box;
        `}
`;

const Detail = styled.div<{ isPC: boolean }>`
  ${({ isPC }) =>
    isPC
      ? css``
      : css`
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: -25px;
        `}
`;

const Subject = styled.img<{ isPC: boolean }>`
  display: inline-block;
  width: ${({ isPC }) => (isPC ? '128px' : '101px')};
  height: ${({ isPC }) => (isPC ? '65px' : '52px')};
`;

const Period = styled.p<{ isPC: boolean }>`
  ${({ isPC }) =>
    isPC
      ? css`
          padding-top: 33px;
          font-weight: 700;
          font-size: 14px;
          line-height: 20px;
        `
      : css`
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
        `}
`;

const NextBilling = styled.span<{ isExpired?: boolean }>`
  display: block;
  font-weight: 400;
  color: ${({ isExpired }) => (isExpired ? COLOR.invalidRed : COLOR.kurlyGray600)};
`;

const Status = styled.span<{ isPC: boolean }>`
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  border-left: 1px solid #e6d097;
  color: ${COLOR.kurlyPurple};
  letter-spacing: 0.5px;
  white-space: nowrap;
  line-height: 20px;

  ${({ isPC }) =>
    isPC
      ? css`
          font-size: 12px;
        `
      : css`
          margin-right: -30px;
          font-weight: 600;
          font-size: 16px;
          border-left-width: 2px;
        `}
`;

interface Props {
  currentKurlyPass?: CurrentKurlyPass;
  isPC: boolean;
}

export default function BillingInfo({ currentKurlyPass, isPC }: Props) {
  if (!currentKurlyPass) {
    return null;
  }

  const { startDate, endDate, expiredDate, isExpired, status } = currentKurlyPass;

  return (
    <Wrapper data-testid="billing-info" isPC={isPC}>
      <Inner isPC={isPC}>
        <Detail isPC={isPC}>
          <Subject
            isPC={isPC}
            src="https://res.kurly.com/mobile/service/kurlypass/1805/tit_kurlypass.png"
            alt="KURLY PASS"
          />
          <Period isPC={isPC}>
            {`사용기간 ${format(new Date(startDate), 'yy.MM.dd')} - ${format(new Date(endDate), 'yy.MM.dd')}`}
            <NextBilling isExpired={isExpired}>
              {`(${
                isExpired
                  ? `${format(new Date(expiredDate), 'yyyy.MM.dd')} 만료`
                  : `결제예정일 ${format(new Date(endDate), 'yyyy.MM.dd')}`
              })`}
            </NextBilling>
          </Period>
        </Detail>
        <Status isPC={isPC}>{KurlyPassStatusTextMap[status]}</Status>
      </Inner>
    </Wrapper>
  );
}
