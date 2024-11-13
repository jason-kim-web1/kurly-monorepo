import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

import { vars } from '@thefarmersfront/kpds-css';

import COLOR from '../../../shared/constant/colorset';
import { MembershipBenefitType } from './type';
import { Arrow } from '../../../shared/images';
import { isPC } from '../../../../util/window/getDevice';
import { zIndex } from '../../../shared/styles';

const Section = styled.section`
  padding: 0 20px;
  background-color: ${vars.color.$white};
`;

const HeaderSection = styled(Section)`
  padding-top: ${isPC ? 36 : 24}px;
  padding-bottom: ${isPC ? 30 : 24}px;
`;

const HeaderText = styled.div`
  font-size: 24px;
  line-height: 32px;
  font-weight: ${isPC ? 500 : 600};

  .purple {
    color: ${COLOR.beautyPurple};
  }
  .members {
    color: ${COLOR.kurlymembers};
  }
`;

const CancelHeaderText = styled(HeaderText)`
  font-size: ${isPC ? 24 : 22}px;
  text-align: center;
  word-break: keep-all;
`;

const Title = styled.div`
  padding: 16px 0;
  line-height: 20px;

  &.cancel {
    font-size: 16px;
  }
  &.ticket {
    padding-top: 40px;
  }

  .main {
    display: inline-block;
    font-weight: ${isPC ? 500 : 600};
    font-size: 18px;
    line-height: 22px;
  }
  .sub .main {
    padding-bottom: 4px;
  }

  .sub {
    font-size: 14px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;

    .link {
      display: flex;
      align-items: center;
      color: ${COLOR.kurlyGray450};
      font-weight: ${isPC ? 500 : 600};

      &:after {
        content: '';
        display: inline-block;
        margin-left: 0;
        width: 16px;
        height: 16px;
        background: url(${Arrow}) no-repeat 50% 50%;
        background-size: 6px 9px;
      }
    }
  }

  .date {
    color: ${COLOR.kurlyGray450};
  }
`;

const ContentWrapper = styled.div`
  padding-bottom: 24px;

  &.pc {
    padding-bottom: 30px;
  }
`;

const CouponGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding-bottom: ${isPC ? 30 : 24}px;
`;

const CouponCard = styled.div<{ isUsed: boolean; type: MembershipBenefitType }>`
  padding: 10px 12px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 12px;
  text-align: center;
  font-weight: 600;

  .badge {
    border: none;
    border-radius: 6px;
    display: inline-block;
    padding: 4px 6px;
    font-size: 12px;

    ${({ isUsed, type }) =>
      isUsed
        ? css`
            background-color: ${COLOR.lightGray};
            color: ${COLOR.kurlyWhite};
          `
        : type === MembershipBenefitType.POINT
        ? css`
            background-color: rgba(141, 76, 196, 0.09);
            color: ${COLOR.loversLavender};
          `
        : css`
            background-color: rgba(250, 98, 47, 0.12);
            color: ${COLOR.pointText};
          `}
  }

  .price {
    font-size: 20px;
    line-height: 27px;
    color: ${({ isUsed }) => (isUsed ? COLOR.lightGray : COLOR.kurlyGray800)};

    ${({ type }) =>
      type === MembershipBenefitType.POINT
        ? css`
            padding-top: 12px;
          `
        : css`
            padding: 8px 0 4px;
          `}
  }

  .condition {
    font-size: 12px;
    line-height: 1.25;
    font-weight: 400;
    color: ${({ isUsed }) => (isUsed ? COLOR.lightGray : COLOR.kurlyGray450)};
  }

  &.pc {
    .badge,
    .price {
      font-weight: 500;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${vars.spacing.$8};

  button {
    flex: 1;
  }
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vars.spacing.$12};
`;

const MessageBox = styled.div`
  margin-top: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${vars.spacing.$4};
  padding: ${vars.spacing.$12} ${vars.spacing.$0};
  border-radius: 8px;

  &.default {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    background: ${vars.color.background.$background2};
    color: ${vars.color.text.$primary};
  }
  &.error {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    background: ${vars.color.$red50};
    color: ${vars.color.main.$danger};
  }
`;

const CancelButtonGroup = styled.section<{
  paddingTop?: number;
  isVertical?: boolean;
  isRevers?: boolean;
  isSticky: boolean;
}>`
  display: flex;
  gap: 8px;
  padding: 0 12px 8px;

  ${({ paddingTop }) =>
    paddingTop &&
    css`
      padding-top: ${paddingTop}px;
    `};

  ${({ isSticky }) =>
    isSticky &&
    css`
      &.mobile {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    `};

  ${({ isVertical }) =>
    isVertical &&
    css`
      &.mobile {
        flex-direction: column;
        z-index: ${zIndex.membersBottomButton};
      }
    `};

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }

  &.pc {
    width: 650px;
    margin: 0 auto;
    padding: 0 20px 30px;

    ${({ isRevers }) =>
      isRevers &&
      css`
        flex-direction: row-reverse;
      `};

    ${({ paddingTop }) =>
      paddingTop &&
      css`
        padding-top: ${paddingTop}px;
      `};
  }
