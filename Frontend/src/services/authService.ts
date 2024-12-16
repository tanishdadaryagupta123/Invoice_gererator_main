import axios from 'axios';


interface UserData {
    username?: string;
    email: string;
    password: string;
}

export const register = async (userData: UserData) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users/register`, userData);
    return response.data;
};

export const login = async (userData: UserData) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users/login`, userData);
    return response.data;
};
