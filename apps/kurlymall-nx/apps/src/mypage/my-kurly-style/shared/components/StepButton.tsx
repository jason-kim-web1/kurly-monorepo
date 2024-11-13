import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { BackArrow } from '../../../../shared/images';

import useFirstStep from '../../shared/hooks/useFirstStep';
import Button from '../../../../shared/components/Button/Button';
import MobileFooter from '../../../../shared/components/layouts/MobileFooter';
import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const WebButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const PreviousButton = styled(WebButton)`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    width: 1px;
    height: 12px;
    background-color: ${COLOR.kurlyGray200};
  }
`;

const Arrow = styled.span`
  display: block;
  right: 50px;
  width: 7px;
  height: 12px;
  margin-right: 8px;
  background: url(${BackArrow}) no-repeat 47% 50% / 40px 40px;
  transform: rotate(0deg);
`;

const NextButton = styled(WebButton)`
  padding-right: 20px;

  & > ${Arrow} {
    transform: rotate(180deg);
    margin: 0 0 0 8px;
  }
`;

const styles = {
  footer: css`
    column-gap: 8px;
  `,
};

interface Props {
  stepIndex: number;
  lastStep: boolean | undefined;
  isSaved: boolean;
  previousButton: () => void;
  nextButton: () => void;
  saveProfile: () => void;
}

export default function StepButton({ stepIndex, lastStep, previousButton, nextButton, saveProfile, isSaved }: Props) {
  const { isFirstStep } = useFirstStep(stepIndex);

  return (
    <>
      {isPC ? (
        <Wrapper>
          {!isFirstStep && (
            <PreviousButton onClick={previousButton}>
              <Arrow /> 이전 단계
            </PreviousButton>
          )}
          <NextButton onClick={lastStep ? saveProfile : nextButton}>
            {lastStep ? (
              '선택 후 저장'
            ) : (
              <>
                선택 후 다음 <Arrow />
              </>
            )}
          </NextButton>
        </Wrapper>
      ) : (
        <MobileFooter css={styles.footer}>
          <Button text="이전" radius={isPC ? 3 : 6} theme="tertiary" onClick={previousButton} />
          <Button
            text={lastStep ? '저장' : '다음'}
            radius={isPC ? 3 : 6}
            onClick={lastStep ? saveProfile : nextButton}
            isSubmitLoading={!isSaved}
          />
        </MobileFooter>
      )}
    </>
  );
}
