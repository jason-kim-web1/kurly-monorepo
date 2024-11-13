import { NextApiRequest, NextApiResponse } from 'next';
import { isAfter, parseISO } from 'date-fns';

import { logger } from '../../src/shared/services/logger';
import { couponKeyArray } from '../../src/member/signup/constants';

const l = logger.child({ api: '/nx/api/signup-coupon-key' });

const getSignupCouponKey = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const currentTime = new Date();

    const selectedCouponKey = couponKeyArray
      .sort(({ date: dateA }, { date: dateB }) => {
        return isAfter(parseISO(dateA), parseISO(dateB)) ? -1 : 1;
      })
      .find(({ date }) => {
        try {
          return isAfter(currentTime, parseISO(date));
        } catch (err) {
          return false;
        }
      });

    res.status(200).json({ key: selectedCouponKey?.key || couponKeyArray[0].key });
  } catch (err) {
    res.status(400).json({ error: err });
    l.info({ err });
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    getSignupCouponKey(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
