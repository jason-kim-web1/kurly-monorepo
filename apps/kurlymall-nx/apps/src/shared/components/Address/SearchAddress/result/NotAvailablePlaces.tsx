import { memo } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../constant/colorset';
import NextImage from '../../../NextImage';
import { isPC } from '../../../../../../util/window/getDevice';

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  margin-top: 16px;
  padding: 20px 0;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
`;

const ImageWrapper = styled.div`
  position: relative;
  min-height: 14px;
  min-width: 14px;
  margin: 3px 6px 0 0;
`;

const Title = styled.div`
  display: block;
  font-size: 12px;
  line-height: 19px;
  font-weight: ${isPC ? '600' : '500'};
  color: ${COLOR.invalidRed};
`;

const NotAvailablePlaces = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <NextImage src={'https://res.kurly.com/kurly/ico/2021/notice_14_14_f03f40.svg'} layout="fill" />
      </ImageWrapper>
      <Title>
        일부 관공서, 학교, 병원, 시장, 공단지역, 산간지역, 백화점 등은 현장 상황에 따라 샛별배송이 불가능할 수 있습니다.
      </Title>
    </Wrapper>
  );
};

export default memo(NotAvailablePlaces);
