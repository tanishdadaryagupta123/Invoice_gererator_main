import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { register as registerService, login as loginService } from '../../services/authService';
import { AuthResponse, AuthError } from './types';

interface AuthState {
    user: any;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | Array<{ msg: string }>;
}

const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
};

export const registerUser = createAsyncThunk<
    AuthResponse,
    { username: string; email: string; password: string },
    { rejectValue: AuthError }
>('auth/registerUser', async (userData, thunkAPI) => {
    try {
        const response = await registerService(userData);
        return response;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk<
    AuthResponse,
    { email: string; password: string },
    { rejectValue: AuthError }
>('auth/loginUser', async (userData, thunkAPI) => {
    try {
        const response = await loginService(userData);
        return response;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.status = 'succeeded';
                state.user = action.payload.result;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<AuthError | undefined>) => {
                state.status = 'failed';
                state.error = action.payload?.errors || action.payload?.message || null;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.status = 'succeeded';
                state.user = action.payload.result;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<AuthError | undefined>) => {
                state.status = 'failed';
                state.error = action.payload?.errors || action.payload?.message || null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
