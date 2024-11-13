import { isWebview } from '../../../util/window/getDevice';
import { pixelEventTitleType } from './constants/pixelEventTitle';
import { PIXEL_API_KEY } from '../configs/config';
import { checkBrowserEnvironment } from '../utils/checkBrowserEnvironment';

type ReactPixel = typeof import('react-facebook-pixel');
type EventType = number | string | { [key: string]: number | string };

const isReadyForEvent = () => checkBrowserEnvironment() && !isWebview();

class PixelService {
  private instance?: ReactPixel;

  async getInstance() {
    if (!this.instance) {
      this.instance = (await import('react-facebook-pixel')).default;
      this.instance.init(PIXEL_API_KEY);
    }

    return this.instance;
  }

  async setPageView() {
    if (!isReadyForEvent()) {
      return;
    }

    const instance = await this.getInstance();
    instance.pageView();
  }

  async logEvent(
    eventTitle: pixelEventTitleType,
    eventData?: { [key: string]: number | string | EventType[] | null | undefined },
  ) {
    if (!isReadyForEvent()) {
      return;
    }

    const instance = await this.getInstance();
    instance.track(eventTitle, eventData);
  }
}

const Pixel = new PixelService();
export default Pixel;
