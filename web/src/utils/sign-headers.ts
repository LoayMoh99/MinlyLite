
export default function signHeader() {
    // TODO it should be a base64 encoded string 
    const sign = process.env.REACT_APP_API_KEY ?? 'XXX';

    return sign ?? '';
}