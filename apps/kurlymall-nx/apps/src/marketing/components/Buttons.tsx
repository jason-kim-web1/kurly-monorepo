import { memo, MouseEvent, ReactNode } from 'react';
import { get } from 'lodash';

import { StyledVocHotlineButtonWrapper, StyledButtonWrapper } from '../shared/styled';
import { isPC } from '../../../util/window/getDevice';
import { useAppSelector } from '../../shared/store';
import Button from '../../shared/components/Button/Button';
import { ContentBody, SectionButton } from '../shared/type';
import { DEVICE_MAP } from '../shared/constants';
import { handleLinkAction } from '../shared/utils';

type CssType = Record<string, string>;

function VocHotlineButton({ buttonCss, tel, href }: { buttonCss: CssType; tel: string; href?: string }) {
  if (!href) return null;

  const handleClickHotlineButton = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isPC) {
      e.preventDefault();
      return;
    }
  };

  return (
    <StyledVocHotlineButtonWrapper onClick={handleClickHotlineButton} href={href} css={buttonCss}>
      <strong>{tel}</strong>
      <span>월요일 - 토요일 07:00 ~ 18:00</span>
    </StyledVocHotlineButtonWrapper>
  );
}

function getButtonStyle(styles: string) {
  return styles.split(';').reduce((css: CssType, cur) => {
    const [key, value] = cur.split(':').map((s) => s.trim());
    css[key] = value;
    return css;
  }, {});
}

function ConditionalLinkButton({
  condition,
  text,
  webLink,
  appLink,
  type,
  buttonCss,
  buttonType,
  pageName,
}: SectionButton & { buttonCss: CssType; buttonType?: string; pageName?: string }) {
  const memberState = useAppSelector(({ member }) => member);

  if (!condition?.property || !condition?.value) return null;

  const conditionValue = get(memberState, condition.property);
  if ((conditionValue ?? 'undefined').toString() !== condition.value) return null;

  return (
    <Button
      text={text || ''}
      onClick={() => handleLinkAction({ buttonType, webLink, appLink, type, pageName, text })}
      css={buttonCss}
    />
  );
}

function CustomButton({
  buttonType,
  button: { id, styles, condition, text, webLink, appLink, type },
}: {
  buttonType?: string;
  button: SectionButton;
}) {
  const { vipInfo } = useAppSelector(({ member }) => ({
    vipInfo: member.info?.vipInfo,
  }));

  const buttonCss = !!styles ? getButtonStyle(styles) : {};

  if (type === 'tel') return <VocHotlineButton key={id} buttonCss={buttonCss} tel={text || ''} href={webLink} />;

  if (type === 'conditional-link') {
    return (
      <ConditionalLinkButton
        buttonCss={buttonCss}
        condition={condition}
        webLink={webLink}
        appLink={appLink}
        type={type}
        text={text}
        buttonType={buttonType}
        pageName={vipInfo?.name}
      />
    );
  }

  return (
    <Button
      text={text || ''}
      onClick={() => handleLinkAction({ buttonType, webLink, appLink, type, pageName: vipInfo?.name, text })}
      css={buttonCss}
    />
  );
}

function ShowDeviceCheck({ children, device }: { children: ReactNode; device?: Array<'pc' | 'moWeb' | 'webview'> }) {
  if (!device) return <>{children}</>;

  const isShow = device.map((d) => DEVICE_MAP[d]).includes(true);
  return isShow ? <>{children}</> : null;
}

function Buttons({ type, buttons }: { type?: string; buttons: ContentBody['buttons'] }) {
  if (!buttons || buttons.length === 0) return null;

  return (
    <StyledButtonWrapper className={isPC ? 'pc' : 'mobile'}>
      {buttons.map((button) => {
        return (
          <ShowDeviceCheck key={button.id} device={button.device}>
            <CustomButton button={button} buttonType={type} />
          </ShowDeviceCheck>
        );
      })}
    </StyledButtonWrapper>
  );
}

export default memo(Buttons);
