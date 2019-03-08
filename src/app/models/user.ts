export interface Roles {
    root?: boolean;
    admin?: boolean;
    client?: boolean;
}


export interface User {
    uid: string;
    email: string;
    roles: Roles;
}