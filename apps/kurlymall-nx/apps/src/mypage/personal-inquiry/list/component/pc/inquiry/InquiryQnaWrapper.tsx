import { Fragment, ReactNode } from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import Question from '../../../../icons/Question';
import Answer from '../../../../icons/Answer';
import InquiryQnaImages from './InquiryQnaImages';

import { UserInquiryContentImageData } from '../../../types';
import COLOR from '../../../../../../shared/constant/colorset';
import { splitTexts } from '../../../../../../shared/utils';

type InquiryQnaType = 'ANSWER' | 'QUESTION';

const Wrapper = styled.div`
  display: flex;
`;

const Contents = styled.div`
  width: 744px;
  margin-top: 3px;
  margin-left: 12px;
`;

const Text = styled.span(({ type }: { type: InquiryQnaType }) => ({
  fontSize: '14px',
  lineHeight: 'normal',
  color: type === 'QUESTION' ? COLOR.kurlyGray800 : COLOR.kurlyGray600,
}));

const CreatedAt = styled.div`
  margin-top: 22px;
  font-size: 14px;
  color: ${COLOR.kurlyGray450};
`;

const OrderNo = styled.div`
  margin-bottom: 20px;
`;

const iconStyle = {
  width: 24,
  height: 24,
};

interface Props {
  text: string;
  type: InquiryQnaType;
  children: ReactNode;
  createdAt?: string;
  images?: UserInquiryContentImageData[];
  orderNo?: number | null;
}

export default function InquiryQnaWrapper({ text, type, images, children, createdAt, orderNo }: Props) {
  return (
    <>
      {children}
      <Wrapper>
        {type === 'QUESTION' && <Question css={iconStyle} />}
        {type === 'ANSWER' && <Answer css={iconStyle} />}
        <Contents>
          {!!orderNo && <OrderNo>{`[주문번호 ${orderNo}]`}</OrderNo>}
          {splitTexts(text).map((it) => (
            <Fragment key={`text-frag-${it.id}`}>
              <Text type={type}>{it.text}</Text>
              <br />
            </Fragment>
          ))}
          {images && <InquiryQnaImages images={images} />}
          {type === 'ANSWER' && createdAt && <CreatedAt>{moment(createdAt).format('YYYY.MM.DD')}</CreatedAt>}
        </Contents>
      </Wrapper>
    </>
  );
}
