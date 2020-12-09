// checks if the length is at least 8 and if it contains at least one digit, lowercase, upppercase and special character
// eslint-disable-next-line no-useless-escape
const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!"#$%&'()*+,-.\/\\:;<=>?@\[\]^_`{|}~]).{8,}$/;
export const isPasswordStrongEnough = (password: string): boolean => {
    return strongPasswordRegex.test(password);
};

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const isEmailValid = (email: string): boolean => {
    return validEmailRegex.test(email);
};
