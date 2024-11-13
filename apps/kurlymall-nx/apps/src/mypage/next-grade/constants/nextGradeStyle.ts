import { GradeName } from '../../../shared/enums';
import {
  FriendsStyle,
  LavenderStyle,
  NormalStyle,
  PurpleStyle,
  ThePurpleStyle,
  WelcomeStyle,
  WhiteStyle,
} from '../../../../constant/gradeStyle';

const nextGradeStyle = {
  [GradeName.Welcome]: WelcomeStyle,
  [GradeName.Normal]: NormalStyle,
  [GradeName.White]: WhiteStyle,
  [GradeName.Friends]: FriendsStyle,
  [GradeName.Lavender]: LavenderStyle,
  [GradeName.Purple]: PurpleStyle,
  [GradeName.ThePurple]: ThePurpleStyle,
};

export default nextGradeStyle;
