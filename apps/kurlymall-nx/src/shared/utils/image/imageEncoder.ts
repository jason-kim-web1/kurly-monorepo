import axios, { AxiosRequestConfig } from 'axios';

export default function encodeRemoteImage(imageUrl: string, config?: AxiosRequestConfig) {
  return axios
    .get<string>(imageUrl, {
      responseType: 'arraybuffer',
      ...config,
    })
    .then(({ data, headers }) => {
      const encode = Buffer.from(data, 'binary').toString('base64');
      return 'data:' + headers['content-type'] + ';base64,' + encode;
    });
}
