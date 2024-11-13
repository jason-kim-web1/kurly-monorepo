import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { BillingHistory, CurrentKurlyPass } from '../../../shared/interfaces';

import KurlyPassList from '../components/KurlyPassList';
import { useKurlyPassReceipt } from '../../shared/hooks/useKurlyPassReceipt';

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  background: ${COLOR.bg};
`;

const IntersectionPoint = styled.div`
  width: 1px;
  height: 1px;
`;

const Status = styled.div`
  padding: 18px 20px 10px 20px;
  text-align: right;
`;

const TerminatedButton = styled.button`
  display: inline-block;
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.kurlyPurple};
  vertical-align: top;
  &:after {
    display: inline-block;
    width: 6px;
    height: 9px;
    margin-left: 4px;
    background: url('https://res.kurly.com/mobile/ico/1710/ico_arrow_user_form_type2.png') no-repeat 0 0;
    background-size: 6px 9px;
    content: '';
  }
`;

interface Props {
  currentKurlyPass?: CurrentKurlyPass;
  list: BillingHistory[];
  loading: boolean;
  onNextPage: () => void;
  onClickTerminate: () => void;
}

export default function KurlyPassReceiptContainer({
  currentKurlyPass,
  list,
  loading,
  onClickTerminate,
  onNextPage,
}: Props) {
  const { ref } = useKurlyPassReceipt({ loading, onNextPage });

  return (
    <Wrapper>
      {currentKurlyPass && !currentKurlyPass?.isExpired && (
        <Status>
          <TerminatedButton type="button" onClick={onClickTerminate}>
            컬리패스 사용해지
          </TerminatedButton>
        </Status>
      )}
      <KurlyPassList list={list} loading={loading} />
      <IntersectionPoint ref={ref} />
    </Wrapper>
  );
}
