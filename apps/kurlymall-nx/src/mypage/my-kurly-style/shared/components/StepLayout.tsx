import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useSelector } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';

import useStep from '../../shared/hooks/useStep';

import ProgressBar from './ProgressBar';
import StepButton from './StepButton';
import { AppState } from '../../../../shared/store';
import PcProfileCategory from '../../pc/components/ProfileCategory';
import MobileProfileCategory from '../../m/components/ProfileCategory';

const Wrapper = styled.div`
  ${isPC &&
  css`
    padding: 44px 36px;
    border-bottom: 1px solid ${COLOR.kurlyGray200};
  `};
`;

interface Props {
  profileId: string;
}

export default function StepLayout({ profileId }: Props) {
  const {
    profile: { categories },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const { stepIndex, lastStep, previousButton, nextButton, saveProfile, isSaved } = useStep({ categories, profileId });

  return (
    <Wrapper>
      <ProgressBar stepIndex={stepIndex} lastStep={lastStep} />
      {isPC ? (
        <PcProfileCategory listLayout={false} stepId={categories[stepIndex].id} />
      ) : (
        <MobileProfileCategory listLayout={false} stepId={categories[stepIndex].id} />
      )}
      <StepButton
        stepIndex={stepIndex}
        lastStep={lastStep}
        previousButton={previousButton}
        nextButton={nextButton}
        saveProfile={saveProfile}
        isSaved={isSaved}
      />
    </Wrapper>
  );
}
