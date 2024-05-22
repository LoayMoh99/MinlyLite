
export default function authHeader() {
    const usertoken = localStorage.getItem("usertoken");
    let user = null;
    if (usertoken)
        user = JSON.parse(usertoken);

    if (user && user.accessToken) {
        return 'Bearer ' + user.accessToken;
    }
    return '';
}