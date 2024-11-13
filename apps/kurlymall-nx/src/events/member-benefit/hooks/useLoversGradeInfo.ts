import { GradeName } from '../../../shared/enums';

export default function useLoversGradeInfo() {
  const isPartnershipBenefit = (gradeName: GradeName) => {
    return gradeName === GradeName.ThePurple || gradeName === GradeName.Purple || gradeName === GradeName.Lavender;
  };

  const gradeBenefitPrice = (gradeName: GradeName) => {
    if (gradeName === GradeName.White || gradeName === GradeName.Friends) {
      return '천원';
    }
    return '만원';
  };

  return {
    isPartnershipBenefit,
    gradeBenefitPrice,
  };
}
