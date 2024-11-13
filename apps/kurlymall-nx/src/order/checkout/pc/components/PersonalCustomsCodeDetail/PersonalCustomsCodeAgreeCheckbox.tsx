import styled from '@emotion/styled';

import Checkbox from '../../../../../shared/components/Input/Checkbox';
import COLOR from '../../../../../shared/constant/colorset';
import useToggle from '../../../shared/hooks/useToggle';
import PersonalCustomCodeTermsModal from '../../../m/containers/PersonalCustomCodeTermsModal';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Button = styled.button`
  font-size: 13px;
  color: ${COLOR.kurlyGray450};
  text-decoration: underline;
`;

const styles = {
  checkbox: {
    padding: 0,
  },
};

interface Props {
  isAgreed: boolean;
  onClick: () => void;
}

const PersonalCustomsCodeAgreeCheckbox = ({ isAgreed, onClick }: Props) => {
  const { isOpen, open, close } = useToggle();

  return (
    <Wrapper>
      <Checkbox
        css={styles.checkbox}
        label={<Label>개인통관고유부호 수집 및 이용동의 (필수)</Label>}
        checked={isAgreed}
        onClick={onClick}
      />
      <Button onClick={open}>보기</Button>
      <PersonalCustomCodeTermsModal open={isOpen} onClose={close} />
    </Wrapper>
  );
};

export default PersonalCustomsCodeAgreeCheckbox;
