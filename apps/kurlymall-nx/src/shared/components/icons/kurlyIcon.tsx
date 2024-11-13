import styled from '@emotion/styled';

// eslint-disable-next-line import/named
import { MarketKurlyIcon } from '../../images';

const Img = styled.img`
  display: inline-block;
  width: 156px;
  height: 120px;
`;

interface Props {
  className?: string;
}

export default function KurlyIcon({ className }: Props) {
  return <Img className={className} src={MarketKurlyIcon} alt="Market Kurly" />;
}
