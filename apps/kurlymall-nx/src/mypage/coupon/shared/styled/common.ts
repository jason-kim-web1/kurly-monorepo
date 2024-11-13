import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../shared/utils';

export const CouponDetailSection = styled.section`
  background-color: ${vars.color.$white};

  &.mobile {
    padding: ${vars.spacing.$16} ${vars.spacing.$16} ${vars.spacing.$20};

    &.head {
      padding-top: ${vars.spacing.$24};
      padding-bottom: ${vars.spacing.$16};
      margin-bottom: ${vars.spacing.$8};
    }
    &.notice {
      padding-bottom: ${vars.spacing.$24};
      background-color: ${vars.color.background.$background2};
    }
  }

  &.pc {
    margin-bottom: ${vars.spacing.$16};
    padding: ${vars.spacing.$20};
    border-radius: ${vars.spacing.$16};

    &.head {
      border-radius: 0 0 ${vars.spacing.$16} ${vars.spacing.$16};
    }
  }
`;

export const ContentWrapper = styled.div`
  margin-bottom: ${vars.spacing.$20};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const TitleText = styled(Typography)`
  color: ${vars.color.text.$primary};
  word-break: break-all;

  &.list-name {
    margin-bottom: 4px;
  }
  &.notice-title {
    padding-bottom: ${vars.spacing.$16};
  }
  &.notice-sub {
    color: ${vars.color.text.$tertiary};
  }
  &.coupon-name {
    margin: 2px 0 -4px;
  }
`;

export const BenefitType = styled(Typography)`
  display: flex;
  align-items: center;
  color: ${vars.color.text.$primary};
  word-break: break-all;
`;

export const CouponBadge = styled(Typography)<{ used?: boolean }>`
  display: flex;
  align-items: center;
  height: ${vars.spacing.$20};
  margin-right: ${vars.spacing.$4};
  padding: ${vars.spacing.$0}${vars.spacing.$6};
  border-radius: ${vars.radius.$4};
  color: ${({ used }) => (used ? COLOR.kurlyGray400 : vars.color.main.$secondary)};
  background-color: ${vars.color.main.$secondaryContainer};

  &:first-of-type {
    margin-left: ${vars.spacing.$6};
  }
`;

export const ConditionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vars.spacing.$6};
`;

export const ConditionText = styled(Typography)`
  display: flex;
  gap: ${vars.spacing.$8};
  color: ${vars.color.text.$secondary};
  word-break: break-all;

  &:first-of-type {
    margin-top: 8px;
  }
  &.date {
    color: ${vars.color.main.$primary};
  }
  &.notice {
    color: ${vars.color.text.$tertiary};
  }

  &::before {
    min-width: ${vars.spacing.$4};
    height: ${vars.spacing.$4};
    margin-top: 7px;
    background-color: ${vars.color.background.$background5};
    border-radius: ${vars.spacing.$4};
    content: '';
  }
`;

export const hurdleInfoStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${vars.spacing.$12};
  padding: ${vars.spacing.$16};
  gap: ${vars.spacing.$16};
  border: 1px solid ${vars.color.$gray200};
  border-radius: ${vars.spacing.$16};
  word-break: break-all;

  i {
    margin: -8px -8px -8px 0;
  }
  .name {
    margin-bottom: ${vars.spacing.$2};
    color: ${vars.color.text.$primary};
  }
  .text {
    color: ${vars.color.text.$tertiary};
  }
`;

export const HurdleText = styled.div(hurdleInfoStyle);

export const HurdleLink = styled.a(hurdleInfoStyle);

export const TargetWrapper = styled.div`
  margin-bottom: ${vars.spacing.$20};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const TargetList = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${vars.spacing.$12} 0 ${vars.spacing.$20};
  border: 1px solid ${vars.color.$gray200};
  border-radius: ${vars.spacing.$16};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const TargetItem = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: ${vars.spacing.$16};
    right: ${vars.spacing.$16};
    bottom: 0;
    height: ${vars.spacing.$1};
    background-color: ${vars.color.line.$line1};
  }

  &:last-of-type::after {
    display: none;
  }
`;

export const targetInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 52px;
  padding: ${vars.spacing.$16};

  i {
    margin: -8px -8px -8px 0;
  }

  p {
    ${multiMaxLineText(2)};
  }

  .category {
    color: ${vars.color.text.$primary};
  }
  .product {
    color: ${vars.color.text.$secondary};
  }
`;

export const TargetText = styled.div(targetInfoStyle);

export const TargetLink = styled.a(targetInfoStyle);

export const MoreButton = styled.button`
  margin: 0 ${vars.spacing.$16} ${vars.spacing.$16};
  padding: ${vars.spacing.$10} ${vars.spacing.$16};
  border: 1px solid ${vars.color.$gray200};
  border-radius: ${vars.spacing.$8};
  text-align: center;

  .more-text {
    color: ${vars.color.$gray900};
  }
`;
