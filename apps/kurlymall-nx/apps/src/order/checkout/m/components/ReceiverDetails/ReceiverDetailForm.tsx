import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

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
  justify-content: flex-end;
  padding: 0 20px;
`;

const Contents = styled.div`
  overflow-y: auto;
  padding: 0 20px 20px;
  @supports (bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(constant(safe-area-inset-bottom) + 20px);
  }
  @supports (bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const styles = {
  checkbox: {
    marginTop: '8px',
    padding: '12px 0',
  },
  button: {
    '> span': {
      fontWeight: 600,
    },
    marginTop: '8px',
  },
};

interface Props {
  isSameOrderer: boolean;
  receiverForm: ReceiverForm;
  onClickSameOrderer: (value: boolean) => void;
  onChange: (params: { name: string; value: string }) => void;
  onSubmit: () => void;
  onClickCancel?: () => void;
}

export default function ReceiverDetailForm({
  isSameOrderer,
  receiverForm,
  onClickSameOrderer,
  onChange,
  onSubmit,
}: Props) {
  const handleClick = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onClickSameOrderer(!!target.checked);
  };

  const { name, phone } = receiverForm;

  return (
    <>
      <Header>
        <Checkbox label="주문자 정보와 동일" checked={isSameOrderer} onChange={handleClick} css={styles.checkbox} />
      </Header>
      <Contents>
        <ReceiverField name={name} phone={phone} onChange={onChange} />
        <ReceiverDirectShipping receiverForm={receiverForm} onChange={onChange} />
        <ReceiverDetailTerms />
        <ButtonWrap>
          <Button radius={6} height={48} text="동의하고 저장" type="submit" onClick={onSubmit} css={styles.button} />
        </ButtonWrap>
      </Contents>
    </>
  );
}
