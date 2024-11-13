import { useState, ReactElement, Ref, forwardRef, useCallback, useRef, useEffect } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';
import { chain, eq } from 'lodash';

import COLOR from '../../../../../shared/constant/colorset';
import { useAppLinkFallback } from '../../../../../shared/hooks/useAppLinkFallback';
import { isAos } from '../../../../../../util/window/getDevice';
import { tryUriScheme } from '../../../../../shared/utils/deep-link';
import Confirm from '../../../../../shared/components/Alert/Confirm';
import { isDefined } from '../../../../../shared/utils/lodash-extends';
import deepLinkUrl, { KURLY_APP_STORE_URL_DICTIONARY } from '../../../../../shared/constant/deepLink';
import { APP_ONLY_TITLE, JOIN_ORDER_DESCRIPTIONS } from '../../../../product.constant';
import ArrowRight16x17 from '../../../../../shared/components/icons/svg/ArrowRight16x17';
import { amplitudeService } from '../../../../../shared/amplitude';
import { SelectPurchaseTogetherLink } from '../../../../../shared/amplitude/events/product/SelectPurchaseTogetherLink';
import { LINK_TYPE, SELECTION_TYPE } from '../../../../../shared/amplitude/TogetherJoinConstants';
import { SelectPurchaseTogetherLinkPopUp } from '../../../../../shared/amplitude/events/product/SelectPurchaseTogetherLinkPopUp';
import { ignoreError } from '../../../../../shared/utils/general';
import { LoadingSpinner } from '../../../../../shared/components/LoadingSpinner';

const BootstrapDialog = muiStyled(Dialog)(() => ({
  '& .MuiDialog-container': {
    alignItems: 'flex-end',
  },
  '& .MuiPaper-root': {
    borderRadius: '12px',
    minWidth: '93.6%',
    padding: '0',
    marginBottom: '12px',
  },
  '& .MuiDialogContent-root': {
    padding: '24px 24px 20px 24px',
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  color: ${COLOR.kurlyGray800};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  color: ${COLOR.kurlyGray600};
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 6px;
  color: ${COLOR.kurlyWhite};
  background-color: ${COLOR.kurlyPurple};
  font-size: 16px;
  font-weight: 600;
  line-height: 21px;
  margin-bottom: 12px;
`;

const TextButton = styled.button`
  display: flex;
  align-items: center;
  margin: 0 auto;
  color: ${COLOR.kurlyGray600};
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
`;

type CreateDeepLinkParam = {
  name: string;
  value: string | number | undefined;
};

const createProductDetailDeepLinkUrl = (params: CreateDeepLinkParam[]): string => {
  const queryParamStr = chain(params)
    .filter(({ value }) => isDefined(value))
    .map(({ name, value }) => `${name}=${value}`)
    .join('&')
    .value();
  return `${deepLinkUrl.PRODUCT_DETAIL}?${queryParamStr}`;
};

const LINK_FORWARD_STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
};

interface Props {
  productNo: number;
  joinOrderCode?: string;
}

export const JoinOrderDialog = ({ productNo, joinOrderCode }: Props) => {
  const previousNotified = useRef(false);
  const [linkForwardStatus, setLinkForwardStatus] = useState(LINK_FORWARD_STATUS.IDLE);
  const [open, setOpen] = useState(false);
  const isJoinOrderCodeProvided = isDefined(joinOrderCode);
  const productDetailDeepLinkUrl = createProductDetailDeepLinkUrl([
    {
      name: 'no',
      value: productNo,
    },
    {
      name: 'joinCode',
      value: joinOrderCode,
    },
  ]);
  const { uriScheme } = useAppLinkFallback(
    productDetailDeepLinkUrl,
    { tryOnLoad: isJoinOrderCodeProvided }, // joinCode 값이 있는 경우(함께구매)에만 최초 진입시 자동 앱 이동 시도
  );
  const linkType = isJoinOrderCodeProvided ? LINK_TYPE.JOIN : LINK_TYPE.NORMAL;
  const isLinkForwardStatusPending = eq(linkForwardStatus, LINK_FORWARD_STATUS.PENDING);
  const moveToStore = useCallback(() => {
    const targetAppStoreUrl = isAos ? KURLY_APP_STORE_URL_DICTIONARY.ANDROID : KURLY_APP_STORE_URL_DICTIONARY.IOS;
    location.assign(targetAppStoreUrl);
  }, []);
  const description = isJoinOrderCodeProvided
    ? JOIN_ORDER_DESCRIPTIONS.MOBILE.JOIN_LINK
    : JOIN_ORDER_DESCRIPTIONS.MOBILE.APP_ONLY;

  const resetLinkForwardStatus = () => setLinkForwardStatus(LINK_FORWARD_STATUS.IDLE);

  const handleClickOpenApp = useCallback(async () => {
    if (isLinkForwardStatusPending) {
      return;
    }
    setLinkForwardStatus(LINK_FORWARD_STATUS.PENDING);
    amplitudeService.logEvent(
      new SelectPurchaseTogetherLinkPopUp({
        linkType,
        purchaseTogetherCode: joinOrderCode,
        selectionType: SELECTION_TYPE.APP,
      }),
    );
    if (!uriScheme) {
      resetLinkForwardStatus();
      return;
    }
    const isMoved = await tryUriScheme(uriScheme);
    if (!isMoved) {
      const { isConfirmed } = await Confirm({
        text: '앱이 설치되어있지 않습니다.\n확인을 누르시면 스토어로 이동합니다',
        showRightButton: true,
        leftButtonText: '취소',
        rightButtonText: '확인',
      });
      if (isConfirmed) {
        moveToStore();
      }
    }
    resetLinkForwardStatus();
  }, [moveToStore, uriScheme]);

  const handleClose: DialogProps['onClose'] = (e, reason) => {
    if (eq(reason, 'backdropClick')) {
      return;
    }
    setOpen(false);
  };

  const handleUseMobileApp = () => {
    ignoreError(() => {
      amplitudeService.logEvent(
        new SelectPurchaseTogetherLinkPopUp({
          linkType,
          purchaseTogetherCode: joinOrderCode,
          selectionType: SELECTION_TYPE.MW,
        }),
      );
    });
    setOpen(false);
  };

  useEffect(() => {
    if (previousNotified.current) {
      return;
    }
    setOpen(true);
    previousNotified.current = true;
    return () => {
      previousNotified.current = false;
    };
  }, [productNo]);

  useEffect(() => {
    if (!open) {
      return;
    }
    ignoreError(() => {
      amplitudeService.logEvent(
        new SelectPurchaseTogetherLink({
          linkType,
          purchaseTogetherCode: joinOrderCode,
        }),
      );
    });
  }, [open, linkType, joinOrderCode]);

  return (
    <BootstrapDialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogContent>
        <Title>{APP_ONLY_TITLE}</Title>
        <Description>{description}</Description>
        <Button type="button" onClick={handleClickOpenApp} disabled={isLinkForwardStatusPending}>
          {isLinkForwardStatusPending ? <LoadingSpinner width={25} height={25} strokeWidth={5} /> : '앱으로 보기'}
        </Button>
        <TextButton type="button" onClick={handleUseMobileApp}>
          <p>모바일 웹으로 볼게요</p>
          <ArrowRight16x17 />
        </TextButton>
      </DialogContent>
    </BootstrapDialog>
  );
};
