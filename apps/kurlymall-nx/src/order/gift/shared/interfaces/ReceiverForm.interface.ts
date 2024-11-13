export enum Notification {
  KAKAO_TALK = 'KAKAO_TALK',
  SMS = 'SMS',
}

export type NotificationType = keyof typeof Notification;

export interface RecipientInfo {
  name: string;
  message: string;
  phone: string;
}
