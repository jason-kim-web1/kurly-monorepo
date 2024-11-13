import styled from '@emotion/styled';

import { isEmpty } from 'lodash';
import { Fragment } from 'react';

import COLOR from '../../../../../../shared/constant/colorset';
import type { ProductInfoDictionaryItem } from '../../../../types';

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 36px;
  font-size: 13px;
  color: ${COLOR.kurlyGray800};
  line-height: 18px;
  letter-spacing: -0.5px;
`;

const BlankRowBox = styled.div`
  width: 100%;
  min-height: 256px;
`;

const ItemKey = styled.li`
  width: 180px;
  padding: 0 18px 18px;
  background-color: ${COLOR.bgLightGray};
  word-break: break-all;
  white-space: pre-line;

  :nth-of-type(1) {
    padding-top: 18px;
  }
  :nth-of-type(3) {
    padding-top: 18px;
  }
`;

const ItemValue = styled.li`
  display: flex;
  width: 325px;
  padding: 0 18px 18px;
  color: ${COLOR.kurlyGray600};
  white-space: pre-line;

  :nth-of-type(2) {
    padding-top: 18px;
  }
  :nth-of-type(4) {
    padding-top: 18px;
  }
`;

interface Props {
  notice: ProductInfoDictionaryItem[];
}

export default function ProductNoticeTable({ notice }: Props) {
  const displayNoticeBlankItem = notice.length > 1 && notice.length % 2 === 1;

  return (
    <Container>
      {isEmpty(notice) ? (
        <BlankRowBox />
      ) : (
        <>
          {notice.map(({ title, description }, i) => (
            <Fragment key={i}>
              <ItemKey>{title}</ItemKey>
              <ItemValue>{description}</ItemValue>
            </Fragment>
          ))}
          {displayNoticeBlankItem && <ItemKey />}
        </>
      )}
    </Container>
  );
}
