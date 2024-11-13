import { css } from '@emotion/react';

import styled from '@emotion/styled';

import Button from '../../../../../shared/components/Button/Button';
import COLOR from '../../../../../shared/constant/colorset';
import useIssuanceKurlypayCard from '../../../shared/hooks/useIssuanceKurlypayCard';
import usePlccPoint from '../../../shared/hooks/usePlccPoint';

const CardInfoText = styled.p`
  padding-top: 8px;
  color: ${COLOR.kurlyGray500};
`;

const styles = {
  button: css`
    position: absolute;
    top: 23px;
    right: 20px;
    padding: 0;
    > span {
      font-size: 13px;
      font-weight: 600;
    }
  `,
};

export default function KurlyCard() {
  const { handleCardFormSubmit } = useIssuanceKurlypayCard();
  const { isPLCCExisted } = usePlccPoint();

  return (
    <>
      <CardInfoText>[컬리카드] 첫 결제 3만원 할인</CardInfoText>
      {!isPLCCExisted && (
        <Button
          width={68}
          height={36}
          text="카드 발급"
          theme="primary"
          radius={4}
          css={styles.button}
          onClick={handleCardFormSubmit}
        />
      )}
    </>
  );
}
