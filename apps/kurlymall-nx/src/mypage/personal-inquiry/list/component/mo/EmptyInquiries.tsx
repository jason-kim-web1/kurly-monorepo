import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { redirectTo } from '../../../../../shared/reducers/page';
import { BOARD_PATH, getPageUrl } from '../../../../../shared/constant';

const Container = styled.div`
  height: calc(100vh - 350px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  line-height: normal;
  color: #b5b5b5;
`;

const Button = styled.button({
  padding: '11px 20px',
  marginTop: '24px',
  border: 'solid 1px #5f0080',
  borderRadius: '22px',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: 'normal',
  color: '#5f0080',
  backgroundColor: 'white',
});

export default function EmptyInquiries() {
  const dispatch = useDispatch();

  const handleClickButton = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(BOARD_PATH.faq),
      }),
    );
  };

  return (
    <Container>
      <div>등록된 1:1 문의가 없습니다.</div>
      <Button type="button" onClick={handleClickButton}>
        자주하는 질문 보기
      </Button>
    </Container>
  );
}
