import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { LikeButtonIconHoverImg, LikeButtonIconOffImg } from '../../images';

const Button = styled.button`
  width: 36px;
  height: 36px;
  background: url(${LikeButtonIconOffImg}) no-repeat 50% 50%;
  :hover {
    background-image: url(${LikeButtonIconHoverImg});
  }
`;

export default function LikeIconbutton({ className, onClick, ...props }: HTMLAttributes<HTMLButtonElement>) {
  return <Button className={className} aria-label="찜하기" onClick={onClick} type="button" {...props} />;
}
