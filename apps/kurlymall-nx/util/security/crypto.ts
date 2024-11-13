import crypto from 'crypto';

type BufferEncoding = 'utf8' | 'base64';
export class Crypto {
  private readonly ALGORITHM = 'aes-256-cbc';

  private readonly KEY: Buffer;

  private readonly IV: Buffer;

  constructor() {
    this.KEY = crypto.createHash('sha256').update('kurlyevent').digest();
    this.IV = Buffer.alloc(16);
  }

  encrypt(plainText: string, outputEncoding: BufferEncoding = 'base64') {
    const cipher = crypto.createCipheriv(this.ALGORITHM, this.KEY, this.IV);

    const output = Buffer.concat([cipher.update(plainText), cipher.final()]).toString(outputEncoding);

    return output.replace('+', '-').replace('/', '_').replace(/=/g, '');
  }

  decrypt(cipherText: string, outputEncoding: BufferEncoding = 'base64') {
    if (!cipherText) {
      return '';
    }

    const base64DecodeCipherText = Buffer.from(cipherText.replace('-', '+').replace('_', '/'), 'base64');

    const cipher = crypto.createDecipheriv(this.ALGORITHM, this.KEY, this.IV);

    return Buffer.concat([cipher.update(base64DecodeCipherText), cipher.final()]).toString(outputEncoding);
  }
}
