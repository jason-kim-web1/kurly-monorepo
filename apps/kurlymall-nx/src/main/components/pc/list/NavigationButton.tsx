import styled from '@emotion/styled';

import { navButtonLeft, navButtonLeftOver } from '../../../../shared/images';

const Button = styled.button`
  position: absolute;
  z-index: 100;
  background: none;
  border: 0;
  outline: 0;
  width: 60px;
  height: 60px;
`;

const NavButton = styled(Button)`
  background: url(${navButtonLeft}) no-repeat 50% 50%;
  transition: background 0.5s ease 0s;
  &:hover {
    background-image: url(${navButtonLeftOver});
  }
`;

interface Props {
  className?: string;
  onClick(): void;
}

export default function NavigationButton({ className, onClick }: Props) {
  return <NavButton type="button" className={className} onClick={onClick} />;
}
