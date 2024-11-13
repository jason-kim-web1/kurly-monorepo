import { head } from 'lodash';
interface Props {
  type: string;
  collectionCode: string;
  collections: {
    code: string;
  }[];
  sectionType: any;
  target: any;
}

export function getCollectionId({ type, sectionType, collections, collectionCode, target }: Props) {
  if (type !== 'GROUP_COLLECTION_CIRCLE') {
    return collectionCode;
  }
  if (sectionType === 'collection') {
    return target;
  }

  return head(collections)?.code;
}
