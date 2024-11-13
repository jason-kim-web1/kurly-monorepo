import {
  BROWSE_EVENT_INFO,
  BROWSE_EVENT_NAMES,
  BROWSE_SCREEN_NAMES,
  BROWSE_SUB_EVENT_INFO,
  BROWSE_SUB_EVENT_NAMES,
  RESET_BROWSE_EVENT_INFO,
  ScreenName,
  TabName,
} from '.';
import AmplitudeBucket from './AmplitudeBucket';
import { loadAmplitudeBucket } from './amplitude-bucket-storage.service';

import { isWebview } from '../../../util/window/getDevice';
import appService from '../services/app.service';

jest.mock('../../../util/window/getDevice');
jest.mock('../services/app.service');
jest.mock('./amplitude-bucket-storage.service');

describe('AmplitudeBucket', () => {
  let bucket: AmplitudeBucket;

  beforeEach(() => {
    bucket = new AmplitudeBucket(jest.fn());
  });

  beforeEach(() => {
    (isWebview as jest.Mock).mockReturnValue(false);
    (loadAmplitudeBucket as jest.Mock).mockReturnValue(undefined);
  });

  context('with stored data', () => {
    beforeEach(() => {
      (loadAmplitudeBucket as jest.Mock).mockReturnValue({
        screen_name: ScreenName.ABOUT_KURLY,
      });
    });

    it('creates bucket with stored data', () => {
      const b = new AmplitudeBucket(jest.fn());

      expect(b.getScreenName()).toBe(ScreenName.ABOUT_KURLY);
    });
  });

  describe('setScreeName', () => {
    context('when current screen name is not exists', () => {
      it('updates screenName', () => {
        bucket.updateScreenName(ScreenName.FIND_ID);

        expect(bucket.getScreenName()).toBe(ScreenName.FIND_ID);
      });
    });

    context('when meet a new screen name', () => {
      beforeEach(() => {
        bucket.updateScreenName(ScreenName.FIND_ID);
      });

      it('updates previousScreenName', () => {
        bucket.updateScreenName(ScreenName.FIND_PASSWORD);

        expect(bucket.getPreviousScreenName()).toBe(ScreenName.FIND_ID);
      });
    });

    context('when screen name is not login or sign_up', () => {
      it('updates signUpSourceScreenName', () => {
        bucket.updateScreenName(ScreenName.FIND_ID);

        expect(bucket.getSignUpSourceScreenName()).toBe(ScreenName.FIND_ID);
      });
    });

    context('when screen name is sign_up or login', () => {
      it("does'nt updates signUpSourceScreenName", () => {
        bucket.updateScreenName(ScreenName.SIGN_UP);
        bucket.updateScreenName(ScreenName.LOGIN);

        expect(bucket.getSignUpSourceScreenName()).toBeUndefined();
      });
    });

    context('with meet a same screen name', () => {
      const screenName = ScreenName.FIND_ID;

      beforeEach(() => {
        bucket.updateScreenName(screenName);
      });

      it("does'nt updates previousScreenName", () => {
        bucket.updateScreenName(screenName);
        bucket.updateScreenName(screenName);

        expect(bucket.getPreviousScreenName()).toBeUndefined();
      });
    });

    context('when screen name is in the browse screen names', () => {
      const screenName = Array.from(BROWSE_SCREEN_NAMES)[0];

      it('updates browseScreenName', () => {
        bucket.updateScreenName(screenName);

        expect(bucket.getBrowseScreenName()).toBe(screenName);
      });
    });

    context('when screen name is not in the browse screen names', () => {
      const screenName = ScreenName.PRODUCT_LIST;

      it('updates browseScreenName', () => {
        expect(BROWSE_SCREEN_NAMES.has(screenName)).toBe(false);

        bucket.updateScreenName(screenName);

        expect(bucket.getBrowseScreenName()).toBeUndefined();
      });
    });

    context('when in webview', () => {
      beforeEach(() => {
        (isWebview as jest.Mock).mockReturnValue(true);
      });

      it('calls setScreeName', () => {
        bucket.updateScreenName(ScreenName.FIND_ID);

        expect(appService.analyticsSetScreenName).toBeCalledWith(ScreenName.FIND_ID);
      });
    });
  });

  describe('updateBrowseTabName', () => {
    const screenName = Array.from(BROWSE_SCREEN_NAMES)[0];

    context('when tab name is same', () => {
      beforeEach(() => {
        bucket.updateBrowseTabName(TabName.CATEGORY);
        bucket.updateScreenName(screenName);
      });

      it('nothings happen', () => {
        bucket.updateBrowseTabName(TabName.CATEGORY);

        expect(bucket.getBrowseTabName()).toBe(TabName.CATEGORY);
        expect(bucket.getBrowseScreenName()).toBe(screenName);
      });
    });

    context('when tab name is changed', () => {
      beforeEach(() => {
        bucket.updateBrowseTabName(TabName.CATEGORY);
        bucket.updateScreenName(screenName);
      });

      it('updates tab name and clear browseScreenName', () => {
        bucket.updateBrowseTabName(TabName.HOME);

        expect(bucket.getBrowseTabName()).toBe(TabName.HOME);
      });
    });
  });

  describe('updateBrowseEventInfo', () => {
    const url = 'http://localhost/event';

    context('with browse event info', () => {
      it('updates browseEventInfo', () => {
        bucket.updateBrowseEventInfo(Array.from(BROWSE_EVENT_INFO)[1], { url });

        expect(bucket.getBrowseEventInfo()).toBe(url);
      });
    });

    context('with reset browse event info', () => {
      it('reset browseEventInfo', () => {
        bucket.updateBrowseEventInfo(Array.from(RESET_BROWSE_EVENT_INFO)[1], { url });

        expect(bucket.getBrowseEventInfo()).toBe(null);
      });
    });
  });

  describe('updateBrowseEventName', () => {
    context('with browse event name', () => {
      const eventName = Array.from(BROWSE_EVENT_NAMES)[0];

      it('updates browseEventName', () => {
        bucket.updateBrowseEventName(eventName);

        expect(bucket.getBrowseEventName()).toBe(eventName);
      });
    });

    context('when event name is not browse event name', () => {
      it("doesn't updates browseEventName", () => {
        bucket.updateBrowseEventName('some_event_name');

        expect(bucket.getBrowseEventName()).toBeUndefined();
      });
    });
  });

  describe('updateBrowseSubEventInfo', () => {
    const url = 'http://localhost/event';

    context('with browse sub event info', () => {
      it('updates browseSubEventInfo', () => {
        bucket.updateBrowseSubEventInfo(Array.from(BROWSE_SUB_EVENT_INFO)[1], { url });

        expect(bucket.getBrowseSubEventInfo()).toBe(url);
      });
    });

    context('when sub event info is not browse sub event info', () => {
      it("doesn't updates browseSubEventInfo", () => {
        bucket.updateBrowseSubEventInfo('some_event_name', { url });

        expect(bucket.getBrowseSubEventInfo()).toBeUndefined();
      });
    });
  });

  describe('updateBrowseSubEventName', () => {
    context('with browse sub event name', () => {
      const eventName = Array.from(BROWSE_SUB_EVENT_NAMES)[1];

      it('updates browseEventName', () => {
        bucket.updateBrowseSubEventName(eventName);

        expect(bucket.getBrowseSubEventName()).toBe(eventName);
      });
    });

    context('when event name is not browse event name', () => {
      it("doesn't updates browseEventName", () => {
        bucket.updateBrowseSubEventName('some_event_name');

        expect(bucket.getBrowseSubEventName()).toBeUndefined();
      });
    });
  });

  describe('updateEventName', () => {
    it('updates event name', () => {
      bucket.updateEventName('event_name');

      expect(bucket.getEventName()).toBe('event_name');
    });
  });

  describe('getRawData', () => {
    it('returns raw data of bucket', () => {
      bucket.updateScreenName(ScreenName.ABOUT_KURLY);

      const data = bucket.getRawData();

      expect(data.screen_name).toBe(ScreenName.ABOUT_KURLY);
    });
  });

  describe('getData', () => {
    it('returns data', () => {
      bucket.updateScreenName(ScreenName.ABOUT_KURLY);

      const data = bucket.getData();

      expect(data.screen_name).toBe(ScreenName.ABOUT_KURLY);
      expect(data.sign_up_source_screen_name).toBeUndefined();
    });

    context.each([
      [ScreenName.SIGN_UP, 'sign_up_success'],
      [ScreenName.LOGIN, 'view_sign_up'],
      [ScreenName.LOGIN, 'select_join_button'],
      [ScreenName.LOGIN, 'view_sns_sync'],
      [ScreenName.LOGIN, 'sns_sync_success'],
    ])('when screenName is sign_up', (screenName, eventName) => {
      it('returns sign_up_soruce_screen_name', () => {
        bucket.updateScreenName(ScreenName.ABOUT_KURLY);
        bucket.updateScreenName(screenName);
        bucket.updateEventName(eventName);

        const data = bucket.getData();

        expect(data.sign_up_source_screen_name).toBe(ScreenName.ABOUT_KURLY);
      });
    });
  });
});
