import { ButtonTemplate } from '../types/buttonTemplate';
import { isPC } from '../../../../../util/window/getDevice';

import { TemplateType } from '../../../../shared/interfaces/MyKurlyStyle';

export function makeButtonType({
  templateTypes,
  hasProfile,
}: {
  templateTypes: TemplateType;
  hasProfile: boolean;
}): ButtonTemplate {
  if (hasProfile) {
    if (isPC) {
      return templateTypes.hasNotProfile;
    } else {
      return templateTypes.hasProfile;
    }
  } else {
    return templateTypes.hasNotProfile;
  }
}

export function buttonSize(textSize: number): string {
  if (textSize > 10) {
    return isPC ? '50%' : '100%';
  } else {
    return isPC ? '25%' : '50%';
  }
}

export function isSimpleType(buttonType: ButtonTemplate): boolean {
  return buttonType === 'BUTTON' || buttonType === 'BUTTON_TAG';
}
