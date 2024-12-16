export interface AuthResponse {
    result: {
        username: string;
        email: string;
        _id: string;
    };
    token: string;
}

export interface AuthError {
    errors: Array<{ msg: string }>;
    message?: string;
}
