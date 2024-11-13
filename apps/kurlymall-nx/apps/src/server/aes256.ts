import { createCipheriv, createDecipheriv } from 'crypto';

const DefaultKey = 'cW9pd3U5b2k5a2xr7Lus66as64ukY3Fr';

/**
 * string을 AES256 암호화 합니다. 서버사이드에서 사용해야 합니다.
 * @param data 암호화 할 string
 * @returns 암호화 된 string을 return 합니다.
 */
export const AesEncrypt = (data: string) => {
  const key = process.env.AES_ENC_KEY || DefaultKey;
  const iv = Buffer.alloc(16, 0);
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  let encryptedText = cipher.update(data, 'utf8', 'base64');
  encryptedText += cipher.final('base64');

  return encryptedText.replace(/[+/=]/g, (m) => ({ '+': '-', '/': '_', '=': '' }[m] as string));
};

/**
 * AES256으로 암호화 된 string을 복호화 합니다. 서버사이드에서 사용해야 합니다.
 * @param data 복호화 할 string
 * @returns 복호화 된 string을 return 합니다.
 */
export const AesDecrypt = (data: string) => {
  const key = process.env.AES_ENC_KEY || DefaultKey;
  const iv = Buffer.alloc(16, 0);
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  let decryptedText = decipher.update(
    data.replace(/[-_]/g, (m) => ({ '-': '+', _: '/' }[m] as string)),
    'base64',
    'utf8',
  );
  decryptedText += decipher.final('utf8');

  return decryptedText;
};
