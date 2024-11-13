import { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import { useAppSelector } from '../../../../../shared/store';

import { GIFT_PATH, getPageUrl } from '../../../../../shared/constant';
import COLOR from '../../../../../shared/constant/colorset';
import { splitTexts } from '../../../../../shared/utils';

import ButtonGroup from '../../../../../shared/components/Button/ButtonGroup';
import { redirectTo } from '../../../../../shared/reducers/page';

const Wrapper = styled.div<{ height: number }>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  height: ${({ height }) => (height === 0 ? '100vh' : `${height - 104}px`)};
`;

const Image = styled.img`
  display: block;
  width: 68px;
  height: 68px;
  margin: 0 auto 8px;
`;

const Title = styled.strong`
  display: block;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: normal;
  color: ${COLOR.kurlyGray600};
`;

const Description = styled.div`
  padding: 0 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${COLOR.kurlyGray400};
`;

const styles = {
  buttonGroup: {
    span: {
      fontWeight: 600,
    },
  },
};

export default function CancelFailContainer() {
  const dispatch = useDispatch();

  const { failMessage, orderNo } = useAppSelector(({ mypageGiftCancel }) => mypageGiftCancel);

  const [height, setHeight] = useState(0);

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

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const message = useMemo(() => splitTexts(failMessage), [failMessage]);

  const returnButton = isEmpty(failMessage)
    ? {
        text: '선물 목록으로 돌아가기',
        height: 52,
        onClick: moveGiftList,
      }
    : {
        text: '선물 내역 상세로 돌아가기',
        height: 52,
        onClick: moveGiftDetail,
      };

  return (
    <Wrapper height={height}>
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
      <ButtonGroup css={styles.buttonGroup} isFixed contents={[returnButton]} />
    </Wrapper>
  );
}
