import styled from '@emotion/styled';

import useToggle from '../../../shared/hooks/useToggle';
import COLOR from '../../../../../shared/constant/colorset';
import SlideToggleWrapper from '../../../../../shared/components/motion/SlideToggleWrapper';
import Arrow from '../../../../../shared/components/icons/Arrow';

const Wrapper = styled.div`
  margin-top: 24px;
  padding: 18px 0;
  border-top: 1px solid ${COLOR.kurlyGray200};
  border-bottom: 1px solid ${COLOR.kurlyGray200};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
`;

const Content = styled.div`
  padding-top: 22px;
  color: ${COLOR.kurlyGray450};
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PersonalCustomsCodeDescription = () => {
  const { isOpen, toggle } = useToggle();
  return (
    <Wrapper>
      <Button type="button" onClick={toggle}>
        <Title>개인통관고유부호란?</Title>
        <Arrow isOpen={isOpen} />
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
