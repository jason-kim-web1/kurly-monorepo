import { LegoInfoType } from '../../../lego/types';

export type BottomButtonType = {
  id: string;
  text: string;
};

export type LegoInfo = LegoInfoType & {
  bottomButtons?: BottomButtonType[];
  tooltipText?: string;
};

export type LegoResponse = {
  data: LegoInfo[];
};
