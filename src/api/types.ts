export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export type SignUpRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
