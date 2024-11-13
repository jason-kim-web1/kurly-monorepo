import styled from '@emotion/styled';

import Link from 'next/link';

import { M_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { KURLY_PURPLE_BOX_TEXT } from '../../shared/constants/alternativeText';
import { KURLY_PURPLE_BOX_DETAIL_LINK } from '../../shared/constants/linkUrl';

import NextImage from '../../../../shared/components/NextImage';
import deepLinkUrl from '../../../../shared/constant/deepLink';

import { isWebview } from '../../../../../util/window/getDevice';
import { PURPLEBOX_PRODUCT_ID } from '../../../../shared/configs/config';

const Wrapper = styled.div`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 202vw;
`;

const KurlyPurpleBoxDetailPage = styled.a`
  position: absolute;
  bottom: 13vw;
  left: 0;
  width: 100%;
  height: 17vw;
  font-size: 0;
  line-height: 0;
`;

const productUrl = isWebview() ? `${deepLinkUrl.PRODUCT}${PURPLEBOX_PRODUCT_ID}` : KURLY_PURPLE_BOX_DETAIL_LINK;

export default function KurlyPurpleBox() {
  return (
    <Wrapper>
      <ImageWrapper>
        <NextImage
          src={`${M_PURPLE_BOX_URL}img_purplebox_16.jpg`}
          alt={KURLY_PURPLE_BOX_TEXT}
          layout="fill"
          objectFit="cover"
        />
      </ImageWrapper>
      <Link href={productUrl} passHref>
        <KurlyPurpleBoxDetailPage href={productUrl}>컬리 퍼플 박스 구매하러 가기</KurlyPurpleBoxDetailPage>
      </Link>
    </Wrapper>
  );
}
