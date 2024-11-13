import { INTRODUCE_IMAGE_URL, PRICE_POLICY } from '../../constants';

import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/pc/IntroduceContentWrap';
import IntroduceTextBox from '../../components/shared/IntroduceTextBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';

export default function PricePolicyContainer() {
  return (
    <>
      <IntroduceImageBox
        imageUrl={INTRODUCE_IMAGE_URL.pricePolicyMain}
        height={240}
        fontSize={32}
        text={'같은 품질에서 최선의 가격을 제공합니다'}
      />
      <IntroduceContentWrap>
        {PRICE_POLICY.map(({ id, title, text, urlText, url }) => (
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
