import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import { ArrowCartUp, ArrowCartDown } from '../../../../../shared/images';

const Button = styled.button<{ openSection: boolean }>`
  position: absolute;
  right: 0;
  ${(props) => (props.openSection ? 'top: -68px;' : 'bottom: 0;')});
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 48px;
  background-color: ${COLOR.kurlyPurple};
  border-radius: 3px;
`;

const Text = styled.span`
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyWhite};
`;

const Img = styled.img`
  margin-left: 6px;
`;

interface Props {
  openSection: boolean;
  onClick: () => void;
}

export default function OpenButton({ openSection, onClick }: Props) {
  return (
    <Button openSection={openSection} onClick={onClick}>
      <Text>상품 선택</Text>
      <Img src={openSection ? ArrowCartDown : ArrowCartUp} alt="open_arrow" />
    </Button>
  );
}
