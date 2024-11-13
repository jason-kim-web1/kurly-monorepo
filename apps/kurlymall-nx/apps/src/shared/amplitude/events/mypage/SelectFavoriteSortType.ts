import { AmplitudeEvent } from '../../AmplitudeEvent';
import { amplitudeService } from '../../index';
import {
  FavoriteFilterName,
  FavoriteFilterStatus,
  FavoriteFilterType,
} from '../../../../mypage/favorite/shared/interfaces/interface';

interface Payload {
  sortType: FavoriteFilterType;
}

class SelectFavoriteSortType extends AmplitudeEvent<Payload> {
  sortType: FavoriteFilterType;

  constructor(payload: Payload) {
    super('select_sort_type', payload);

    this.sortType = payload.sortType;
  }

  getPayload() {
    return {
      selection_sort_type:
        this.payload.sortType === FavoriteFilterStatus.FREQUENTLY
          ? FavoriteFilterName.FREQUENTLY
          : FavoriteFilterName.RECENTLY,
    };
  }
}

export const logEventFavoriteSortType = (sortType: FavoriteFilterType) => {
  amplitudeService.logEvent(new SelectFavoriteSortType({ sortType }));
};
