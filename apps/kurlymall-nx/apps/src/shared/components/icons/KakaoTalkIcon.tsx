import styled from '@emotion/styled';

import { KakaoTalkIconImg } from '../../images';

const Img = styled.img`
  width: 18px;
  height: 20px;
  vertical-align: bottom;
`;

interface Props {
  className?: string;
}

export default function KakaoTalkIcon({ className }: Props) {
  return <Img className={className} src={KakaoTalkIconImg} alt="KakaoTalk" />;
}
