import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { USER_MENU_PATH } from '../../../../../shared/constant';
import COLOR from '../../../../../shared/constant/colorset';

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

  const [height, setHeight] = useState(0);

  const moveHome = () => {
    dispatch(
      redirectTo({
        url: USER_MENU_PATH.home.uri,
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

  return (
    <Wrapper height={height}>
      <Image src="https://res.kurly.com/kurly/ico/2021/gift_error_68_68_gray.svg" alt="" />
      <Title>주문 취소를 실패했습니다.</Title>
      <Description>
        <p>
          상품준비가 시작되어 직접 주문 취소가 불가능합니다.
          <br />
          고객행복센터로 문의바랍니다.
        </p>
      </Description>
      <ButtonGroup
        css={styles.buttonGroup}
        isFixed
        contents={[
          {
            text: '홈으로 이동',
            height: 52,
            onClick: moveHome,
          },
        ]}
      />
    </Wrapper>
  );
}
