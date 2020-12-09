export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export type SignUpRequest = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};
