import { HTMLAttributes } from 'react';

import { ImageFormat } from '../../../../@types/images';

interface Props extends HTMLAttributes<HTMLImageElement> {
  src: string;
  format: ImageFormat;
  alt: string;
}

/**
 * Base64로 인코딩 된 이미지를 보여주는 컴포넌트입니다.
 *
 * @param { string } props.src API를 통해 받은 Base64로 인코딩 된 이미지 값
 * @param { ImageFormat } props.format img 확장자
 * @param { string } props.alt img alt
 */
export default function ImageWithBase64Src({ src, format, alt, ...props }: Props) {
  if (!src || !format || !alt) {
    return null;
  }

  return <img {...props} alt={alt} src={`data:image/${format};base64,${src}`} />;
}
