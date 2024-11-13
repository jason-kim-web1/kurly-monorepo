import { memo } from 'react';
import styled from '@emotion/styled';

import { ReceiverInfo } from '../../shared/interfaces';
import COLOR from '../../../../shared/constant/colorset';

import InformationRow from '../../../../shared/components/layouts/InformationRow';

const styles = {
  row: {
    padding: '8px 0',
    '> span': {
      lineHeight: '24px',
    },
  },
};

const Wrapper = styled.div`
  padding: 10px 0;
`;

const Contents = styled.div`
  display: inline-flex;
  align-items: center;
  line-height: 24px;
`;

const Notice = styled.div`
  margin-top: 10px;
`;

const Message = styled.p`
  font-size: 12px;
  line-height: 21px;
  color: ${COLOR.kurlyGray600};
`;

interface Props {
  receiverInfo: ReceiverInfo;
}

function MemberOrdererInfo({ receiverInfo: { name, phone, email } }: Props) {
  return (
    <Wrapper id="kurly-orderer-info">
      <InformationRow title="보내는 분" css={styles.row}>
        <Contents>{name}</Contents>
      </InformationRow>
      <InformationRow title="휴대폰" css={styles.row}>
        <Contents>{phone}</Contents>
      </InformationRow>
      <InformationRow title="이메일" css={styles.row}>
        {email}
        <Notice>
          <Message>이메일을 통해 주문처리과정을 보내드립니다.</Message>
          <Message>
            정보 변경은 마이컬리
            {' > '}
            개인정보 수정 메뉴에서 가능합니다.
          </Message>
        </Notice>
      </InformationRow>
    </Wrapper>
  );
}

export default memo(MemberOrdererInfo);
