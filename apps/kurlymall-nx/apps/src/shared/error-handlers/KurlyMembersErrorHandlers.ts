import { AxiosError } from 'axios';

import { NotFoundMembershipSubscriptionError, SessionExpirationError } from '../errors/kurly-members';

export const handleKurlyMembersCheckoutError = (err: AxiosError): Error => {
  const code = err.response?.status;

  if (code === 403) {
    throw new SessionExpirationError(err);
  }

  if (code === 404) {
    throw new NotFoundMembershipSubscriptionError(err);
  }

  throw err;
};
