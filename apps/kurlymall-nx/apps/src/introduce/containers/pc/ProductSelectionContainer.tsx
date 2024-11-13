import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { INTRODUCE_IMAGE_URL } from '../../constants';
import { PRODUCT_SELECTION } from '../../constants/SubPageContent';
import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/pc/IntroduceContentWrap';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import ProductSelectionCertify from '../../components/pc/ProductSelectionCertify';
import RawHTML from '../../../shared/components/layouts/RawHTML';

const ContentTopInfo = styled.div`
  margin-bottom: 70px;
  padding: 80px 0;
  border-bottom: 1px solid ${COLOR.kurlyGray350};
`;

const ContentList = styled.div`
  padding-top: 60px;
`;

const ContentItem = styled.div`
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;

  &:last-of-type {
    padding-top: 80px;
  }
`;

const ContentTitle = styled.strong`
  display: block;
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 20px;
`;

const ContentText = styled.div`
  padding-left: 20px;

  strong {
    display: block;
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 20px;
  }
  li {
    position: relative;
    margin-bottom: 10px;
    padding-left: 12px;

    &::before {
      position: absolute;
      top: -1px;
      left: -6px;
      font-size: 35px;
      content: '·';
    }
  }
`;

export default function ProductSelectionContainer() {
  return (
    <IntroduceContentWrap paddingTop={0}>
      <IntroduceImageBox imageUrl={INTRODUCE_IMAGE_URL.productSelectionMain} height={280} />
      <ContentTopInfo>
        <IntroduceTitle marginBottom={28} fontWeight={500} fontSize={28}>
          생산자ㆍ소비자ㆍ환경에 이로운 상품을 우선 선정합니다
        </IntroduceTitle>
        <IntroduceText fontSize={20}>
          컬리는 환경적, 사회적 지속 가능성에 기여하는 상품을 더 다양하게 선보이기 위해
          <br />
          지속 가능한 상품 선정 기준을 세우고, 기준에 부합하는 상품을 우선 입점 대상으로 고려합니다.
        </IntroduceText>
      </ContentTopInfo>
      <IntroduceTitle marginBottom={0} fontWeight={500} fontSize={24}>
        컬리의 지속 가능한 상품 선정 기준
      </IntroduceTitle>
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
    </IntroduceContentWrap>
  );
}
