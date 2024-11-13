import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

import { zIndex } from '../../../../../shared/styles';
import COLOR from '../../../../../shared/constant/colorset';
import { ReceiverForm } from '../../../shared/interfaces';

import ReceiverField from './ReceiverField/ReceiverField';
import ReceiverDirectShipping from './ReceiverDirectShipping';
import Checkbox from '../../../../../shared/components/Input/Checkbox';
import Button from '../../../../../shared/components/Button/Button';
import { ReceiverDetailTerms } from '../../../shared/components/ReceiverDetail/ReceiverDetailTerms';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.fixedHeader};
  width: 100%;
  padding: 30px 30px 14px;
  background: ${COLOR.kurlyWhite};
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: ${COLOR.kurlyGray800};
  + label {
    padding: 6px 0;
  }
`;

const Contents = styled.div`
  overflow-y: auto;
  padding: 90px 30px 30px;
  height: 100vh;
  box-sizing: border-box;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 8px;
  > button + button {
    margin-left: 10px;
  }
`;

const styles = {
  checkbox: {
    marginTop: '9px',
    fontSize: '14px',
    padding: '12px 0',
    letterSpacing: '-0.5px',
  },
  button: {
    '> span': {
      fontWeight: 500,
    },
  },
};

interface Props {
  isSameOrderer: boolean;
  receiverForm: ReceiverForm;
  onClickSameOrderer: (value: boolean) => void;
  onChange: (params: { name: string; value: string }) => void;
  onSubmit: () => void;
  onClickCancel: () => void;
}

export default function ReceiverDetailForm({
  isSameOrderer,
  receiverForm,
  onClickSameOrderer,
  onChange,
  onSubmit,
  onClickCancel,
}: Props) {
  const handleClick = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onClickSameOrderer(!!target.checked);
  };

  const { name, phone } = receiverForm;

  return (
    <>
      <Header>
        <Title>배송 요청사항</Title>
        <Checkbox label="주문자 정보와 동일" checked={isSameOrderer} onChange={handleClick} css={styles.checkbox} />
      </Header>
      <Contents>
        <ReceiverField name={name} phone={phone} onChange={onChange} />
        <ReceiverDirectShipping receiverForm={receiverForm} onChange={onChange} />
        <ReceiverDetailTerms />
        <ButtonWrap>
          <Button theme="tertiary" radius={3} height={56} text="취소" onClick={onClickCancel} css={styles.button} />
          <Button radius={3} height={56} text="동의하고 저장" type="submit" onClick={onSubmit} css={styles.button} />
        </ButtonWrap>
      </Contents>
    </>
  );
}
