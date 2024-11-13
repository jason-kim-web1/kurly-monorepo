import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { mobileProductDetailStyles } from '../../../../../../styles/product/mobileGoodsDetail.css';

import { handleCertification, handleMWTestReport } from '../../../shared/utils/productDetailDescription';

import TestReportDialog from './TestReportDialog';

const Container = styled.div`
  width: 100%;
`;

interface Props {
  contents: string;
}

export default function KurlyDescription({ contents }: Props) {
  const [open, setOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState('');

  const handleClickOpen = useCallback((imageSrc: string) => {
    setDialogImage(imageSrc);
    setOpen(true);
  }, []);

  const handleClickClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const testReportElement = document.querySelector<HTMLElement>('.inner_certify');
    const certificationElement = document.querySelector<HTMLElement>('.certification_area');

    if (testReportElement) {
      handleMWTestReport({ testReportElement, handleClickOpen });
    }

    if (certificationElement) {
      handleCertification(certificationElement);
    }
  }, [handleClickOpen]);

  if (!contents || contents === 'undefined' || contents === 'null') {
    return null;
  }

  return (
    <Container>
      <div css={mobileProductDetailStyles} dangerouslySetInnerHTML={{ __html: contents }} />
      <TestReportDialog open={open} onHandleClose={handleClickClose} dialogImage={dialogImage} />
    </Container>
  );
}
