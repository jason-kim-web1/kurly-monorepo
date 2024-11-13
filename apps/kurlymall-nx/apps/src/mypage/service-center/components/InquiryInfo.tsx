import styled from '@emotion/styled';

import { ReactNode } from 'react';

import COLOR from '../../../shared/constant/colorset';
import { CallIconBlack } from '../../../shared/images';
import { amplitudeService } from '../../../shared/amplitude';
import { AmplitudeEvent } from '../../../shared/amplitude/AmplitudeEvent';
import { Payload } from '../../../shared/amplitude/events/mypage';

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  &:nth-of-type(2) {
    padding-top: 24px;
  }
`;

const InfoText = styled.div`
  line-height: 19px;
`;

const Title = styled.h3`
  padding-bottom: 4px;
  font-weight: 600;
  font-size: 16px;
`;

const Text = styled.span`
  display: block;
  color: ${COLOR.kurlyGray450};
  letter-spacing: -0.5px;
`;

const CallLink = styled.a`
  height: 40px;
  padding: 0 12px;
  font-weight: 600;
  font-size: 13px;
  line-height: 40px;
  border-radius: 6px;
  background-color: ${COLOR.btnGray};
  color: ${COLOR.kurlyBlack};
  vertical-align: top;
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 4px;
    background: url(${CallIconBlack}) no-repeat 50% 50%;
    background-size: 10px 10px;
  }
`;

export type Props = {
  title: string;
  call?: string;
  text?: ReactNode;
  textSecond?: ReactNode;
  amplitude?: AmplitudeEvent<Payload>;
  className?: string;
};

export default function InquiryInfo({ title, call, text, textSecond, amplitude, className }: Props) {
  const handleClickCall = () => {
    if (amplitude) {
      amplitudeService.logEvent(amplitude);
    }
  };

  return (
    <>
      <InfoItem className={className}>
        <InfoText>
          <Title>{title}</Title>
          <Text>
            {text}
            {textSecond && (
              <>
                <br />
                {textSecond}
              </>
            )}
          </Text>
        </InfoText>
        {call && (
          <CallLink href={`tel:${call}`} onClick={amplitude && handleClickCall}>
            {call}
          </CallLink>
        )}
      </InfoItem>
    </>
  );
}
