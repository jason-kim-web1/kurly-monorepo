import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useToggle from '../../../shared/hooks/useToggle';
import COLOR from '../../../../../shared/constant/colorset';
import SlideToggleWrapper from '../../../../../shared/components/motion/SlideToggleWrapper';
import { ArrowDown } from '../../../../../shared/icons';

const Wrapper = styled.div`
  margin-top: 36px;
  padding: 12px 0;
  border-top: 1px solid ${COLOR.kurlyGray200};
  border-bottom: 1px solid ${COLOR.kurlyGray200};
`;

const Content = styled.div`
  padding: 19px 20px 18px 20px;
  color: ${COLOR.kurlyGray450};
  font-size: 12px;
  line-height: 18px;
  font-weight: 400px;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray600};
`;

const Button = styled.button`
  width: 100%;
  > span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const arrowIconStyle = (isOpen: boolean) => css`
  transition: transform 0.5s ease-out;
  transform: ${isOpen ? 'rotate(-180deg)' : 'none'};
`;

const PersonalCustomsCodeDescription = () => {
  const { isOpen, toggle } = useToggle();
  return (
    <Wrapper>
      <Button type="button" onClick={toggle}>
        <span>
          <Title>개인통관고유부호란?</Title>
          <ArrowDown css={arrowIconStyle(isOpen)} width={18} height={18} stroke={COLOR.kurlyGray800} />
        </span>
      </Button>
      <SlideToggleWrapper opened={isOpen}>
        <Content>
          개인물품 수입신고시 주민등록번호 대신 활용할 수 있으며, 관세청을 통해서 발급 받을 수 있습니다. 관세청
          시스템에서 신청 즉시 부여되며, 한 번 부여받은 부호는 같은 번호로 계속 사용이 가능합니다.
        </Content>
      </SlideToggleWrapper>
    </Wrapper>
  );
};

export default PersonalCustomsCodeDescription;
