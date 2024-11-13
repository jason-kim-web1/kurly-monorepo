import styled from '@emotion/styled';

import { useEffect } from 'react';

import { css } from '@emotion/react';

import { RequestStateType } from '../../shared/types/requestStateType';
import COLOR from '../../../../shared/constant/colorset';
import { usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import useProgressBar from '../../shared/hooks/useProgressBar';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 65px;
`;

const StatusWrapper = styled.div`
  position: relative;
`;

const State = styled.p`
  position: absolute;
  top: 12px;
  font-size: 12px;
  color: ${COLOR.kurlyPurple};
  border-radius: 12px;
  padding: 4px 8px;
`;

const Requested = styled(State)`
  left: 0;
`;

const Progressed = styled(State)<{ requestState: RequestState }>`
  left: 50%;
  transform: translateX(-50%);
  ${({ requestState }) =>
    requestState === 'REQUESTED' &&
    css`
      color: ${COLOR.kurlyWhite};
      background: ${COLOR.kurlyPurple};
    `};
`;

const Completed = styled(State)<{ requestState: RequestState }>`
  right: 0;
  color: ${COLOR.kurlyGray400};
  ${({ requestState }) =>
    requestState !== 'REQUESTED' &&
    css`
      color: ${COLOR.kurlyWhite};
      background: ${COLOR.kurlyPurple};
    `};
`;

const BarWrapper = styled.div`
  position: relative;
  height: 2px;
  width: calc(100% - 47px);
  margin: 0 auto;
  background: ${COLOR.kurlyGray200};
}
`;

const StateBar = styled.div<{ progressBarWidth: number }>`
  position: relative;
  height: 2px;
  transition: all 0.5s ease-in-out;
  width: ${({ progressBarWidth }) => progressBarWidth}%;
  background: ${COLOR.kurlyPurple};
`;

const StateDot = styled.div<{ requestState: RequestState }>`
  position: absolute;
  background: ${COLOR.kurlyPurple};
  top: -4px;
  left: 100%;
  width: 10px;
  height: 10px;
  border-radius: 20px;
  border: 2px solid ${COLOR.kurlyWhite};
`;

type RequestState = RequestStateType | '' | undefined;

export default function ProgressBar() {
  const { data: personalBox } = usePersonalBox('always');
  const { progressBarWidth, progressBarAnimation } = useProgressBar(personalBox?.requestState);
  useEffect(() => {
    progressBarAnimation();
  }, [progressBarAnimation]);
  return (
    <Wrapper>
      <BarWrapper>
        <StateBar progressBarWidth={progressBarWidth}>
          <StateDot requestState={personalBox?.requestState} />
        </StateBar>
      </BarWrapper>
      <StatusWrapper>
        <Requested>신청접수</Requested>
        <Progressed requestState={personalBox?.requestState}>확인중</Progressed>
        <Completed requestState={personalBox?.requestState}>완료</Completed>
      </StatusWrapper>
    </Wrapper>
  );
}
