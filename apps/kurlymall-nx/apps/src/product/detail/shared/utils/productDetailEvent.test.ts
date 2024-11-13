import { getFusionQueryId } from './productDetailEvent';
import { amplitudeService, TabName } from '../../../../shared/amplitude';

describe('getFusionQueryId', () => {
  describe('amplitude browseTabName이 "search"가 아닌 경우', () => {
    amplitudeService.setTabName(TabName.CATEGORY);

    context('queryId가 없는 경우', () => {
      given('queryId', () => undefined);
      it('null을 반환한다.', () => {
        const result = getFusionQueryId(given.queryId);

        expect(result).toBe(null);
      });
    });
  });

  describe('amplitude browseTabName이 "search"인 경우', () => {
    amplitudeService.setTabName(TabName.SEARCH);

    context('queryId가 있는 경우', () => {
      given('queryId', () => 'aVK1ntEtyq');
      it('queryId를 반환한다.', () => {
        const result = getFusionQueryId(given.queryId);

        expect(result).toBe(given.queryId);
      });
    });

    context('queryId가 없는 경우', () => {
      given('queryId', () => undefined);
      it('null을 반환한다.', () => {
        const result = getFusionQueryId(given.queryId);

        expect(result).toBe(null);
      });
    });
  });
});
