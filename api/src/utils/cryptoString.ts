import { randomBytes, createHmac } from 'crypto'

export const createCryptoString = ({ length = 48 }: { length?: number } = {}) =>
  randomBytes(length).toString('hex')

export function validateSignature(signature: string | string[]) {
  let sign = signature;
  // check if array take first element
  if (Array.isArray(signature)) {
    sign = signature[0]
  }

  // using our OUR_API_KEY from .env file check if the signature is valid base64 encoded
  return sign === createHmac('sha256', process.env.OUR_API_KEY ?? 'XXX').digest('base64');


}