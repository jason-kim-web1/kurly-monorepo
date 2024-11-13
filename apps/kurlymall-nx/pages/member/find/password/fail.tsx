import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import Header from '../../../../src/header/components/Header';
import Button from '../../../../src/shared/components/Button/Button';
import Footer from '../../../../src/footer/components/Footer';

import { ErrorIconPcImg } from '../../../../src/shared/images';

import { useScreenName } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';
import { redirectTo } from '../../../../src/shared/reducers/page';

const Content = styled.div`
  min-width: 1050px;
  padding: 50px 0;
  background-color: white;
`;

const ContentArea = styled.div`
  position: relative;
  max-width: 400px;
  margin: auto;
  text-align: center;

  button {
    display: inline-block;
    margin-top: 30px;

    span {
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const styles = {
  message: {
    fontSize: '28px',
    fontWeight: 500,
    color: '#666666',
    ':before': {
      content: '""',
      display: 'block',
      width: '100px',
      height: '100px',
      margin: '0 auto 20px',
      background: `url(${ErrorIconPcImg})`,
      backgroundSize: 'cover',
    },
  },
  notice: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#b5b5b5',
    lineHeight: 1.44,
  },
};

export default function PasswordFailPage() {
  useScreenName(ScreenName.FIND_PASSWORD);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      redirectTo({
        url: '/member/find/password',
      }),
    );
  };

  return (
    <>
      <Header />
      <Content>
        <ContentArea>
          <ContentContainer>
            <p css={styles.message}>유효하지 않은 URL</p>
            <p css={styles.notice}>
              유효하지 않은 URL입니다.
              <br />
              메일함을 확인하시거나 비밀번호 찾기를 다시 시도해 주세요.
            </p>
          </ContentContainer>

          <Button text="다시 비밀번호 찾기" width={200} height={44} onClick={handleClick} />
        </ContentArea>
      </Content>
      <Footer />
    </>
  );
}
