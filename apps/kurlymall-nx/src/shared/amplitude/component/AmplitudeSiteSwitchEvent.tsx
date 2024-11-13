import { cloneElement, HTMLProps, MouseEvent, ReactElement } from 'react';

import { amplitudeService } from '../index';
import { AmplitudeEvent } from '../AmplitudeEvent';
import { convertMainSiteToSiteName } from '../../../main/util/mainSiteUtil';
import { MainSite } from '../../../main/interfaces/MainSection.interface';

type Element = HTMLInputElement | HTMLButtonElement;

const SELECTION = {
  /** 상단 헤더 */
  TOP: 'top',
  /** 둥둥이 */
  FLOATING: 'floating',
} as const;

type SelectionType = typeof SELECTION[keyof typeof SELECTION];

interface Props {
  children: JSX.Element;
  site: MainSite;
  type?: SelectionType;
}

export default function AmplitudeSiteSwitchEvent({ children, site, type }: Props) {
  const log = () => {
    amplitudeService.logEvent(
      new AmplitudeEvent('select_site', {
        site_info: convertMainSiteToSiteName(site),
        ...(type && { selection_type: type }),
      }),
    );
  };

  const props: HTMLProps<Element> = {
    onClick: async (e: MouseEvent<HTMLButtonElement>) => {
      await log();

      const { onClick } = children.props;

      if (onClick) {
        onClick(e);
      }
    },
  };

  return cloneElement<ReactElement<Element>>(children, props);
}
