import styled from '@emotion/styled';

import Link from 'next/link';

import { PC_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { KURLY_PURPLE_BOX_TEXT } from '../../shared/constants/alternativeText';
import { KURLY_PURPLE_BOX_DETAIL_LINK } from '../../shared/constants/linkUrl';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  position: relative;
`;

const KurlyPurpleBoxDetailPage = styled.a`
  position: absolute;
  bottom: 113px;
  left: 50%;
  width: 877px;
  height: 100px;
  transform: translateX(-50%);
  font-size: 0;
  line-height: 0;
`;

export default function KurlyPurpleBox() {
  return (
    <Wrapper>
      <NextImage
        src={`${PC_PURPLE_BOX_URL}img_purplebox_16.jpg`}
        alt={KURLY_PURPLE_BOX_TEXT}
        width={1900}
        height={928}
      />
      <Link href={KURLY_PURPLE_BOX_DETAIL_LINK} passHref>
        <KurlyPurpleBoxDetailPage href={KURLY_PURPLE_BOX_DETAIL_LINK}>
          컬리 퍼플 박스 구매하러 가기
        </KurlyPurpleBoxDetailPage>
      </Link>
    </Wrapper>
  );
}
