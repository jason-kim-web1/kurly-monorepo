export interface Kakao {
  isInitialized: () => boolean;
  init: (key: string) => void;
  Channel: {
    addChannel: (op: { channelPublicId: string }) => void;
  };
  Link: {
    sendDefault: (option: {
      objectType: string;
      content: {
        title: string;
        description?: string;
        imageUrl: string;
        imageWidth: number;
        imageHeight: number;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      };
      buttons: {
        title: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      }[];
      installTalk: boolean;
    }) => void;
    sendCustom: (option: {
      templateId: number;
      templateArgs: {
        recipientName: string;
        ordererName: string;
        month: string;
        day: string;
        externalGroupOrderNo?: string;
        externalOrderNo?: string;
      };
      installTalk: true;
    }) => void;
  };
  Auth: {
    authorize: (option: { redirectUri: string; state: string }) => void;
  };
  Share: {
    sendCustom: (settings: {
      templateId: number;
      templateArgs?: {
        [key: string]: any;
      };
      installTalk?: boolean | undefined; // default false
      callback?: LinkCallback | undefined;
      serverCallbackArgs?:
        | {
            [key: string]: any;
          }
        | string
        | undefined;
    }) => void;
  };
}
