import styled from '@emotion/styled';

import { NoMainImageLogo } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';

const Container = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 175px;
  outline: none;
  background-color: ${COLOR.kurlyGray200};
`;

interface Props {
  src: string;
  href: string;
}

export default function InstagramReviewItem({ src, href }: Props) {
  return (
    <Container href={href}>
      <NextImage
        src={src ? src : NoMainImageLogo}
        width={175}
        height={175}
        objectFit="cover"
        alt="인스타그램 리뷰 사진"
      />
    </Container>
  );
}