`;

const NoticeSection = styled.div`
  padding-bottom: 24px;
  font-weight: 400;
  line-height: 20px;
  color: ${vars.color.text.$tertiary};

  .main-title {
    padding: 16px 0;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: ${vars.color.text.$secondary};
  }
  .sub-title {
    margin-bottom: 8px;
    font-weight: 600;
    line-height: 20px;
    color: ${vars.color.text.$tertiary};
  }
  .items {
    margin-bottom: 16px;
  }
  .item {
    display: flex;
    gap: ${vars.spacing.$6};

    &::before {
      min-width: 4px;
      height: 4px;
      margin: 7px 0 0 1px;
      border-radius: 100%;
      background-color: ${vars.color.$gray300};
      content: '';
    }
  }

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(24px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(24px + env(safe-area-inset-bottom));
  }
`;

const DueDate = styled.div`
  padding-top: ${isPC ? 24 : 18}px;
  text-align: center;

  .info {
    border: none;
    border-radius: 50px;
    background-color: ${COLOR.bgLightGray};
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 16px;

    .text-lightgray {
      color: ${COLOR.kurlyGray450};
    }

    .text-gray {
      color: ${COLOR.kurlyGray800};
    }
  }
`;

const SurveyTitleSection = styled.section`
  padding: ${isPC ? '36px 30px 20px' : '24px 20px'};

  .main {
    font-size: 20px;
    color: ${COLOR.kurlyGray800};
    font-weight: ${isPC ? 500 : 600};
    padding-bottom: ${isPC ? 8 : 4}px;
    line-height: ${isPC ? 32 : 28}px;
  }

  .sub {
    font-size: 14px;
    font-weight: 400;
    color: ${COLOR.kurlyGray600};
    line-height: 20px;
  }
