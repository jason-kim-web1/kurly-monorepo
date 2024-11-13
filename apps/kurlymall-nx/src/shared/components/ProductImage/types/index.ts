import { ReactNode } from 'react';

export type ChildrenOnly = { children?: ReactNode };

export type ProductImageMetaData = {
  width: number;
  height: number;
  topLeftTextSticker: {
    position: {
      top: number;
      left: number;
    };
    padding: {
      x: number;
      y: number;
    };
    fontStyle: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
    };
  };
  bottomCenterTextSticker: {
    padding: {
      x: number;
      y: number;
    };
    fontStyle: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
    };
  };
  bottomRightImageSticker: {
    width: number;
    height: number;
  };
  bottomLeftImageSticker: {
    width: number;
    height: number;
  };
};
