import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

const Message = styled.p`
  padding: 103px 0;
  height: 314px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: ${COLOR.kurlyGray400};
  text-align: center;
  &:before {
    display: block;
    margin: 0 auto 16px;
    width: 48px;
    height: 48px;
    background: url('https://res.kurly.com/kurly/img/2021/error_48_48_gray.svg') 0 0 no-repeat;
    content: '';
  }
`;

export default function Error() {
  return (
    <tr>
      <td colSpan={3}>
        <Message>
          일시적인 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </Message>
      </td>
    </tr>
  );
}
