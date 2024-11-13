import { CUSTOMER_SYSTEM, INTRODUCE_IMAGE_URL } from '../../constants';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/m/IntroduceContentWrap';
import IntroduceTextBox from '../../components/shared/IntroduceTextBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';

export default function CustomerSystemContainer() {
  return (
    <>
      <IntroduceImageBox imageUrl={INTRODUCE_IMAGE_URL.customerSystemMainMo} text={'고객의 행복을 먼저 생각합니다'} />
      <IntroduceContentWrap>
        {CUSTOMER_SYSTEM.map(({ id, title, text, urlText, url }) => (
          <IntroduceTextBox key={id} urlText={urlText} url={url} fontWeight={700}>
            <IntroduceTitle>{title}</IntroduceTitle>
            <IntroduceText>{text}</IntroduceText>
          </IntroduceTextBox>
        ))}
      </IntroduceContentWrap>
    </>
  );
}
