import axios from 'axios';

import { INTERNAL_API_URL } from './config';

const httpClient = axios.create({
  baseURL: INTERNAL_API_URL,
});

export default httpClient;
