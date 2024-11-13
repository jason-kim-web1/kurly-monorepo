import { Grade } from '../src/shared/enums';
import COLOR from '../src/shared/constant/colorset';

const gradeTextStyle = {
  [Grade.Welcome]: {
    color: COLOR.kurlyGray450,
  },
  [Grade.Normal]: {
    color: COLOR.kurlyGray450,
  },
  [Grade.White]: {
    color: COLOR.loversWhite,
  },
  [Grade.Friends]: {
    color: COLOR.loversFriends,
  },
  [Grade.Lavender]: {
    color: COLOR.loversLavender,
  },
  [Grade.Purple]: {
    color: COLOR.loversPurple,
  },
  [Grade.ThePurple]: {
    color: COLOR.loversThePurple,
  },
};

export default gradeTextStyle;
