import Link from 'next/link';

import styled from '@emotion/styled';

import { EVENT_PATH } from '../../../../shared/constant';
import EmptyError from '../../../../shared/icons/EmptyError';
import COLOR from '../../../../shared/constant/colorset';
import { responsiveClass } from '../../shared/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 30vw 0;
  text-align: center;

  strong {
    font-size: 20px;
    color: ${COLOR.kurlyGray600};
  }
  p {
    font-size: 15px;
    line-height: 1.25;
    color: ${COLOR.kurlyGray400};
  }
  a {
    height: 34px;
    line-height: 34px;
    padding: 0 20px;
    border-radius: 17px;
    background-color: ${COLOR.kurlyPurple};
    color: ${COLOR.kurlyWhite};
  }

  &.pc {
    padding: 220px 0 100px;
    gap: 30px;

    strong {
      font-weight: 500;
      font-size: 28px;
    }
    p {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

export default function PaymentEmpty() {
  return (
    <Container className={responsiveClass}>
      <EmptyError />
      <strong>현재 진행중인 결제혜택이 없습니다.</strong>
      <p>
        쓸수록 혜택이 커지는 컬리카드!
        <br />
        즉시 할인에 추가 혜택까지 아낌없이 드려요.
      </p>
      <Link href={EVENT_PATH.plcc.uri} passHref>
        <a href={EVENT_PATH.plcc.uri}>컬리카드 자세히 보러 가기</a>
      </Link>
    </Container>
  );
}
