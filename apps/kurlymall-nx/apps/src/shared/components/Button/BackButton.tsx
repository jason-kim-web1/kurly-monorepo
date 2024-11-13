import styled from '@emotion/styled';

import { BackArrow } from '../../images';

const Button = styled.button`
  width: 43px;
  height: 43px;
  background-image: url(${BackArrow});
  background-size: cover;
  background-position: center;
  background-color: transparent;
  border: none;
`;

interface Props {
  className?: any;
  onClick?: () => void;
}

export default function BackButton({
  className,
  onClick = () => {
    window.history.back();
  },
}: Props) {
  return <Button className={className} type="button" onClick={onClick} />;
}
