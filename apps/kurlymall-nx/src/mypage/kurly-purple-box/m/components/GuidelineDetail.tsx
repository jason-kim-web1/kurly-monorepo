import styled from '@emotion/styled';

import Button from '../../../../shared/components/Button/Button';
import CloseButton from '../../../../shared/components/Button/CloseButton';
import COLOR from '../../../../shared/constant/colorset';
import PersonalInfo from './PersonalInfo';

const Header = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background: ${COLOR.kurlyWhite};
  z-index: 1;
`;

const HeaderTitle = styled.p`
  line-height: 44px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 5px;
  top: 0;
`;

const Wrapper = styled.div<{ isOpen: boolean }>`
  background: ${COLOR.kurlyWhite};
  position: fixed;
  top: ${({ isOpen }) => (isOpen ? 0 : 100)}%;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  max-height: 100vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  z-index: 9999;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;

const Footer = styled.div`
  padding: 8px 12px;
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 14%,
    ${COLOR.kurlyWhite} 100%,
    ${COLOR.kurlyWhite} 100%
  );
`;

interface Props {
  isOpen: boolean;
  handleClickClose: () => void;
}

export default function GuidelineDetail({ isOpen, handleClickClose }: Props) {
  return (
    <Wrapper isOpen={isOpen}>
      <Header>
        <ButtonWrapper>
          <CloseButton onClick={handleClickClose} />
        </ButtonWrapper>
        <HeaderTitle>개인 보냉 박스 이용 안내</HeaderTitle>
      </Header>
      <PersonalInfo />
      <Footer>
        <Button text="확인" radius={6} onClick={handleClickClose} />
      </Footer>
    </Wrapper>
  );
}
