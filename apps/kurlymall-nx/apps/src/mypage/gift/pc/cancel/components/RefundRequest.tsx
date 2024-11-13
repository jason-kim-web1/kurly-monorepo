import { useState } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import Button from '../../../../../shared/components/Button/Button';
import Checkbox from '../../../../../shared/components/Input/Checkbox';

const Wrapper = styled.div`
  padding: 0 30px 30px;
`;

const Text = styled.span`
  font-weight: 500;
`;

const Sub = styled.span`
  color: ${COLOR.kurlyGray450};
`;

const styles = {
  button: {
    marginTop: '20px',
    borderRadius: '3px',
    fontWeight: 500,
  },
  checkbox: {
    padding: '12px 0',
  },
};

interface Props {
  onClick: () => void;
}

export default function OrderCancel({ onClick }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <Wrapper>
      <Checkbox
        label={
          <>
            <Text>주문취소 내역에 동의</Text> (전자상거래) <Sub>(필수)</Sub>
          </>
        }
        id="kurly-cancel-agree"
        checked={agreed}
        css={styles.checkbox}
        onChange={() => setAgreed(!agreed)}
      />
      <Button text="주문 취소하기" css={styles.button} disabled={!agreed} onClick={onClick} />
    </Wrapper>
  );
}
