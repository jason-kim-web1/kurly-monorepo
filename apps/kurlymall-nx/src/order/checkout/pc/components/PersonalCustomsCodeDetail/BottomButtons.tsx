import styled from '@emotion/styled';

import Button from '../../../../../shared/components/Button/Button';

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 30px;

  > button {
    font-weight: 500;
  }

  > button + button {
    margin-left: 10px;
  }
`;

interface Props {
  disabledSaveButton: boolean;
  onSubmit: () => void;
}

const BottomButtons = ({ onSubmit, disabledSaveButton }: Props) => {
  const handleCancel = () => {
    window.close();
  };

  return (
    <ButtonWrap>
      <Button theme="tertiary" radius={3} height={56} text="취소" onClick={handleCancel} />
      <Button radius={3} height={56} text="저장" type="submit" onClick={onSubmit} disabled={disabledSaveButton} />
    </ButtonWrap>
  );
};

export default BottomButtons;
