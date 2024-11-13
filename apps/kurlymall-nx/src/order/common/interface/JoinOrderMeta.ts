import { JoinOrderType } from '../constants/JoinOrderType';

export interface JoinOrderMeta {
  code: string;
  requiredPeopleCount: number;
  joinedPeopleCount: number;
  startDate: string;
  endDate: string;
  status: string;
  type: JoinOrderType;
  joinOrderShareLink: string;
}
