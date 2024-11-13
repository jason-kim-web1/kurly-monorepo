import { CUSTOMER_SYSTEM, INTRODUCE_IMAGE_URL } from '../../constants';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/pc/IntroduceContentWrap';
import IntroduceTextBox from '../../components/shared/IntroduceTextBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';

export default function CustomerSystemContainer() {
  return (
    <>
      <IntroduceImageBox
        imageUrl={INTRODUCE_IMAGE_URL.customerSystemMain}
        height={240}
        fontSize={32}
        text={'고객의 행복을 먼저 생각합니다'}
      />
      <IntroduceContentWrap>
        {CUSTOMER_SYSTEM.map(({ id, title, text, urlText, url }) => (
          <IntroduceTextBox key={id} paddingBottom={55} fontSize={14} urlText={urlText} url={url}>
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
