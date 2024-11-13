import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

import { isEmpty } from 'lodash';

import { useAppSelector } from '../../../../../shared/store';

import { GIFT_PATH, getPageUrl } from '../../../../../shared/constant';
import COLOR from '../../../../../shared/constant/colorset';
import { splitTexts } from '../../../../../shared/utils';

import Button from '../../../../../shared/components/Button/Button';
import { redirectTo } from '../../../../../shared/reducers/page';

const Wrapper = styled.div`
  width: 400px;
  padding: 30px;
  margin: 0 auto;
  text-align: center;
  background: ${COLOR.kurlyWhite};
`;

const Image = styled.img`
  display: block;
  width: 68px;
  height: 68px;
  margin: 50px auto 8px;
`;

const Title = styled.strong`
  display: block;
  padding-bottom: 16px;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: ${COLOR.kurlyGray600};
`;

const Description = styled.div`
  padding-bottom: 24px;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${COLOR.kurlyGray400};
`;

const styles = {
  button: {
    marginTop: '58px',
    borderRadius: '3px',
  },
};

export default function CancelFailContainer() {
  const dispatch = useDispatch();

  const { orderNo, failMessage } = useAppSelector(({ mypageGiftCancel }) => mypageGiftCancel);

  const moveGiftDetail = () => {
    dispatch(
      redirectTo({
        url: `${getPageUrl(GIFT_PATH.detail)}${orderNo}`,
      }),
    );
  };

  const moveGiftList = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(GIFT_PATH.list),
      }),
    );
  };

  const message = useMemo(() => splitTexts(failMessage), [failMessage]);

  return (
    <Wrapper>
      <Image src="https://res.kurly.com/kurly/ico/2021/gift_error_68_68_gray.svg" alt="" />
      <Title>주문 취소를 실패했습니다.</Title>
      <Description>
        <p>
          주문 상태가 변경되어 직접 주문 취소가 불가능합니다.
          <br />
          고객센터로 문의바랍니다.
        </p>
        {message.map(({ id, text }) => (
          <p key={id}>{text}</p>
        ))}
      </Description>
      <Button
        text={isEmpty(failMessage) ? '선물 목록으로 돌아가기' : '선물 내역 상세로 돌아가기'}
        css={styles.button}
        onClick={isEmpty(failMessage) ? moveGiftList : moveGiftDetail}
      />
    </Wrapper>
  );
}
