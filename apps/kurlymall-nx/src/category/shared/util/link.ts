import { getPageUrl, PRODUCT_PATH } from '../../../shared/constant';
import { CategoryKindType, PrimaryCategory } from '../../../shared/reducers/category';

import { MainSite } from '../../../main/interfaces/MainSection.interface';
import { isDefined } from '../../../shared/utils/typeGuard';

interface Props extends Pick<PrimaryCategory, 'kind' | 'code'> {
  mainSite?: MainSite;
  parent?: {
    kind: CategoryKindType;
    code: string;
  };
}

const createQueryParamString = (...entries: ([string, string] | undefined)[]) => {
  const filtered = entries.filter(isDefined);
  if (filtered.length === 0) return '';

  return filtered.reduce((qc, [key, value], idx, { length }) => {
    return `${qc}${key}=${value}${idx === length - 1 ? '' : '&'}`;
  }, '?');
};

const getCategorySiteLink = ({ kind, code, mainSite, parent }: Props) => {
  const beautyQueryEntry: [string, string] | undefined =
    mainSite === 'BEAUTY' ? ['site', mainSite.toLocaleLowerCase()] : undefined;

  if (kind === 'product_collection') {
    if (parent && parent?.kind === 'product_collection_group') {
      return `${getPageUrl(PRODUCT_PATH.collectionGroups)}/${parent.code}${createQueryParamString(
        ['collection', code],
        beautyQueryEntry,
      )}`;
    }

    return `${getPageUrl(PRODUCT_PATH.collections)}/${code}${createQueryParamString(beautyQueryEntry)}`;
  }

  if (kind === 'product_collection_group') {
    return `${getPageUrl(PRODUCT_PATH.collectionGroups)}/${code}${createQueryParamString(beautyQueryEntry)}`;
  }

  if (kind === 'product_category') {
    return `${getPageUrl(PRODUCT_PATH.categories)}/${code}${createQueryParamString(beautyQueryEntry)}`;
  }

  return '';
};

const getParsedLink = (rawLink: string): { isExternal: boolean; link: string } => {
  try {
    const url = new URL(rawLink);
    const isExternal = !/kurly.com$/.test(url.hostname);

    return {
      isExternal,
      link: url.href,
    };
  } catch (e) {
    return {
      isExternal: false,
      link: rawLink,
    };
  }
};

export { getCategorySiteLink, getParsedLink };
