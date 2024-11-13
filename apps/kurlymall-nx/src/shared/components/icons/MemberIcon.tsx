import styled from '@emotion/styled';

import { MemeberIconImg } from '../../images';

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

interface Props {
  className?: string;
}

export default function MemberIcon({ className }: Props) {
  return <Img className={className} src={MemeberIconImg} alt="정보보기" />;
}
