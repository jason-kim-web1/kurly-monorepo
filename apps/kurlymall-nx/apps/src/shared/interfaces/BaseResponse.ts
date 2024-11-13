export interface BaseResponse<T> {
  data: T;
}

export interface BaseApiResponse<T> extends BaseResponse<T> {
  success?: boolean;
  message?: string | null;
}
