import { sentryCaptureError } from '../../../../shared/services';

export const MyKurlyFarmReportError = (
  extra: { reason: string; accessToken: string; err?: string },
  userAgent?: string,
) => {
  if (!userAgent?.match(/Kurly\/(\d+\.\d+\.\d+)/)) {
    return;
  }

  sentryCaptureError(new Error(`게임 시작 오류 (${extra.reason})`), {
    tags: { type: 'my-kurly-farm' },
    extra,
  });
};
