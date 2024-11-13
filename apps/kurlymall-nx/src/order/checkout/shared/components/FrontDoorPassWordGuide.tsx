import { useEffect } from 'react';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';

import useToggle from '../hooks/useToggle';

import { PasswordGuide } from '../../../../shared/constant/front-door-password-guide';
import { PASSWORD_GUIDE_SUCCESS_MESSAGE } from '../constants/copy-alert-message';

import { ArrowDown, ArrowRight, ArrowUp } from '../../../../shared/icons';

import CopyButton from '../../../../shared/components/Button/CopyButton';
import SlideToggleWrapper from '../../../../shared/components/motion/SlideToggleWrapper';

const PasswordGuideWrapper = styled.div`
  ${isPC ? `margin: 12px 0` : 'margin-top: 12px'};
  padding: 15px 16px 20px;
  background-color: ${COLOR.kurlyGray100};
  padding-bottom: 16px;
  border-radius: 6px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GuideTitle = styled.div`
  font-size: ${isPC ? '13px' : '14px'};
  font-weight: ${isPC ? 500 : 600};
  line-height: 19px;
  color: ${COLOR.kurlyGray600};
  ${isPC && 'letter-spacing: -0.5px'};
`;

const GuideContent = styled.div`
  padding-top: 15px;
  color: ${COLOR.kurlyGray500};
  font-weight: 400;

  > p {
    font-size: 13px;
    line-height: 18px;
    padding-bottom: 16px;
    ${isPC && 'letter-spacing: -0.5px'};
  }
  > div:not(:last-child) {
    padding-bottom: 12px;
  }
`;

const GuideItems = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  ${isPC && 'letter-spacing: -0.5px;'}

  ::before {
    content: '';
    display: block;
    background-color: ${COLOR.kurlyGray350};
    border-radius: 50%;
    width: 3px;
    height: 3px;
    margin-right: 1vw;
  }
`;

const Before = styled.span`
  width: ${isPC ? '26vw' : '33vw'};
  margin: 0vw ${isPC ? '5wv' : '3wv'} 0 0;
  flex-shrink: 0;
`;

const After = styled.span`
  margin: ${isPC ? '0px 1vw 0 6vw' : '0 1vw 0 4vw'};
  color: ${COLOR.loversLavender};
  font-weight: ${isPC ? 500 : 600};
  flex-shrink: 0;
`;

const arrow = css`
  flex-shrink: 0;
`;

interface Props {
  value: string;
  isFocus: boolean;
}

export default function FrontDoorPasswordGuide({ value, isFocus }: Props) {
  const { toggle, open, isOpen } = useToggle();

  useEffect(() => {
    if (!value || isFocus) {
      open();
    }
  }, [isFocus, value, open]);

  return (
    <PasswordGuideWrapper>
      <TitleWrapper onClick={toggle}>
        <GuideTitle>공동현관 비밀번호 입력 가이드</GuideTitle>
        {isOpen ? <ArrowUp stroke={COLOR.kurlyGray800}></ArrowUp> : <ArrowDown stroke={COLOR.kurlyGray800}></ArrowDown>}
      </TitleWrapper>
      <SlideToggleWrapper opened={isOpen}>
        <GuideContent>
          <p>입력 시 한글 혹은 특수문자(#,*)를 활용해주세요</p>
          {PasswordGuide.map(({ label, before, after }) => (
            <GuideItems key={label}>
              <Before role="img" aria-label={label}>
                {before}
              </Before>
              <ArrowRight css={arrow} stroke={COLOR.kurlyGray400} width="15" height="17" strokeWidth="2" />
              <After>{after}</After>
              <CopyButton
                width={14}
                height={14}
                copyString={after}
                message={PASSWORD_GUIDE_SUCCESS_MESSAGE}
                stroke={COLOR.kurlyGray400}
              />
            </GuideItems>
          ))}
        </GuideContent>
      </SlideToggleWrapper>
    </PasswordGuideWrapper>
  );
}
