import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { INTRODUCE_IMAGE_URL } from '../../constants';
import { PACKAGING_MATERIALS_LIST } from '../../constants/SubPageContent';
import IntroduceImageBox from '../../components/shared/IntroduceImageBox';
import IntroduceTitle from '../../components/shared/IntroduceTitle';
import IntroduceText from '../../components/shared/IntroduceText';
import RawHTML from '../../../shared/components/layouts/RawHTML';
import NextImage from '../../../shared/components/NextImage';

const ContentTopInfo = styled.div`
  padding: 40px 24px 32px;
`;

const HistoryPackage = styled.div`
  padding-top: 40px;
  > h3 {
    padding: 0 24px;
  }
`;

const HistoryItem = styled.div`
  margin-bottom: 14px;
  padding: 20px 24px 40px;
  border-bottom: 1px solid ${COLOR.bg};

  &:last-of-type {
    margin-bottom: 0;
    border-bottom: 0;
  }
`;

const InfoWrap = styled.div`
  font-size: 13px;
  line-height: 20px;

  strong {
    display: block;
    margin-bottom: 16px;
    font-size: 16px;
  }
  .tit {
    margin-bottom: 10px;
    font-size: 13px;
  }
  .tit_sub {
    margin-bottom: 10px;
    font-size: 13px;
    color: ${COLOR.kurlyPurple};
  }
  .info_box {
    margin-top: 30px;
    padding: 20px 16px;
    border: 1px solid ${COLOR.kurlyGray350};
  }

  li {
    position: relative;
    margin-bottom: 4px;
    padding-left: 12px;

    &::before {
      position: absolute;
      top: -1px;
      left: -2px;
      font-size: 30px;
      content: '·';
    }
    span {
      font-weight: 700;
    }
  }
  .list li {
    padding-bottom: 2px;
  }
`;

const ThumbImage = styled.div`
  position: relative;
  height: 34.4vw;
  margin-top: 24px;
`;

const PurpleBoxYouTube = styled.div`
  padding: 0 24px 40px;
`;

const YouTubeWrap = styled.div`
  position: relative;
  padding-bottom: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const PackageInfo = styled.div`
  margin-bottom: -8px;
  padding: 40px 24px;
  background-color: ${COLOR.bg};
`;

const InfoList = styled.ul`
  margin-top: 30px;
`;

const InfoItem = styled.li`
  padding-bottom: 6px;
`;

const ImageBox = styled.div`
  position: relative;
  height: 42.8vw;
  margin-top: 30px;
`;

export default function PackagingMaterialsContainer() {
  return (
    <>
      <ContentTopInfo>
        <IntroduceTitle marginBottom={24} fontSize={19}>
          식품을 안전하게, 위생적으로 담으면서 더 친환경적인 포장재를 지속 개발합니다
        </IntroduceTitle>
        <IntroduceText fontWeight={400}>
          컬리는 2015년 서비스를 시작한 직후부터 지금까지 고객님의 의견을 바탕으로 끊임없이 포장재를 개선해왔습니다.
          배송 건수가 증가할수록 플라스틱, 스티로폼, 비닐 포장재 사용을 줄여야 한다는 책임감도 커졌기 때문이죠.
          <br />
          <br />
          꾸준한 연구 끝에 2019년에는 모든 배송 포장재를 종이로 바꿔 가는 올 페이퍼 챌린지를 통해 친환경을 실천했고,
          2021년에는 지속적으로 재사용할 수 있는 컬리 퍼플 박스를 도입했습니다.
          <br />
          <br />
          하지만 여기가 끝이 아닙니다. 사람에게도 환경에도 더 이로운 배송을 위한 컬리의 포장재 연구는 여전히 현재
          진행형입니다. 지구를 위한 컬리의 도전을 함께 응원해주세요.
        </IntroduceText>
      </ContentTopInfo>
      <IntroduceImageBox height={240} imageUrl={INTRODUCE_IMAGE_URL.packagingMainMo} />
      <HistoryPackage>
        <IntroduceTitle marginBottom={0} fontSize={19}>
          History of Package
        </IntroduceTitle>
        {PACKAGING_MATERIALS_LIST.map(({ id, title, text, subText, imgUrlMo }) => (
          <HistoryItem key={id}>
            <InfoWrap>
              <strong>{title}</strong>
              <RawHTML html={text} />
              {imgUrlMo && (
                <ThumbImage>
                  <NextImage src={imgUrlMo} objectFit="cover" layout="fill" alt="" />
                </ThumbImage>
              )}
              {subText && <RawHTML html={subText} />}
            </InfoWrap>
          </HistoryItem>
        ))}
      </HistoryPackage>
      <PurpleBoxYouTube>
        <IntroduceTitle marginBottom={25} fontSize={16}>
          구성과 사용법 더 알아보기
        </IntroduceTitle>
        <YouTubeWrap>
          <iframe
            src="https://www.youtube.com/embed/AgZCfTw2Z00"
            title="Kurly purplebox stopmotion video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </YouTubeWrap>
      </PurpleBoxYouTube>
      <PackageInfo>
        <InfoWrap>
          <IntroduceTitle marginBottom={18} fontSize={16}>
            지속적인 상품 포장재 개선
          </IntroduceTitle>
          <IntroduceText fontWeight={400}>
            배송 포장재를 지속 가능한 방식으로 개선하는 데에서 한 발 더 나아가 식품, 내용물에 직접 닿는 1차 포장재인
            상품 포장재까지 친환경 소재로 바꿔 가기 위해 노력합니다.
          </IntroduceText>
          <ImageBox>
            <NextImage src={INTRODUCE_IMAGE_URL.packagingSub} objectFit="cover" layout="fill" alt="" />
          </ImageBox>
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
      </PackageInfo>
    </>
  );
}
