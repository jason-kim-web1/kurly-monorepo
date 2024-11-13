interface MainPopupNoticeContent {
  link: string;
  content: string;
}

export interface MainPopupNoticeButton {
  noShowHours: number;
  label: string;
}

export interface MainPopupNotice {
  id: number;
  name: string;
  title: string;
  content: string;
  closeOption: string;
  showOrder: string;
  popup: { link: string; url: string };
  buttons: MainPopupNoticeButton[];
  pc: MainPopupNoticeContent;
  mobile: MainPopupNoticeContent;
}
