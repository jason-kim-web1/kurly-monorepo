import styled from '@emotion/styled';

import { css } from '@emotion/react';

import CreateCard from '../components/KurlyCard/CreateCard';
import COLOR from '../../../../shared/constant/colorset';
import PointUsage from '../components/KurlyCard/PointUsage';
import { useAppSelector } from '../../../../shared/store';
import { Panel } from '../../../../shared/components/Panel';
import { Divider } from '../../../../shared/components/Divider/Divider';

const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 19px 0 15px;
  background: ${COLOR.kurlyGray200};
`;

const PanelStyle = css`
  position: relative;
`;

export default function KurlyCardContainer() {
  const hasKurlypayError = useAppSelector(({ checkoutPayment }) => checkoutPayment.hasKurlypayError);
  const usedPoint = useAppSelector(({ checkout }) => checkout.usedPoint);

  return (
    <>
      <Panel title="컬리카드 혜택" css={PanelStyle}>
        <CreateCard />
        <SplitLine />
        <PointUsage disabled={hasKurlypayError || usedPoint > 0} />
      </Panel>
      <Divider />
    </>
  );
}
