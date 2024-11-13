import styled from '@emotion/styled';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import InquiryKakao from './InquiryKakao';
import COLOR from '../../shared/constant/colorset';

import { getPageUrl, INQUIRY_PATH } from '../../shared/constant';
import { amplitudeService } from '../../shared/amplitude';
import { SelectBottomOnebyoneButton } from '../../shared/amplitude/events/footer';
import { redirectTo } from '../../shared/reducers/page';
import TextDivider from '../../shared/icons/TextDivider';
import { BULK_ORDER_GOOGLE_FORM_LINK } from '../../header/constants';

const Container = styled.div``;

const Title = styled.p`
  padding-bottom: 17px;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
`;

const Text = styled.span`
  margin-left: 8px;
  font-weight: normal;
  font-size: 16px;
`;

const Call = styled.strong`
  display: block;
  padding-bottom: 20px;
  font-size: 28px;
  line-height: 40px;
`;

const CustomerMenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const inquiryStyle = `
  display: block;
  width: 140px;
  height: 40px;
  margin-bottom: 16px;
  margin-right: 16px;
  border: 1px solid ${COLOR.kurlyGray250};
  border-radius: 3px;
  line-height: 39px;
  text-align: center;
`;

const InquiryButton = styled.button`
  ${inquiryStyle}
`;

const InquiryLink = styled.a`
  ${inquiryStyle}
`;

const InquiryKakaoButton = styled(InquiryKakao)`
  margin-right: 16px;
  margin-bottom: 16px;
`;

const InquiryMenu = styled.div`
  display: flex;
  flex-direction: row;
`;

const InquiryText = styled.div`
  margin-top: 2px;
  color: ${COLOR.kurlyGray450};
  letter-spacing: -0.5px;
  line-height: 16.8px;
`;

const CustomerMail = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
`;

const TextSplit = styled(TextDivider)`
  margin: 0 6px;
`;

export default function CustomerMenu() {
  const dispatch = useDispatch();

  const handleClickInquiry = useCallback(() => {
    void amplitudeService.logEvent(new SelectBottomOnebyoneButton());
    dispatch(redirectTo({ url: getPageUrl(INQUIRY_PATH.inquiry) }));
  }, [dispatch]);

  return (
    <Container>
      <Title>고객행복센터</Title>
      <Call>
        1644-1107
        <Text>월~토요일 오전 7시 - 오후 6시</Text>
      </Call>
      <CustomerMenuList>
        <InquiryMenu>
          <InquiryKakaoButton />
          <InquiryText>
            월~토요일
            <TextSplit />
            오전 7시 - 오후 6시
            <br />
            일/공휴일
            <TextSplit />
            오전 7시 - 오후 1시
          </InquiryText>
        </InquiryMenu>
        <InquiryMenu>
          <InquiryButton onClick={handleClickInquiry}>1:1 문의</InquiryButton>
          <InquiryText>
            365일
            <br />
            고객센터 운영시간에 순차적으로 답변드리겠습니다.
          </InquiryText>
        </InquiryMenu>
        <InquiryMenu>
          <InquiryLink href={BULK_ORDER_GOOGLE_FORM_LINK} target="_blank">
            대량주문 문의
          </InquiryLink>
          <InquiryText>
            월~금요일
            <TextSplit />
            오전 9시 - 오후 6시
            <br />
            점심시간
            <TextSplit />낮 12시 - 오후 1시
          </InquiryText>
        </InquiryMenu>
      </CustomerMenuList>
      <CustomerMail>
        비회원 문의 : <a href="mailto:help@kurlycorp.com">help@kurlycorp.com</a>
      </CustomerMail>
    </Container>
  );
}
