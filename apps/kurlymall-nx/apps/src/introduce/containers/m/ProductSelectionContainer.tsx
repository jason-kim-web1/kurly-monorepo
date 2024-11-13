import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { INTRODUCE_IMAGE_URL } from '../../constants';
import { PRODUCT_SELECTION } from '../../constants/SubPageContent';
import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import ProductSelectionCertify from '../../components/m/ProductSelectionCertify';

const ContentTopInfo = styled.div`
  padding: 40px 24px 32px;
`;

const ContentListWrap = styled.div`
  padding: 32px 24px;
`;

const ContentList = styled.div`
  margin-bottom: -8px;
`;

const ContentItem = styled.div`
  font-size: 13px;
  line-height: 22px;

  &:last-of-type {
    padding: 40px 0;
    background-color: ${COLOR.bg};
  }
`;

const ContentTitle = styled.strong`
  display: block;
  margin-left: 24px;
  font-size: 16px;
`;

const ContentText = styled.div`
  padding: 18px 24px;

  strong {
    display: block;
    margin: 0 0 12px 16px;
  }
  ul {
    padding: 0 4px;
  }
  li {
    position: relative;
    margin-bottom: 4px;
    padding-left: 12px;
    font-size: 12px;
    line-height: 20px;
    word-break: keep-all;

    &::before {
      position: absolute;
      top: -1px;
      left: -2px;
      font-size: 30px;
      content: '·';
    }
  }
`;

export default function ProductSelectionContainer() {
  return (
    <>
      <ContentTopInfo>
        <IntroduceTitle marginBottom={24} fontSize={19}>
          생산자, 소비자, 환경에
          <br />
          이로운 상품을 우선 선정합니다
        </IntroduceTitle>
        <IntroduceText fontWeight={400}>
          컬리는 환경적, 사회적 지속 가능성에 기여하는 상품을 더 다양하게 선보이기 위해 지속 가능한 상품 선정 기준을
          세우고, 기준에 부합하는 상품을 우선 입점 대상으로 고려합니다.
        </IntroduceText>
      </ContentTopInfo>
      <IntroduceImageBox height={240} imageUrl={INTRODUCE_IMAGE_URL.productSelectionMainMo} />
      <ContentListWrap>
        <IntroduceTitle marginBottom={0} fontSize={19}>
          컬리의 지속 가능한 상품 선정 기준
        </IntroduceTitle>
      </ContentListWrap>
      <ContentList>
        {PRODUCT_SELECTION.map(({ id, title, text, info }) => (
          <ContentItem key={id}>
            <ContentTitle>{title}</ContentTitle>
            {text && (
              <ContentText>
                <RawHTML html={text} />
              </ContentText>
            )}
            {info && <ProductSelectionCertify info={info} />}
          </ContentItem>
        ))}
      </ContentList>
    </>
  );
}
