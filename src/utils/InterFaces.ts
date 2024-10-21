export interface Add_Edit_UserSchema {
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    phoneNumber: string | number,
    birthDate: string,
};
export interface FetchedData {
    users: undefined | UserData[],
    loading: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: null | any,
}
export interface Address {
    address: string;
    city?: string;
    state?: string;
    zip?: string;
}export interface UserData {
    id: number | string;
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    age?: any;
    phone?: string | undefined;
    birthDate?: string;
    gender?: string;
    address?: Address | null;
}