export interface AuthenticationModel {
    userName: string;
    fullName: string;
    token: string;
    roles: string[],
    tokenDate: number,
    tokenDurationM: number,
    refreshToken: string,
    isAuthenticated: boolean,
    message: string
}
export interface RegisterModel {
    UserName: string;
    FullName: string;
    Password: string;
}
export interface LoginModel {
    UserName: string;
    Password: string;
}
export interface ChangePasswordModel {
    UserName: string;
    Password: string;
    NewPassword: string;
}