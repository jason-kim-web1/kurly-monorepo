import { INTRODUCE_IMAGE_URL, KURLY_FRESH_SOLUTION } from '../../constants';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/m/IntroduceContentWrap';
import IntroduceTextBox from '../../components/shared/IntroduceTextBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';

export default function KurlyFreshSolutionContainer() {
  return (
    <>
      <IntroduceImageBox
        imageUrl={INTRODUCE_IMAGE_URL.solutionMainMo}
        text={'물류 혁신을 통해 최상의 품질로 전해드립니다'}
      />
      <IntroduceContentWrap>
        {KURLY_FRESH_SOLUTION.map(({ id, title, text }) => (
          <IntroduceTextBox key={id}>
            <IntroduceTitle>{title}</IntroduceTitle>
            <IntroduceText>{text}</IntroduceText>
          </IntroduceTextBox>
        ))}
      </IntroduceContentWrap>
    </>
  );
}