`;

const FinalAsk = styled.div`
  .title {
    color: ${COLOR.benefitGray};
    font-size: 18px;
    line-height: 23px;
    text-align: left;
    font-weight: 600;
  }
  .end-date {
    margin: 16px 8px;
    padding: 16px 0;
    text-align: center;
    border: none;
    border-radius: 6px;
    background-color: ${COLOR.bg};
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-weight: 600;
    color: ${COLOR.kurlyGray800};

    .label {
      color: ${COLOR.kurlyGray450};
      font-size: 14px;
      font-weight: 400;
    }
  }
  .message {
    font-size: 14px;
    margin-bottom: 12px;
    text-align: left;
    font-weight: 400;
    color: ${COLOR.kurlyGray800};
  }
  .benefit-text {
    margin-top: 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    text-align: left;
    color: ${COLOR.kurlyGray700};
  }
  .benefit-list {
    margin: 16px 8px 12px;
    padding: 16px;
    border-radius: 6px;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    text-align: left;
    background-color: ${COLOR.bgLightGray};
    color: ${COLOR.kurlyGray600};

    li {
      display: flex;

      &::before {
        content: '•';
        padding: 0 7px;
      }
    }
  }
  .emph {
    font-weight: 600;
    color: ${COLOR.loversLavender};
  }
  .button-group {
    > div {
      display: flex;
      gap: 8px;

      &.hidden {
        display: none;
      }
    }
  }

  &.mobile {
    > :not(.button-group, .benefit-list) {
      padding-left: 8px;
      padding-right: 8px;
    }
    .button-group {
      padding-top: 8px;
    }
  }

  &.pc {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      font-size: 20px;
      line-height: 25px;
      letter-spacing: -0.5px;

      > button {
        height: 24px;
      }
    }
    .end-date {
      margin: 24px 0 30px;
      font-weight: 500;
    }
    .message {
      font-size: 16px;
      margin: 12px 0;
    }
    .benefit-text {
      margin-top: 24px;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: -0.5px;
    }
    .benefit-list {
      margin: 24px 0 30px;
      line-height: 28px;
    }
    .button-group > div {
      margin-top: 16px;
    }
    .emph {
      font-weight: 500;
    }
  }
`;

const SurveyForm = styled.form`
  display: flex;
  flex-direction: column;

  height: ${isPC ? 'auto' : 'calc(100vh - 44px)'};
`;

const SurveySection = styled(Section)`
  .survey-radio {
    padding: 14px 0 13px 0;
  }

  margin-bottom: ${isPC ? '32px' : 'calc(73px + env(safe-area-inset-bottom))'};
  overflow-y: auto;
`;

const SurveyText = styled.textarea`
  padding: 13px 16px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid ${COLOR.lightGray};
  outline: none;
  resize: none;
  height: auto;
  max-height: 70px;
  min-height: 48px;
  overflow: hidden;
  overflow-y: auto;

  font-size: 16px;
  line-height: 22px;
  ::placeholder {
    color: ${isPC ? 'rgb(204, 204, 204)' : 'rgba(204, 204, 204, 1)'};
  }
`;

const SurveyBenefitText = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  background-color: #e8f7fa;
  line-height: 21px;
  color: ${COLOR.kurlyGray700};
  border-radius: 6px;

  .title {
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 16px;
    color: ${COLOR.kurlyBlack};
  }
  .text {
    font-weight: 400;
  }
  .list li {
    display: flex;

    &::before {
      content: '•';
      padding: 0 7px;
    }
  }
`;

const FreeTicketInfo = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  border: 1px solid ${COLOR.kurlymembers};
  border-radius: 12px;
  background-color: ${COLOR.membersBackground};

  font-weight: 600;
  line-height: 21px;

  .title {
    font-size: 16px;
    margin-bottom: 2px;
  }
  .text {
    font-weight: 400;
    color: ${COLOR.kurlyGray600};
  }
  .usage-amount {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${COLOR.membersBorder};
    color: ${COLOR.kurlymembers};
    font-size: 16px;
  }
  .amount {
    font-size: 18px;
  }
  .dimmed {
    font-weight: 400;
    text-decoration: line-through;
    opacity: 0.5;
  }
`;

const fadeout = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const TooltipButtonWrap = styled.div`
  position: relative;
  width: 100%;
`;

const TooltipLayerWrap = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: -21px;
  left: 0;
  right: 0;
  z-index: ${zIndex.membersBottomButton};

  .tooltip {
    position: static;
  }
  .tooltip::after {
    right: 50%;
    margin-right: -5px;
  }
`;

