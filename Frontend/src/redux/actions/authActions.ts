import axios from 'axios';
import { Dispatch } from 'redux';

export const loginUser = (userData: { email: string; password: string }) => async (dispatch: Dispatch) => {
    try {
        const res = await axios.post('/api/auth/login', userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error:any) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
        throw error;
    }
};

export const registerUser = (userData: { name: string; email: string; password: string }) => async (dispatch: Dispatch) => {
    try {
        await axios.post('/api/auth/register', userData);
        dispatch({ type: 'REGISTER_SUCCESS' });
    } catch (error:any) {
        dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data });
        throw error;
    }
};
