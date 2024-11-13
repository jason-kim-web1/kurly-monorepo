import styled from '@emotion/styled';

import Button from '../../../../../shared/components/Button/Button';

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 22px;

  button {
    font-weight: 600;
    font-size: 16px;
  }
`;

interface Props {
  disabled: boolean;
  onSubmit: () => void;
}

const SaveButton = ({ disabled, onSubmit }: Props) => {
  return (
    <ButtonWrap>
      <Button radius={6} height={48} text="저장" type="submit" onClick={onSubmit} disabled={disabled} />
    </ButtonWrap>
  );
};

export default SaveButton;
