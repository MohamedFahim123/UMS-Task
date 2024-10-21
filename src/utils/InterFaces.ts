export interface Add_Edit_UserSchema {
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    phoneNumber: string | number,
    birthDate: string,
};

export interface User {
    id: number;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    birthDate: string | undefined;
    address: {
        address: string | undefined;
    };
    image: string | undefined;
};

export interface FetchedData {
    users: undefined | User[],
    loading: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: null | any,
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    age: any | undefined;
    phone: number | string;
    birthDate: string;
}