import styled from '@emotion/styled';

import Link from 'next/link';

import { bridgeMyKurlyFarmPC, bridgeMyKurlyFarmQR, kurlyNaviLogoPC } from '../../../../shared/images';
import NextImage from '../../../../shared/components/NextImage';
import COLOR from '../../../../shared/constant/colorset';

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 1440px;
  min-height: 100vh;
  background-color: #fff6e0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1440px;
  padding: 160px 120px 128px;
  background-color: #fff6e0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  height: 270px;
  margin: 0 75px;
  color: ${COLOR.kurlyGray800};
`;

const HeadlineWrapper = styled.div`
  padding: 30px 0 20px;
  font-size: 40px;
  line-height: 58px;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray800};
  b {
    font-weight: 500;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray800};
  b {
    font-weight: 500;
    color: ${COLOR.kurlyPurple};
  }
`;

const Description = styled.div`
  display: flex;
`;

const GrayDot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 1.5px;
  margin: 11px 8px 0 0;
  background-color: ${COLOR.kurlyGray600};
`;

const QRWrapper = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${COLOR.kurlyWhite};
  padding: 18px;
  border-radius: 14px;
`;

export default function Bridge() {
  return (
    <ContainerWrapper>
      <Container>
        <ContentWrapper>
          <div>
            <Link href={'/main'}>
              <a href={'/main'}>
                <NextImage src={kurlyNaviLogoPC} alt="마켓컬리 로고" width={78} height={40} objectFit="contain" />
              </a>
            </Link>
            <HeadlineWrapper>
              <div>모바일로 키우면</div>
              <b>문 앞으로 받는 마이컬리팜</b>
            </HeadlineWrapper>
            <DescriptionWrapper>
              <Description>
                <GrayDot />
                <div>컬리 앱 최신버전에서 이용할 수 있어요.</div>
              </Description>
              <Description>
                <GrayDot />
                <div>
                  친구초대 선물을 받으려면 <b>앱 설치 후, 다시 친구초대 링크를 클릭</b>해 접속한 뒤 작물을 심어주세요.
                </div>
              </Description>
            </DescriptionWrapper>
          </div>
          <QRWrapper>
            <NextImage src={bridgeMyKurlyFarmQR} alt="MyKurlyFarm QR" width={164} height={164} objectFit="contain" />
          </QRWrapper>
        </ContentWrapper>
        <NextImage src={bridgeMyKurlyFarmPC} alt="MyKurlyFarm PC" width={1200} height={522} objectFit="contain" />
      </Container>
    </ContainerWrapper>
  );
}
