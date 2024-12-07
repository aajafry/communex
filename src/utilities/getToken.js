export const getToken = () => {
    // Get token from local storage
    return localStorage.getItem("communex-auth-token");
}