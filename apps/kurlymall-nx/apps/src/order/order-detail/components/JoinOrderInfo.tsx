import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import COLOR from '../../../shared/constant/colorset';
import BaseWrapper from '../../common/components/BaseWrapper';
import { JoinOrderMeta } from '../../common/interface/JoinOrderMeta';
import { getJoinOrderDateFormat } from '../../../mypage/order/shared/util/getOrderDateFormat';
import Button from '../../../shared/components/Button/Button';
import { Clip } from '../../../shared/icons/Clip';
import Accordion from '../../common/components/Accordion';
import useJoinOrderInfo from '../hooks/useJoinOrderInfo';

const Wrapper = styled(BaseWrapper)`
  padding: ${vars.spacing.$20} ${vars.spacing.$16};
  margin-bottom: ${vars.spacing.$8};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.span`
  min-width: 120px;
  flex-shrink: 1;
  color: ${COLOR.kurlyGray600};
`;

const Description = styled.span`
  flex-grow: 1;
  color: ${COLOR.kurlyGray800};
  word-break: break-all;
`;

const DescriptionRow = styled.span`
  display: flex;
  align-items: center;
`;

const PurlpleBoldText = styled.span`
  color: ${COLOR.kurlyPurple};
  font-weight: 600;
`;

const ButtonWrapper = styled.div`
  margin-top: 12px;

  svg {
    margin-right: 6px;
  }

  span {
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin-right: 5px;
  }
`;

const InfoText = styled.div`
  margin-top: 12px;
  font-size: 13px;
  color: ${COLOR.kurlyGray450};
  line-height: 18px;
`;

const Divider = styled.div`
  min-width: 1px;
  min-height: 12px;
  margin: 0 8px;
  background-color: ${COLOR.lightGray};
`;

export default function JoinOrderInfo({ joinOrderMeta }: { joinOrderMeta: JoinOrderMeta }) {
  const { status, endDate, joinedPeopleCount, requiredPeopleCount } = joinOrderMeta;
  const { isOpen, toggle, handleClickCopyLinkButton } = useJoinOrderInfo({ joinOrderMeta });

  return (
    <Accordion title="함께구매 정보" isOpen={isOpen} onClick={toggle}>
      <Wrapper>
        <Row>
          <Title>진행상태</Title>
          <Description>
            <PurlpleBoldText>{status}</PurlpleBoldText>
          </Description>
        </Row>
        <Row>
          <Title>참여현황</Title>
          <DescriptionRow>
            <span>{joinedPeopleCount}명 참여</span>
            <Divider />
            <span>총 {requiredPeopleCount}명</span>
          </DescriptionRow>
        </Row>
        <Row>
          <Title>기간</Title>
          <Description>{getJoinOrderDateFormat(endDate)}</Description>
        </Row>
        <ButtonWrapper>
          <Button
            text="링크 복사하기"
            theme="tertiary"
            onClick={handleClickCopyLinkButton}
            icon={<Clip width={16} height={16} stroke={COLOR.kurlyBlack} />}
            height={40}
            radius={6}
          />
        </ButtonWrapper>
        <InfoText>
          <p>기간 내에 함께구매가 성공하면 배송이 시작됩니다.</p>
          <p>참여인원을 달성하지 못하면 자동으로 주문이 취소됩니다.</p>
        </InfoText>
      </Wrapper>
    </Accordion>
  );
}
