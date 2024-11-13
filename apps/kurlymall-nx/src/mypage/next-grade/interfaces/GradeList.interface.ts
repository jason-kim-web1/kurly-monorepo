import { GradeName } from '../../../shared/enums';

export interface GradeList {
  gradeName: GradeName;
  text: string;
  point: string;
  amount: number;
  review?: string;
  gift?: string;
  link?: string;
}
