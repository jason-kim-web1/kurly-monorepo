import styled from '@emotion/styled';

const ListAdultNotice = styled.ul`
  padding: 15px 16px 16px 16px;
  border-radius: 6px;
  background-color: #fafafa;
`;

const ItemNotice = styled.li`
  position: relative;
  padding-left: 13px;
  font-size: 13px;
  color: #999;
  line-height: 19px;
  text-align: left;
  :before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 3px;
    height: 3px;
    border-radius: 100%;
    background-color: #ccc;
  }
`;

const ItemLink = styled.a`
  font-weight: bold;
  color: #666;
  text-decoration: underline;
  :after {
    content: '';
    display: block;
    @media (max-width: 320px) {
      display: none;
    }
  }
`;

export default function AdultNotice() {
  return (
    <ListAdultNotice>
      <ItemNotice>본인 명의의 휴대폰 정보를 사용해 주시기 바랍니다.</ItemNotice>
      <ItemNotice>타인의 정보를 도용하는 행위는 형사처벌 대상입니다.</ItemNotice>
      <ItemNotice>부정한 방법으로 성인인증 시 이용이 제한될 수 있습니다.</ItemNotice>
      <ItemNotice>
        인증에 실패했을 경우{' '}
        <ItemLink href="https://www.allcredit.co.kr/screen/sc4558891189" target="_blank">
          KCB 올크레딧 고객센터
        </ItemLink>
        (02-708-1000)으로 문의 부탁드립니다.
      </ItemNotice>
    </ListAdultNotice>
  );
}