const TooltipLayer = styled.div<{
  autoCloseTime?: number;
}>`
  position: absolute;
  top: -35px;
  right: -16px;
  padding: 6px 8px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  background-color: ${COLOR.toolTip};
  color: ${COLOR.kurlyWhite};
  white-space: nowrap;

  ${({ autoCloseTime }) =>
    autoCloseTime &&
    css`
      animation: ${fadeout} 0.3s forwards;
      animation-delay: ${autoCloseTime / 1000}s;
    `};

  &::after {
    position: absolute;
    bottom: -6px;
    right: 37px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid ${COLOR.toolTip};
    content: '';
  }
`;

const CouponPackLabel = styled.label<{ selected: boolean }>`
  display: block;
  margin-top: 12px;
  padding: 18px 24px 24px;
  border: 1px solid ${({ selected }) => (selected ? COLOR.loversPurple : COLOR.kurlyGray200)};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;

  &:last-of-type {
    margin-bottom: 24px;
  }
  &.pc {
    font-weight: 500;
  }

  .top-info {
    display: flex;
    justify-content: space-between;
    padding-bottom: 14px;
    border-bottom: 1px solid ${COLOR.kurlyGray150};

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      font-size: 16px;
      line-height: 21px;
    }
    .badge {
      height: 19px;
      margin-left: 6px;
      padding: 0 6px;
      border-radius: 100px;
      font-size: 12px;
      line-height: 19px;
      background-color: ${COLOR.kurlyGray800};
      color: ${COLOR.kurlyWhite};
    }
    .text {
      font-weight: 400;
      color: ${COLOR.loversWhite};
    }
    svg {
      margin-right: -6px;
    }
  }

  .item {
    display: flex;
    align-items: center;
    margin-top: 14px;
    line-height: 19px;

    .badge {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 42px;
      height: 42px;
      margin-right: 14px;
      border-radius: 100%;
      font-size: 12px;
      background-color: ${COLOR.kurlyGray100};
      color: ${COLOR.kurlyGray450};
    }
    .core {
      color: ${COLOR.kurlymembers};
    }
    .plus {
      color: ${COLOR.joinOrderPeopleColor};
    }
    .text {
      font-weight: 400;
      font-size: 13px;
      color: ${COLOR.kurlyGray450};
    }
  }
`;

const CouponPackInput = styled.input`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
`;

const BottomWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: ${zIndex.membersBottomButton};
  width: 100%;
  border-top: 1px solid ${COLOR.bg};
  padding: 0 12px 8px;
  background-color: ${COLOR.kurlyWhite};
  text-align: center;

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }

  .text {
    padding: 12px 0;
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
  }
  .emph {
    color: ${COLOR.kurlyPurple};
  }

  &.pc {
    position: relative;
    padding: 0 20px 42px;

    .text {
      font-weight: 500;
    }
  }
`;

const RoundSection = styled.section`
  margin-bottom: 16px;
  padding: 20px 16px;
  border-radius: ${vars.spacing.$16};
  background-color: ${vars.color.$white};

  &.header {
    padding: 0;
  }
`;

const BenefitTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: ${vars.color.text.$primary};

  &.border {
    padding-bottom: 16px;
    border-bottom: 1px solid ${vars.color.line.$line1};
  }

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${vars.color.$gray600};
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;

export {
  HeaderSection,
  ContentWrapper,
  HeaderText,
  CancelHeaderText,
  Section,
  Title,
  CouponGrid,
  CouponCard,
  ButtonGroup,
  MessageGroup,
  MessageBox,
  CancelButtonGroup,
  NoticeSection,
  DueDate,
  SurveyTitleSection,
  FinalAsk,
  SurveyForm,
  SurveySection,
  SurveyText,
  SurveyBenefitText,
  FreeTicketInfo,
  TooltipButtonWrap,
  TooltipLayerWrap,
  TooltipLayer,
  CouponPackLabel,
  CouponPackInput,
  BottomWrapper,
  RoundSection,
  BenefitTitle,
};
