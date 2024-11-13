import { INTRODUCE_IMAGE_URL, PRICE_POLICY } from '../../constants';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/m/IntroduceContentWrap';
import IntroduceTextBox from '../../components/shared/IntroduceTextBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';

export default function PricePolicyContainer() {
  return (
    <>
      <IntroduceImageBox
        imageUrl={INTRODUCE_IMAGE_URL.pricePolicyMainMo}
        text={'같은 품질에서 최선의 가격을 제공합니다'}
      />
      <IntroduceContentWrap>
        {PRICE_POLICY.map(({ id, title, text, urlText, url }) => (
          <IntroduceTextBox key={id} urlText={urlText} url={url} fontWeight={700}>
            <IntroduceTitle>{title}</IntroduceTitle>
            <IntroduceText>{text}</IntroduceText>
          </IntroduceTextBox>
        ))}
      </IntroduceContentWrap>
    </>
  );
}
