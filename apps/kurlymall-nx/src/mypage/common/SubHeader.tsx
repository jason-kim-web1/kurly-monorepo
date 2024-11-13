import styled from '@emotion/styled';

import Link from 'next/link';

import { ReactNode } from 'react';

import COLOR from '../../../src/shared/constant/colorset';
import ArrowRightPurple from '../../shared/components/icons/PurpleArrowRight';
import { INQUIRY_PATH } from '../../shared/constant/common-path';

const Wrapper = styled.div<{ subTitle?: string | ReactNode }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding-bottom: ${({ subTitle }) => subTitle && '20px'};
  border-bottom: 2px solid ${COLOR.kurlyGray800};
`;

const SubTitle = styled.h3`
  font-weight: 500;
  font-size: 20px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -0.43px;
`;

const Summary = styled.span`
  padding-left: 24px;
  font-size: 12px;
  color: #777;
  letter-spacing: -0.2px;
`;

const LinkDescription = styled.span`
  flex: 1;
  text-align: right;
  margin: 0 4px;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray600};
`;

const StrongDescription = styled.a`
  font-weight: 500;
  color: ${COLOR.kurlyPurple};
`;

const InquiryLinkArrow = styled(ArrowRightPurple)`
  width: 16px;
  height: 16px;
`;

interface Props {
  subTitle?: string | ReactNode;
  summary?: string;
  linkDescription?: string;
}

export default function SubHeader({ subTitle, summary, linkDescription }: Props) {
  return (
    <Wrapper subTitle={subTitle}>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      {summary && <Summary>{summary}</Summary>}
      {linkDescription && (
        <LinkDescription>
          {linkDescription}
          <Link href={INQUIRY_PATH.inquiry.uri} passHref>
            <StrongDescription>
              {' '}
              1:1 문의
              <InquiryLinkArrow />
            </StrongDescription>
          </Link>
        </LinkDescription>
      )}
    </Wrapper>
  );
}
