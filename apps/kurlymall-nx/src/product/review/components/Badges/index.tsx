import { eq, isEmpty } from 'lodash';
import { css } from '@emotion/css';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';

import { clsx } from '../../../../shared/utils/clsx';
import COLOR from '../../../../shared/constant/colorset';

const badgeClassName = css`
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOR.kurlyWhite};
`;

const rootClassName = css`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 6px;
`;

const bestTypeBadgeClassName = css`
  background-color: ${COLOR.loversWhite};
`;

const experienceGroupTypeBadgeClassName = css`
  background-color: ${COLOR.frozen};
`;

const membershipBadgeClassName = css`
  background-color: #4dbed7;
`;

const vipGradeClassName = css`
  background-color: #581d89;
  font-weight: 500;
`;

const vvipGradeClassName = css`
  background-color: #451b6c;
  font-weight: 500;
`;

const VALID_REVIEW_TYPE_SET = new Set(['일반', '베스트', '체험단']);
const REVIEW_TYPE_CLASSNAME_MAP = new Map([
  ['베스트', bestTypeBadgeClassName],
  ['체험단', experienceGroupTypeBadgeClassName],
]);

const VALID_GRADE_SET = new Set(['VIP', 'VVIP']);
const GRADE_CLASSNAME_MAP = new Map([
  ['VIP', vipGradeClassName],
  ['VVIP', vvipGradeClassName],
]);

const checkValidReviewType = (type: string) => VALID_REVIEW_TYPE_SET.has(type);
const checkReviewTypeNormal = (type: string) => eq(type, '일반');
const checkValidUserGrade = (grade: string | null): grade is string => {
  if (!grade) {
    return false;
  }
  return VALID_GRADE_SET.has(grade.toUpperCase());
};

const getGradeBadgeClassName = (grade: string | null): string => GRADE_CLASSNAME_MAP.get(grade || '') || '';

const getReviewTypeBadgeClass = (type: string): string => REVIEW_TYPE_CLASSNAME_MAP.get(type) || '';

type BadgeProps = {
  label: string;
  className?: string;
};

const Badge = ({ label, className = '' }: BadgeProps) => {
  return <div className={clsx(badgeClassName, className)}>{label}</div>;
};

type ReviewTypeBadgeProps = {
  type: string;
};

const ReviewTypeBadge = ({ type }: ReviewTypeBadgeProps) => {
  const shouldRenderTypeBadge = checkValidReviewType(type) && !checkReviewTypeNormal(type);
  if (!shouldRenderTypeBadge) {
    return null;
  }
  const className = getReviewTypeBadgeClass(type);
  return <Badge className={className} label={type} />;
};

type Props = {
  type: string;
  grade: string | null;
  isMembership: boolean;
};

const Badges = ({ type, grade, isMembership }: Props) => {
  const badges = useMemo(() => {
    const data = [];
    const shouldRenderTypeBadge = checkValidReviewType(type) && !checkReviewTypeNormal(type);
    const shouldRenderGradeBadge = checkValidUserGrade(grade);
    const gradeBadgeClassName = getGradeBadgeClassName(grade);
    const typeBadgeClassName = getReviewTypeBadgeClass(type);
    if (shouldRenderTypeBadge) {
      data.push({
        id: nanoid(),
        className: typeBadgeClassName,
        label: type,
      });
    }
    if (shouldRenderGradeBadge) {
      data.push({
        id: nanoid(),
        className: gradeBadgeClassName,
        label: grade as string,
      });
    }
    if (!shouldRenderGradeBadge && isMembership) {
      data.push({
        id: nanoid(),
        className: membershipBadgeClassName,
        label: '멤버스',
      });
    }
    return data;
  }, [type, grade, isMembership]);
  const isEmptyBadges = isEmpty(badges);

  if (isEmptyBadges) {
    return null;
  }

  return (
    <div className={rootClassName}>
      {badges.map(({ id, className, label }) => (
        <Badge key={id} className={className} label={label} />
      ))}
    </div>
  );
};

export { Badge, ReviewTypeBadge, Badges };
