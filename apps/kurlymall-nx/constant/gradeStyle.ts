import { Grade } from '../src/shared/enums';
import COLOR from '../src/shared/constant/colorset';

export const WelcomeStyle = {
  border: '1px solid #949296',
  backgroundColor: COLOR.kurlyWhite,
  color: '#949296',
};

export const NormalStyle = {
  color: COLOR.kurlyPurple,
  border: `1px solid ${COLOR.kurlyPurple}`,
  backgroundColor: COLOR.kurlyWhite,
};

export const WhiteStyle = {
  border: '1px solid #a864d7',
  backgroundColor: '#a864d8',
};

export const FriendsStyle = {
  border: '1px solid #cba3e8',
  backgroundColor: '#cba3e9',
};

export const LavenderStyle = {
  border: '1px solid #8c4cc3',
  backgroundColor: '#8c4cc4',
};

export const PurpleStyle = {
  border: '1px solid #641797',
  backgroundColor: '#641798',
};

export const ThePurpleStyle = {
  border: '1px solid #4f1770',
  backgroundColor: '#4f177a',
};

const gradeStyle = {
  [Grade.Welcome]: WelcomeStyle,
  [Grade.Normal]: NormalStyle,
  [Grade.White]: WhiteStyle,
  [Grade.Friends]: FriendsStyle,
  [Grade.Lavender]: LavenderStyle,
  [Grade.Purple]: PurpleStyle,
  [Grade.ThePurple]: ThePurpleStyle,
};

export default gradeStyle;
