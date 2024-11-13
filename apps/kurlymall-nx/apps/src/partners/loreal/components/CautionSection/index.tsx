import { motion } from 'framer-motion';
import styled from '@emotion/styled';

import { BASE_BREAK_POINT, CAUTION_TEXT_LIST } from '../../constants';
import ColorSet from '../../../../shared/constant/colorset';
import ArrowUp14x8 from '../../../../shared/components/icons/svg/ArrowUp14x8';
import useToggle from '../../../../order/checkout/shared/hooks/useToggle';

const Section = styled(motion.section)`
  padding: 0 30px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    padding: 0 12px;
  }
`;

const SectionInnerWrap = styled.div`
  border-top: 1px solid ${ColorSet.kurlyGray200};
  border-bottom: 1px solid ${ColorSet.kurlyGray200};
`;

const TitleButton = styled.button`
  width: 100%;
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 20px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    padding: 16px 0;
  }
`;

const TitleButtonText = styled.span`
  font-weight: 600;
  font-size: 16px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    font-weight: 500;
  }
`;

const CautionListWrap = styled(motion.div)`
  overflow: hidden;
`;

const ArrowIconWrap = styled(motion.span)`
  display: flex;
  margin-right: 10px;
  width: 14px;
  height: 8px;
  transform: rotate(180deg);
`;

const CautionList = styled(motion.ul)`
  padding: 6px 10px 23px 0;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    padding: 7px 10px 24px 0;
  }
`;

const CautionListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  line-height: 19px;
  ~ li {
    margin-top: 4px;
  }
`;

const CautionListBullet = styled.span`
  flex-shrink: 0;
  width: 3px;
  height: 3px;
  border-radius: 3px;
  margin-top: 8px;
  margin-right: 10px;
  background-color: ${ColorSet.kurlyGray350};
`;

const CautionListItemText = styled.p`
  color: ${ColorSet.kurlyGray450};
  font-weight: 400;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-all;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    letter-spacing: -0.5px;
    word-spacing: -0.1px;
  }
  a {
    text-decoration: underline;
  }
`;

const TextButton = styled.button<{ underline: boolean }>`
  display: inline;
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  color: ${ColorSet.kurlyGray450};
  font-weight: 400;
  font-size: 14px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    letter-spacing: -0.5px;
    word-spacing: -0.1px;
  }
`;

interface Props {
  onClickInquiryList(): void;
  isWebView: boolean;
}

const CautionSection = ({ onClickInquiryList, isWebView }: Props) => {
  const { toggle, isOpen } = useToggle();
  return (
    <Section>
      <SectionInnerWrap>
        <h2>
          <TitleButton type="button" onClick={toggle}>
            <TitleButtonText>유의사항</TitleButtonText>
            <ArrowIconWrap
              animate={isOpen ? 'opened' : 'closed'}
              variants={{
                opened: { transform: 'rotate(0deg)' },
                closed: { transform: 'rotate(180deg)' },
              }}
            >
              <ArrowUp14x8 />
            </ArrowIconWrap>
          </TitleButton>
        </h2>
        <CautionListWrap
          animate={isOpen ? 'opened' : 'closed'}
          variants={{
            opened: { opacity: 1, height: 'auto' },
            closed: { opacity: 0, height: 0 },
          }}
        >
          <CautionList>
            {CAUTION_TEXT_LIST.map((text, index) => {
              return (
                <CautionListItem key={`caution-list-${index}`}>
                  <CautionListBullet />
                  <CautionListItemText dangerouslySetInnerHTML={{ __html: text }} />
                </CautionListItem>
              );
            })}
            <CautionListItem>
              <CautionListBullet />
              <CautionListItemText>
                컬리와 마이뷰티박스 연결을 원하지 않으면, 컬리{' '}
                <TextButton type="button" underline={!isWebView} onClick={onClickInquiryList}>
                  1:1문의
                </TextButton>
                로 요청사항 남겨주세요.
              </CautionListItemText>
            </CautionListItem>
          </CautionList>
        </CautionListWrap>
      </SectionInnerWrap>
    </Section>
  );
};

export default CautionSection;
