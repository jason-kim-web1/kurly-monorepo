import styled from '@emotion/styled';

import InfoContent from '../../components/pc/InfoContent';
import NavMenu from '../../components/pc/NavMenu';
import SlideContent from '../../components/pc/SlideContent';
import useKurlyTestReport from '../../hooks/useKurlyTestReport';

const Container = styled.div`
  min-width: 1050px;
`;

export default function KurlyFreshTestReportContainer() {
  const { data: freshCertifyInfo } = useKurlyTestReport();

  return (
    <Container>
      <NavMenu navigatorMenu={freshCertifyInfo} />
      {freshCertifyInfo?.map(({ id, name, infoText, infoImageUrl, imageList }) => (
        <div key={id} id={id}>
          <InfoContent info={infoText} bgImage={infoImageUrl} />
          <SlideContent title={name} imageList={imageList} />
        </div>
      ))}
    </Container>
  );
}
