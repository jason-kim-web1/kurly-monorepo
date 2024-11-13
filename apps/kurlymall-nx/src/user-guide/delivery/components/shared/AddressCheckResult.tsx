import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import Button from '../../../../shared/components/Button/Button';
import { DeliveryType } from '../../../../shared/interfaces/ShippingAddress';

const Container = styled.div`
  width: 327px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

const Title = styled.div`
  font-size: 18px;
  padding-top: 33px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
`;

const Highlight = styled.span`
  color: ${COLOR.kurlyPurple};
`;
const ImageContainer = styled.div`
  padding: 12px 0 34px;
`;

const MainImage = styled.img`
  width: 238px;
  height: 124px;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
  line-height: 1.29;
`;

const ConfirmButton = styled(Button)`
  border-radius: 6px;
  margin-top: 24px;
`;

export default function AddressCheckResult({
  result,
  areaName,
  onClickConfirm,
}: {
  result: DeliveryType;
  areaName?: string;
  onClickConfirm: () => void;
}) {
  return (
    <Container>
      {result === 'direct' ? (
        <>
          <Title>
            <Highlight>{areaName}</Highlight> 해당주소는
            <br />
            샛별배송 지역입니다
          </Title>
          <ImageContainer>
            <MainImage src="https://res.kurly.com/mobile/img/1908/img_delivery_kurly.png" alt="샛별배송 이미지" />
          </ImageContainer>
          <Description>매일 새벽, 문 앞까지 신선함을 전해드려요.</Description>
        </>
      ) : result === 'indirect' ? (
        <>
          <Title>하루배송 지역입니다.</Title>
          <ImageContainer>
            <MainImage src="https://res.kurly.com/mobile/img/1908/img_delivery_car.png" alt="하루배송 이미지" />
          </ImageContainer>
          <Description>오늘 주문하면 다음 날 바로 도착해요.</Description>
        </>
      ) : (
        <>
          <Title
            css={css`
              font-size: 22px;
            `}
          >
            배송 불가 지역입니다.
          </Title>

          <ImageContainer>
            <MainImage src="https://res.kurly.com/mobile/img/1908/img_delivery_none.png" alt="배송불가 이미지" />
          </ImageContainer>
          <Description>
            더 많은 곳에 배송될 수 있게
            <br />
            최선을 다하겠습니다.
          </Description>
        </>
      )}

      <ConfirmButton text="확인" onClick={onClickConfirm} />
    </Container>
  );
}
