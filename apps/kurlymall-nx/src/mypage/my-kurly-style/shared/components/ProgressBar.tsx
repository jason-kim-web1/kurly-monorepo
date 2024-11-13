import { useCallback } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import useStep from '../hooks/useStep';
import { AppState } from '../../../../shared/store';

const Wrapper = styled.div`
  text-align: center;

  ${isPC
    ? css`
        margin-bottom: 40px;
      `
    : css`
        margin: 20px 0 45px;
      `};
`;

const Progress = styled.progress<{ lastStep: boolean | undefined }>`
  border-radius: 6px;
  -webkit-appearance: none;
  ::-webkit-progress-bar {
    background-color: ${COLOR.kurlyGray200};
    border-radius: 6px;
  }
  ::-webkit-progress-value {
    background-color: ${COLOR.toolTip};
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  ${isPC
    ? css`
        width: 400px;
        height: 6px;
      `
    : css`
        width: 70%;
        height: 4px;
      `};

  ${({ lastStep }) =>
    lastStep &&
    css`
      ::-webkit-progress-value {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    `}
`;

// const Reward = styled.p`
//   background-color: ${COLOR.toolTip};
//   color: ${COLOR.kurlyWhite};
//   text-align: center;
//
//   ${ isPC ? css`
//     width: 116px;
//     height: 32px;
//     margin: 10px 0 0 518px;
//     line-height: 32px;
//     border-radius: 38px;
//   ` : css`
//     width: 59px;
//     height: 22px;
//     line-height: 22px;
//     border-radius: 6px;
//     font-size: 11px;
//   `};
// `;
//
// const Point = styled.span`
//   ${ isPC ? css`
//     font-weight: 700;
//   ` : css`
//     font-weight: 600;
//   `};
// `;

interface Props {
  stepIndex: number;
  lastStep: boolean;
}
export default function ProgressBar({ stepIndex, lastStep }: Props) {
  const {
    profile: { categories },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const { stepLength } = useStep({ categories });

  const progress = useCallback(() => {
    if (stepLength === 0) return stepLength;
    return stepLength && (100 / stepLength) * (stepIndex + 1);
  }, [stepIndex, stepLength]);

  return (
    <Wrapper>
      <Progress max="100" value={progress()} lastStep={lastStep} />
      {/*적립 리워드 추후 반영 예정*/}
      {/*<Reward>*/}
      {/*  <Point>*/}
      {/*    +1,000*/}
      {/*  </Point>*/}
      {/*  원 적립!*/}
      {/*</Reward>*/}
    </Wrapper>
  );
}
