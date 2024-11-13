import styled from '@emotion/styled';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';
import { iconError5f0080 } from '../../../../shared/images';
import useGetMemberBlockReason from '../queries/useGetMemberBlockReason';
import { LoadingSpinner } from '../../../../shared/components/LoadingSpinner';
import { BLOCK_USER_ERROR_MESSAGE } from '../../interface/BlockUser.interface';
import { redirectToLogin } from '../../../../shared/reducers/page';

const TitleContainer = styled.div<{ isPC: boolean }>`
  > div {
    text-align: center;
    h3 {
      margin-top: 24px;
      padding-bottom: 12px;
      font-size: 20px;
      line-height: 26px;
      font-weight: ${({ isPC }) => (isPC ? 500 : 600)};
      ${({ isPC }) => (isPC ? 'letter-spacing: -0.5px' : '')};
    }
    p {
      font-size: 14px;
      line-height: ${({ isPC }) => (isPC ? '20px' : '19px')};
    }
  }
  ul {
    position: relative;
    min-height: 84px;
    margin: 20px 0 ${({ isPC }) => (isPC ? '32px' : '24px')};
    padding: ${({ isPC }) => (isPC ? '16px 30px' : '14px 28px')};
    background: ${COLOR.kurlyGray100};
    border-radius: 6px;
    font-size: 14px;
    line-height: 20px;
  }
  li {
    display: flex;
    padding: 4px 0;
    span {
      flex-basis: ${({ isPC }) => (isPC ? '80px' : '68px')};
      margin-right: 12px;
      color: ${COLOR.kurlyGray600};
    }
    p {
      flex-basis: calc(100% - ${({ isPC }) => (isPC ? '80px' : '68px')});
    }
  }
`;
const LoadingSpinnerWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function TitleWithBlockReason({ isPC = true }: { isPC: boolean }) {
  const {
    data: UserBlockReason,
    status: UserBlockReasonStatus,
    refetch: UserBlockReasonRefetch,
    error,
  } = useGetMemberBlockReason();

  const dispatch = useDispatch();

  useEffect(() => {
    UserBlockReasonRefetch();
  }, [UserBlockReasonRefetch]);

  const message = (error as Error)?.message;

  useEffect(() => {
    if (message === BLOCK_USER_ERROR_MESSAGE.AUTHORIZATION_FAILED) {
      dispatch(
        redirectToLogin({
          message: BLOCK_USER_ERROR_MESSAGE.AUTHORIZATION_FAILED,
        }),
      );
    }
  }, [message, dispatch]);

  return (
    <TitleContainer isPC={isPC}>
      <div>
        <NextImage src={iconError5f0080} width={50} height={50} objectFit="contain" />
        <h3>
          비정상적인 로그인 시도로
          <br />
          고객님의 계정이 보호되었습니다.
        </h3>
        <p>개인정보 보호를 위해 비밀번호를 변경해 주세요.</p>
      </div>
      <ul>
        {UserBlockReasonStatus === 'loading' ? (
          <LoadingSpinnerWrap>
            <LoadingSpinner width={20} height={20} stroke={COLOR.kurlyGray500} />
          </LoadingSpinnerWrap>
        ) : (
          <>
            <li>
              <span>일시</span>
              <p>{UserBlockReason?.dateTime}</p>
            </li>
            <li>
              <span>사유</span>
              <p>{UserBlockReason?.reason}</p>
            </li>
          </>
        )}
      </ul>
    </TitleContainer>
  );
}
