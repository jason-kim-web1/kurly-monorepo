import styled from '@emotion/styled';

import { useState } from 'react';

import MultiColumns from './MultiColumn';
import Collapse from '../../../../../shared/components/Collapse/Collapse';
import { Divider } from '../../../../../shared/components/Divider/Divider';

const Wrapper = styled.div`
  position: relative;
  padding: 10px 20px 23px;
`;

export default function AdditionalInfo() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Collapse title="추가정보" summary="" onClick={() => setToggle((value: boolean) => !value)} opened={toggle}>
        <Wrapper>
          <MultiColumns
            columns={[
              {
                subject: '미배송 시 조치방법',
                contents: '결제수단으로 환불',
              },
            ]}
          />
        </Wrapper>
      </Collapse>
      <Divider />
    </>
  );
}
