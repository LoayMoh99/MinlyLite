import { createHmac } from 'crypto'

export default function signHeader() {
    const sign = createHmac('sha256', process.env.OUR_API_KEY ?? 'XXX').digest('base64')

    return {
        Signature: sign ?? '',
    };

}