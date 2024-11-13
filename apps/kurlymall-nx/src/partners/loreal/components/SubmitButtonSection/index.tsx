import styled from '@emotion/styled';

import ColorSet from '../../../../shared/constant/colorset';
import { BASE_BREAK_POINT } from '../../constants';

const SubmitButtonWrap = styled.section`
  position: fixed;
  padding: 0 12px;
  width: 100%;
  bottom: 0;
  background: linear-gradient(182.65deg, rgba(247, 247, 247, 0) 2.21%, ${ColorSet.bgLightGray} 50%);
  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    position: sticky;
    bottom: 0;
  }
`;
const SubmitButton = styled.button`
  padding: 15px 0;
  width: 100%;
  background-color: ${ColorSet.partnersPurple};
  border-radius: 8px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    letter-spacing: -0.5px;
  }
`;

const SubmitButtonText = styled.span`
  color: ${ColorSet.kurlyWhite};
  font-weight: 700;
  font-size: 17px;
  line-height: 24px;
  text-align: center;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    letter-spacing: -0.5px;
    font-weight: 500;
  }
`;

interface Props {
  onClick(): void;
}

const SubmitButtonSection = ({ onClick }: Props) => {
  return (
    <SubmitButtonWrap>
      <SubmitButton type="button" onClick={onClick}>
        <SubmitButtonText>연동하고 포인트 받기</SubmitButtonText>
      </SubmitButton>
    </SubmitButtonWrap>
  );
};

export default SubmitButtonSection;
