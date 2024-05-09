interface Base {
    id: number;
    created_at: string;
    updatedAt: string;
}

export interface User extends Base {
    email: string;
    email_verified_at: string | null;
    image: string;
    name: string;
    phone: string;
}

export interface LoginGoogle {
    email: string;
    name: string;
    picture: string;
}

export interface LoginResponse {
    token: string;
}

export interface CreateUser {
    name: string;
    image: File;
    email: string;
    password: string;
    phone: string;
}

export interface CurrentUser {
    email: string;
    name: string;
    image: string;
    verified: string;
}

export interface AuthState {
    user: CurrentUser | null;
    token: string | null;
}