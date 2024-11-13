export type InputEventType = { name: string; value: string };

export interface LeaveRequest {
  password: string;
  reasonComment: string;
  reasonCodes: Array<string>;
}

export interface ReasonCodeInterface {
  name: string;
  value: string;
}

export interface LeaveTitleText {
  title: string;
  text: string;
}

export interface ActiveServiceInfo {
  title: string;
  kurlyMembersName: string;
  kurlyPayName: string;
}
