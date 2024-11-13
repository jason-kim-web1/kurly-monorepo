import { BranchError } from 'branch-sdk';

import { BranchEvent } from '.';

import { logger } from '../services';
import { isWebview } from '../../../util/window/getDevice';

import { BRANCH_API_KEY } from '../configs/config';
import { extractAuthentication } from '../utils/token';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '../constant/page-meta';
import appService from '../services/app.service';

export default class BranchService {
  instance?: any;

  accessToken?: string | null;

  async getInstance() {
    if (!this.instance) {
      this.instance = (await import('branch-sdk')).default;
      this.instance.init(BRANCH_API_KEY);
    }

    return this.instance;
  }

  setAccessToken(accessToken: string | null) {
    this.accessToken = accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  async logEvent<EventData, ContentItems>(event: BranchEvent<EventData, ContentItems>) {
    if (!process.browser || !BRANCH_API_KEY) {
      return;
    }

    if (isWebview()) {
      appService.analyticsSendBranchEvent(event);
      return;
    }

    const instance = await this.getInstance();

    if (this.accessToken) {
      const { uid, cartId } = extractAuthentication(this.accessToken);
      await new Promise<void>((resolve) => instance.setIdentity(uid ? uid : cartId ? cartId : 'guest', resolve));
    } else {
      await new Promise<void>((resolve) => instance.setIdentity('guest', resolve));
    }

    /**
     * Register commerce events, content events, user lifecycle events and custom events via `logEvent()`
     *
     * @param event
     * @param [event_data_and_custom_data]
     * @param [content_items]
     * @param [customer_event_alias]
     * @param [callback]
     */
    instance.logEvent(event.getName(), event.getEventData(), event.getContentItems(), undefined, (err: BranchError) => {
      if (err) {
        logger.error(err);
      }
    });
    logger.debug(event, `[BRANCH] Sent event: ${event.getName()}`);
  }

  async openAppDownloadBanner() {
    const instance = await this.getInstance();

    const linkData = {
      campaign: 'Organic',
      channel: 'Kurly_MobileWeb',
      feature: 'Organic',
      stage: 'Kurly_MobileWeb',
      tags: [location.href],
      alias: '',
      data: {
        custom_bool: true,
        custom_int: Date.now(),
        custom_string: '',
        $og_title: DEFAULT_TITLE,
        $og_description: DEFAULT_DESCRIPTION,
        $og_image_url: 'https://res.kurly.com/images/marketkurly/logo/logo_sns_marketkurly.jpg',
      },
    };

    instance.setBranchViewData(linkData);
    instance.closeJourney();
    instance.track('pageview');
  }
}
