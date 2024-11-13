import styled from '@emotion/styled';

import { ErrorIconImg } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';

const Tr = styled.tr`
  td {
    font-size: 16px;
    font-weight: 500;
    color: ${COLOR.kurlyGray800};
    padding: 117px 0;
    text-align: center;
    cursor: default;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: ${COLOR.kurlyGray400};
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  span {
    display: block;
  }
`;

const WarningImage = styled.div`
  display: block;
  height: 60px;
  width: 60px;
  background: url(${ErrorIconImg}) no-repeat 0;
  background-size: cover;
  margin-bottom: 5px;
`;

export default function BoardTableBodyError() {
  return (
    <tbody>
      <Tr>
        <td colSpan={4}>
          <Content>
            <WarningImage />
            <span>일시적인 장애가 발생했어요.</span>
            <span>잠시 후 다시 시도해주세요.</span>
          </Content>
        </td>
      </Tr>
    </tbody>
  );
}
