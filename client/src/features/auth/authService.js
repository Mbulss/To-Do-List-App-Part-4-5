import axios from 'axios';

const API_URL = '/service/user';

// signin user
const signin = async (userData) => {
    const response = await axios.post(API_URL + "/signin", userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// logout user
const logout = async () => {
    const response = await axios.post(API_URL + "/logout");
    if (response.data) {
        localStorage.removeItem('user');
    }
    return response.data;
}

// signup user
const signup = async (userData) => {
    const response = await axios.post(API_URL + "/signup", userData);
    return response.data;
}

// activate email
const activateEmail = async (activationToken) => {
    const response = await axios.post(API_URL + "/activation", { activation_token: activationToken });
    return response.data;
}

// get user info
const getUserInfo = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.refresh_token; // Use refresh_token for now, ideally should be an access token
    if (!token) {
        throw new Error("No token found");
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "/user-infor", config);
    return response.data;
}

const authService = {
    signin,
    logout,
    signup,
    activateEmail,
    getUserInfo,
}

export default authService