import { INTRODUCE_IMAGE_URL, KURLY_FRESH_SOLUTION } from '../../constants';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/pc/IntroduceContentWrap';
import IntroduceTextBox from '../../components/shared/IntroduceTextBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';

export default function KurlyFreshSolutionContainer() {
  return (
    <>
      <IntroduceImageBox
        imageUrl={INTRODUCE_IMAGE_URL.solutionMain}
        height={240}
        fontSize={32}
        text={'물류 혁신을 통해 최상의 품질로 전해드립니다'}
      />
      <IntroduceContentWrap>
        {KURLY_FRESH_SOLUTION.map(({ id, title, text }) => (
          <IntroduceTextBox key={id} paddingBottom={55}>
            <IntroduceTitle fontWeight={500} fontSize={20}>
              {title}
            </IntroduceTitle>
            <IntroduceText fontSize={16} align={'justify'}>
              {text}
            </IntroduceText>
          </IntroduceTextBox>
        ))}
      </IntroduceContentWrap>
    </>
  );
}
