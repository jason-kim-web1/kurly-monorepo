export type EventBoardComment = { content: { userNo: number; text: string; commentId: string }[] };

export type EventBoardCommentRequestParams = {
  text: string;
};

export type BenefitIdentifiers = {
  benefitType: 'NUMBER';
  title: string;
  redirectLink: string;
  couponNumber: string;
}[];
