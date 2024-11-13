import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import InformationList from '../../shared/components/InformationList/InformationList';
import { Panel } from '../../shared/components/Panel';

import { AppState } from '../../shared/store';

const Wrapper = styled.div`
  padding-bottom: 68px;
`;

export default function PolicyContainer() {
  const { status } = useSelector(({ gift }: AppState) => gift.receiver);

  // (임시) 케이스 별 약관이 다를 수 있습니다.
  const basicPolicy: string[] = ['취소 금액은 보내신 분의 결제 수단으로 환불됩니다.'];
  const isResult = status === 'ACCEPTED' || status === 'DELIVERED';
  const policy: string[] = isResult
    ? basicPolicy.concat('선물 문의가 있을 경우, 고객센터에 남겨주시면 신속히 해결해드리겠습니다.')
    : basicPolicy;

  return (
    <Wrapper>
      <Panel>
        <InformationList contents={policy} />
      </Panel>
    </Wrapper>
  );
}
