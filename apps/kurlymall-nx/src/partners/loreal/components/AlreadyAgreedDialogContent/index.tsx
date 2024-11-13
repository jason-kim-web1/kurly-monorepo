import styled from '@emotion/styled';

import ColorSet from '../../../../shared/constant/colorset';
import { BASE_BREAK_POINT } from '../../constants';

const Container = styled.div`
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.5px;
  color: ${ColorSet.kurlyGray800};
  padding-inline-start: 3px;
  > p {
    word-break: normal;
  }
  > .point-text {
    color: ${ColorSet.kurlyPurple};
  }
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    text-align: center;
  }
`;

interface Props {
  agreedAt: string;
}

const AgreementDialogContent = ({ agreedAt }: Props) => {
  return (
    <Container>
      <p>회원님의 로레알 멤버십 연동 동의일을 안내드립니다.</p>
      <p className="point-text">동의일 {agreedAt}</p>
    </Container>
  );
};

export default AgreementDialogContent;
