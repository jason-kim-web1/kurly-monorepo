import { PathKey, PathKeyType } from '../../constant/paths';

const META_INJECT_BY_PAGE_LIST = [
  PathKey.GOODS_DETAIL,
  PathKey.MOBILE_GOODS_DETAIL,
  PathKey.GAMES_MY_KURLY_FARM,
  PathKey.MOBILE_GAMES_MY_KURLY_FARM,
  PathKey.SEARCH,
  PathKey.MOBILE_SEARCH,
  PathKey.COLLECTIONS,
  PathKey.MOBILE_COLLECTIONS,
  PathKey.COLLECTION_GROUPS,
  PathKey.MOBILE_COLLECTION_GROUPS,
  PathKey.CATEGORIES,
  PathKey.MOBILE_CATEGORIES,
  PathKey.SHOWCASE,
  PathKey.MOBILE_SHOWCASE,
];

const checkMetaInjectByPage = (path: PathKeyType) => META_INJECT_BY_PAGE_LIST.includes(path);

export { checkMetaInjectByPage };
