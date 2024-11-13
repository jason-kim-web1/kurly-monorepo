import { head, isArray, isUndefined } from 'lodash';

export const getJoinCodeQueryParam = (joinCode: string | string[] | undefined): string | undefined => {
  if (isUndefined(joinCode)) {
    return undefined;
  }
  if (isArray(joinCode)) {
    return getJoinCodeQueryParam(head(joinCode));
  }
  return joinCode;
};
