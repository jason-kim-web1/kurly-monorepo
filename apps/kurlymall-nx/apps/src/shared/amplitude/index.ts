import AmplitudeService from './AmplitudeService';

export * from './ScreenName.enum';
export * from './TabName.enum';
export * from './browse-screen-names.constant';
export * from './browse-event-info.constant';
export * from './browse-event-names.constant';
export * from './browse-sub-event-info.constant';
export * from './browse-sub-event-names.constant';
export * from './referrer-event.constant';
export * from './previous-screen-names';
export * from './amplitude-bucket-storage.service';

export const amplitudeService = new AmplitudeService();
