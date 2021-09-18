export const API_URL =
    process.env.REACT_APP_API_URL || 'http://localhost:3009/v1/api';
export const User = {
    getAccessToken() {
        return localStorage.getItem('access_token');
    },

    setAccessToken(token) {
        localStorage.setItem('access_token', token);
    },

    getName() {
        return localStorage.getItem('name');
    },
    getUserId() {
        return localStorage.getItem('id');
    },

    setName(name) {
        localStorage.setItem('name', name);
    },

    getEmail() {
        return localStorage.getItem('email');
    },

    setEmail(email) {
        localStorage.setItem('email', email);
    },

    clear() {
        localStorage.clear();
    },
    setUserId(id) {
        localStorage.setItem('id', id);
    },

    removeUserId() {
        localStorage.removeItem('id');
    },

    removeAccessToken() {
        localStorage.removeItem('token');
    },

    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    },
};
