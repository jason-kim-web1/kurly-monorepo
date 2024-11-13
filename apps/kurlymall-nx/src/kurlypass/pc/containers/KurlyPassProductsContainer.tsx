import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash';

import COLOR from '../../../shared/constant/colorset';

import Button from '../../../shared/components/Button/Button';
import Information from '../components/Information';
import { BillingHistory, CurrentKurlyPass } from '../../../shared/interfaces';
import BillingInfo from '../../shared/components/BillingInfo';

const Wrapper = styled.div`
  background: ${COLOR.bg};
`;

const ButtonStyle = css`
  margin: 0 auto 20px;
  border-radius: 0;
`;

const ExpiredButtonStyle = css`
  margin: 30px auto;
  border-radius: 0;
`;

const TerminatedButtonStyle = css`
  margin: 0 auto 30px;
  border: 0;
  background: transparent;
  height: auto;
  span {
    font-size: 14px;
    font-weight: 400;
  }
`;

interface Props {
  currentKurlyPass?: CurrentKurlyPass;
  list?: BillingHistory[];
  onClick: () => void;
  moveKurlyPass: () => void;
  onClickTerminate: () => void;
}

export default function KurlyPassProductsContainer({
  currentKurlyPass,
  list,
  onClick,
  moveKurlyPass,
  onClickTerminate,
}: Props) {
  if (isEmpty(list)) {
    return <Information onClick={moveKurlyPass} />;
  }

  if (!currentKurlyPass) {
    return (
      <>
        <Information onClick={moveKurlyPass} />
        <Button
          theme="secondary"
          width={368}
          height={44}
          text="결제내역 확인"
          onClick={onClick}
          css={ExpiredButtonStyle}
        />
      </>
    );
  }

  const isFreeInUse = currentKurlyPass && currentKurlyPass.status === 'P';

  return (
    <Wrapper>
      <BillingInfo currentKurlyPass={currentKurlyPass} isPC />
      <Button theme="secondary" width={368} height={44} text="결제내역 확인" onClick={onClick} css={ButtonStyle} />
      <Button
        theme="secondary"
        width={368}
        height={44}
        text={isFreeInUse ? '무료 체험 해지' : '컬리패스 사용해지'}
        onClick={onClickTerminate}
        css={TerminatedButtonStyle}
      />
      <Information onClick={moveKurlyPass} />
    </Wrapper>
  );
}
