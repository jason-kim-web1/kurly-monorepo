import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { INTRODUCE_IMAGE_URL } from '../../constants';
import { PACKAGING_MATERIALS_LIST } from '../../constants/SubPageContent';
import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceContentWrap from '../../components/pc/IntroduceContentWrap';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import NextImage from '../../../shared/components/NextImage';

const ContentTopInfo = styled.div`
  margin-bottom: 70px;
  padding: 80px 0;
  border-bottom: 1px solid ${COLOR.kurlyGray350};
`;

const HistoryPackage = styled.div`
  padding: 0 20px;
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: 1px solid ${COLOR.bg};

  &:nth-of-type(2) ~ div {
    border-bottom: 0;
  }
`;

const InfoWrap = styled.div`
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;

  strong {
    display: block;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 20px;
  }
  .tit_sub {
    width: 449px;
    margin: 24px 0 25px;
    padding-top: 26px;
    border-top: 1px solid ${COLOR.kurlyGray350};
    font-size: 18px;
    color: ${COLOR.kurlyPurple};
  }
  p {
    width: 448px;
  }
  li {
    position: relative;
    padding-left: 12px;

    &::before {
      position: absolute;
      top: -1px;
      left: -6px;
      font-size: 35px;
      content: '·';
    }
    span {
      font-weight: 500;
    }
  }
  .list_sub li {
    padding-bottom: 8px;
  }
`;

const ThumbImage = styled.div`
  min-width: 490px;
  height: 250px;
`;

const PackageText = styled.p`
  padding: 50px 0 29px;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  color: ${COLOR.kurlyGray600};
`;

const YoutubeBox = styled.div`
  width: 960px;
  margin: 0 auto;
`;

const ContentBottomInfo = styled.div`
  background-color: ${COLOR.bg};
`;

const PackageInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoList = styled.ul`
  margin-top: 20px;
`;

const InfoItem = styled.li`
  margin-bottom: 20px;
`;

const ImageBox = styled.div`
  min-width: 480px;
  margin-top: 45px;
`;

export default function PackagingMaterialsContainer() {
  return (
    <>
      <IntroduceContentWrap paddingTop={0}>
        <IntroduceImageBox imageUrl={INTRODUCE_IMAGE_URL.packagingMain} height={280} />
        <ContentTopInfo>
          <IntroduceTitle marginBottom={28} fontWeight={500} fontSize={28}>
            식품을 안전하게, 위생적으로 담으면서
            <br />더 친환경적인 포장재를 지속 개발합니다
          </IntroduceTitle>
          <IntroduceText fontSize={20}>
            컬리는 2015년 서비스를 시작한 직후부터 지금까지 고객님의 의견을 바탕으로 끊임없이 포장재를 개선해왔습니다.
            <br />
            배송 건수가 증가할수록 플라스틱, 스티로폼, 비닐 포장재 사용을 줄여야 한다는 책임감도 커졌기 때문이죠.
            <br />
            <br />
            꾸준한 연구 끝에 2019년에는 모든 배송 포장재를 종이로 바꿔 가는 올 페이퍼 챌린지를 통해 친환경을 실천했고,
            <br />
            2021년에는 지속적으로 재사용할 수 있는 컬리 퍼플 박스를 도입했습니다. 하지만 여기가 끝이 아닙니다.
            사람에게도 환경에도
            <br />더 이로운 배송을 위한 컬리의 포장재 연구는 여전히 현재 진행형입니다. 지구를 위한 컬리의 도전을 함께
            응원해주세요.
          </IntroduceText>
        </ContentTopInfo>
        <HistoryPackage>
          <IntroduceTitle marginBottom={46} fontWeight={500} fontSize={28}>
            History of Package
          </IntroduceTitle>
          {PACKAGING_MATERIALS_LIST.map(({ id, title, text, subText, imgUrl }) => (
            <HistoryItem key={id}>
              <InfoWrap>
                <strong>{title}</strong>
                <RawHTML html={text} />
                {subText && <RawHTML html={subText} />}
              </InfoWrap>
              {imgUrl && (
                <ThumbImage>
                  <NextImage src={imgUrl} width={490} height={250} alt="" />
                </ThumbImage>
              )}
            </HistoryItem>
          ))}
        </HistoryPackage>
        <PackageText>구성과 사용법 더 알아보기</PackageText>
        <YoutubeBox>
          <iframe
            width="960"
            height="540"
            src="https://www.youtube.com/embed/AgZCfTw2Z00"
            title="Kurly purplebox stopmotion video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </YoutubeBox>
      </IntroduceContentWrap>
      <ContentBottomInfo>
        <IntroduceContentWrap paddingTop={100}>
          <PackageInfo>
            <InfoWrap>
              <IntroduceTitle marginBottom={22} fontWeight={500} fontSize={22}>
                지속적인 상품 포장재 개선
              </IntroduceTitle>
              <IntroduceText fontSize={18}>
                배송 포장재를 지속 가능한 방식으로 개선하는 데에서 한 발 더<br />
                나아가 식품, 내용물에 직접 닿는 1차 포장재인 상품 포장재까지
                <br />
                친환경 소재로 바꿔 가기 위해 노력합니다.
              </IntroduceText>
              <InfoList>
                <InfoItem>
                  컬리가 자체 개발하는 상품은 포장재 소재와 부피를 기획 단계
                  <br />
                  부터 꼼꼼히 검토합니다.
                </InfoItem>
                <InfoItem>
                  컬리와 함께하는 생산자를 위해 친환경 상품 패키지에 대한
                  <br />
                  자료와 자문을 제공할 예정입니다.
                </InfoItem>
              </InfoList>
            </InfoWrap>
            <ImageBox>
              <NextImage src={INTRODUCE_IMAGE_URL.packagingSub} width={480} height={291} alt="" />
            </ImageBox>
          </PackageInfo>
        </IntroduceContentWrap>
      </ContentBottomInfo>
    </>
  );
}
