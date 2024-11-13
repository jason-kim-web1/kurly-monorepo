import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { parseISO } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';

import evalAdult from '../../src/member/adult-verification/services/evalAdult';
import evalExpiration from '../../src/member/adult-verification/services/evalExpiration';
import { logger } from '../../src/shared/services';
import { KURLY_URL } from '../../src/shared/configs/config';
import httpClient from '../../src/shared/configs/internal-http-client';
import { getUserMetaData } from '../../src/server/api';

const l = logger.child({ api: '/nx/api/identity-verification' });

const VERSION = 'v1.0';
const clientId = 'kurly';
const IDENTITY_THIRD_PARTY_PATH = `https://pgapi.payletter.com/${VERSION}`;

interface VerificationData {
  birth_date: string;
  real_name: string;
}

interface UserMetaData {
  isAdult: boolean;
  verifiedAt: string;
  expiredAt: string;
}

type AccessToken = string;

const fetchVerificationData = async (url: string, accessToken: AccessToken) => {
  const { data: verificationData } = await axios.get<VerificationData>(url, {
    headers: {
      Authorization: 'PLKEY NzQxNTZBMjc4ODFFQjVBNDYyOTUzQUZFRjY1NjU1RDE=',
      'Content-Type': 'application/json',
    },
  });
  const userMetaData: UserMetaData = await getUserMetaData(accessToken);
  return { verificationData, userMetaData };
};

const updateMetaData = async ({
  verificationData,
  userMetaData,
  accessToken,
}: {
  verificationData: VerificationData;
  userMetaData: UserMetaData;
  accessToken: AccessToken;
}) => {
  const isAdult = evalAdult(verificationData.birth_date);
  const isExipred = evalExpiration(parseISO(userMetaData.expiredAt));

  const requestUrl = '/member/proxy/member-core/v1/adult';
  const requestData = {
    is_adult: isAdult,
    adult_member_name: verificationData.real_name,
  };
  const requestConfig = { headers: { Authorization: `Bearer ${accessToken}` } };

  if (isExipred) {
    await httpClient.put(requestUrl, requestData, requestConfig);
  } else {
    await httpClient.post(requestUrl, requestData, requestConfig);
  }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jwt = req.headers.authorization?.replace('Bearer ', '') ?? '';
    const { m_no: mNo, uuid } = jwtDecode<{ m_no?: string; uuid?: string }>(jwt);
    const url = `${IDENTITY_THIRD_PARTY_PATH}/auth/mobile/request`;
    const data = {
      auth_method: 'mobile',
      client_id: clientId,
      user_id: mNo || uuid || 'kurly',
      custom_parameter: jwt,
      return_url: `${KURLY_URL}/nx/api/identity-verification`,
      site_url: 'https://www.kurly.com',
      site_name: '컬리',
    };

    l.info({ data });
    const result = await axios.post(url, data, {
      headers: {
        Authorization: 'PLKEY OTFEQURGMTIxODMwMzBCQjEyQjJGNjczMjE3MjU4QTc=',
        'Content-Type': 'application/json',
      },
    });
    res.status(200).send(result.data);
    l.info({ data: result.data });
  } catch (err) {
    res.status(400).json({ error: err });
    l.info({ err });
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * Request Body
   * -code: 에러 코드
   * -message: 에러 메시지
   * -tid: 인증 거래 번호
   * -custom_parameter: 인증 요청시 가맹점(컬리)에서 임의로 전송한 값
   * -auth_info: 암호화 된 사용자 인증 정보
   */
  const {
    code,
    tid,
    auth_info: authInfo,
    custom_parameter: accessToken,
  }: {
    code: string;
    tid: string;
    auth_info: string;
    custom_parameter: AccessToken;
  } = req.body;
  l.info({ body: req.body });
  const url = `${IDENTITY_THIRD_PARTY_PATH}/auth/info/${tid}?client_id=${clientId}&auth_info=${authInfo}`;
  if (code === '301') {
    res.redirect(307, '/member/adult-verification');
    return;
  }

  try {
    const verificationData = await fetchVerificationData(url, accessToken);
    await updateMetaData({ ...verificationData, accessToken });
    res.redirect(307, '/member/adult-verification?result=success');
  } catch (err) {
    res.redirect(307, '/member/adult-verification?result=fail');
    l.info({ err });
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    handlePost(req, res);
  } else {
    handleGet(req, res);
  }
};
