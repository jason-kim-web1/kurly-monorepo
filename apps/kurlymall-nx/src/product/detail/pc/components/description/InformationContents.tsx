import { useEffect } from 'react';

import styled from '@emotion/styled';

import { pcProductDetailStyles } from '../../../../../../styles/product/pcGoodsDetail.css';
import { handleCertification, handlePCTestReport } from '../../../shared/utils/productDetailDescription';

const Container = styled.div`
  width: 100%;
`;

interface Props {
  legacyContent: string;
}

export default function InformationContents({ legacyContent }: Props) {
  useEffect(() => {
    if (!legacyContent) {
      return;
    }

    const testReportElement = document.querySelector<HTMLElement>('.inner_certify');
    const certificationElement = document.querySelector<HTMLElement>('.certification_area');

    if (testReportElement) {
      handlePCTestReport(testReportElement);
    }

    if (certificationElement) {
      handleCertification(certificationElement);
    }
  }, [legacyContent]);

  return (
    <Container>
      <div css={pcProductDetailStyles} dangerouslySetInnerHTML={{ __html: legacyContent }} />
    </Container>
  );
}
