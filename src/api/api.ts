import { LoginRequest, LoginResponse, SignUpRequest } from './types';

enum Method {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export default class Api {
    private baseUrl: string;

    constructor() {
        this.baseUrl =
            process.env.NODE_ENV === 'production'
                ? (process.env.REACT_APP_API_PROD_BASE_URL as string)
                : (process.env.REACT_APP_API_DEV_BASE_URL as string);
    }

    private async fetch<Response>(
        path: string,
        { body, method = Method.GET }: { body?: Record<string, unknown>; method?: Method },
    ): Promise<Response> {
        const url = `${this.baseUrl}${path}`;
        const resp = await fetch(url, {
            method,
            mode: 'cors', // no-cors, *cors, same-origin
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (resp.status >= 400 && resp.status <= 511) {
            throw new Error(`Request to ${url} failed with status ${resp.status}`);
        }

        return resp.json() as Promise<Response>;
    }

    public login(body: LoginRequest): Promise<LoginResponse> {
        return this.fetch(`/auth/login`, { body, method: Method.POST });
    }

    public signUp(body: SignUpRequest): Promise<void> {
        return this.fetch(`/auth/signup`, { body, method: Method.POST });
    }
}
