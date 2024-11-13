import styled from '@emotion/styled';

const Img = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: bottom;
`;

interface Props {
  className?: string;
  src: string;
  alt: string;
}

export default function Icon({ className, src, alt }: Props) {
  return <Img className={className} src={src} alt={alt} />;
}
