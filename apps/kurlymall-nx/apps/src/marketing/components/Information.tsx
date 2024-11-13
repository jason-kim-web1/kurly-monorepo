import styled from '@emotion/styled';
import { memo } from 'react';

import BlindText from './BlindText';
import Images from './Images';
import Buttons from './Buttons';
import Notice from './Notice';
import { ContentBody } from '../shared/type';
import { isVisibleByAfterDate } from '../shared/utils';

const WrappedInformation = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

type InformationProps = {
  title: string;
  body?: ContentBody;
};

function Information({ title, body }: InformationProps) {
  const { text, images, buttons, notices, styles, id, config } = body || {};
  const isVisible = isVisibleByAfterDate(config?.publicationPeriod);

  if (!isVisible) {
    // 컬리 뷰티 페스타 초청
    // 영역 추가(이미지/버튼추가): 2024.09.13 ~ 2024.10.13
    // 영역 제거: 2024.10.14 ~ 2024.11.21(미정)

    // 컬리 푸드 페스타
    // 영역 추가 (미정)
    return <></>;
  }

  return (
    <WrappedInformation backgroundColor={styles?.backgroundColor} id={id}>
      <BlindText text={`<h1>${title}</h1>${text ?? ''}`} />
      <Images images={images} />
      <Buttons buttons={buttons} />
      <Notice notices={notices} />
    </WrappedInformation>
  );
}

export default memo(Information);
