import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';

const WarningText = styled.div`
  padding: ${isPC ? '14px 0 0' : '0 0 15px'};
  font-size: ${isPC ? '14px' : '12px'};
  ${!isPC && `color: ${COLOR.kurlyGray600}`};
`;

const List = styled.ul`
  padding-top: 10px;
  font-size: 12px;
  line-height: 18px;
`;

const Item = styled.li`
  padding-left: 8px;

  &:before {
    display: inline-block;
    text-indent: -8px;
    content: ${isPC ? '"-"' : '"•"'};
  }
`;

export default function BulkOrderWarningForm() {
  return (
    <>
      <InputGroup htmlFor="warningInfo" label="주의 사항">
        <WarningText>
          아래 경우 배송이 불가합니다.
          <List>
            <Item>제주도 및 도서산간, 상품에 따른 배송 이외지역의 경우</Item>
            <Item>수령 배송지가 명확하지 않을 경우</Item>
          </List>
        </WarningText>
      </InputGroup>
    </>
  );
}
