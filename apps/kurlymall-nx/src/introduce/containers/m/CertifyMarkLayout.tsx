import styled from '@emotion/styled';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { isNull } from 'lodash';

import COLOR from '../../../shared/constant/colorset';
import { INTRODUCE_IMAGE_URL } from '../../constants';

import NextImage from '../../../shared/components/NextImage';

const Contaier = styled.div`
  padding: 0 18px;
  font-weight: 300;
  line-height: 21px;
  color: ${COLOR.kurlyBlack};
`;

const Desc = styled.div`
  padding-bottom: 29px;
`;

const CertifyMark = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  font-weight: 700;
  text-align: left;
  color: ${COLOR.kurlyPurple};
`;

const ArrowIcon = styled.div<{ slideToggle: boolean }>`
  position: relative;
  width: 9px;
  height: 6px;
  transition: transform 0.25s ease-out;
  transform: rotate(${({ slideToggle }) => (slideToggle ? '180deg' : 0)});
`;

const InfoWrap = styled.div<{ slideHeight: string }>`
  overflow: hidden;
  height: ${({ slideHeight }) => slideHeight};
  transition: height ease-in-out 0.3s;
`;

interface Props {
  type: string;
  desc?: string;
  children: ReactNode;
}

export default function CertifyMarkLayout({ type, desc, children }: Props) {
  const infoParentRef = useRef<HTMLDivElement>(null);
  const infoChildRef = useRef<HTMLDivElement>(null);

  const [slideToggle, setSlideToggle] = useState(false);
  const [slideHeight, setSlideHeight] = useState('auto');

  const handleClickSlide = useCallback(() => {
    if (isNull(infoParentRef.current) || isNull(infoChildRef.current)) {
      return;
    }
    if (infoParentRef.current.clientHeight > 0) {
      setSlideHeight('0');
      setSlideToggle(true);
    } else {
      setSlideHeight(`${infoChildRef.current.clientHeight}px`);
      setSlideToggle(false);
    }
  }, []);

  useEffect(() => {
    if (isNull(infoParentRef.current) || isNull(infoChildRef.current)) {
      return;
    }
    setSlideHeight(`${infoChildRef.current.clientHeight}px`);
  }, []);

  useEffect(() => {
    if (isNull(infoParentRef.current) || isNull(infoChildRef.current)) {
      return;
    }
    setSlideHeight(`${infoChildRef.current.clientHeight}px`);
  }, []);

  return (
    <Contaier>
      {desc && <Desc>{desc}</Desc>}
      <CertifyMark>
        <Title onClick={handleClickSlide}>
          {type}
          <ArrowIcon slideToggle={slideToggle}>
            <NextImage src={INTRODUCE_IMAGE_URL.icoArrowUp} layout="fill" alt="인증서 펼치기/접기" />
          </ArrowIcon>
        </Title>
        <InfoWrap ref={infoParentRef} slideHeight={slideHeight}>
          <div ref={infoChildRef}>{children}</div>
        </InfoWrap>
      </CertifyMark>
    </Contaier>
  );
}
