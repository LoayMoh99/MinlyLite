
export default function authHeader() {
    const usertoken = localStorage.getItem("usertoken");
    let user = null;
    if (usertoken)
        user = JSON.parse(usertoken);

    if (user && user.accessToken) {
        return {
            Authorization: 'Bearer ' + user.accessToken,
            'Content-Type': 'application/json',
        }; // for Spring Boot back-end
        // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
        return {
            Authorization: '',
            'Content-Type': 'application/json',
        }; // for Spring Boot back-end
        // return { 'x-access-token': null }; // for Node Express back-end
    }
}