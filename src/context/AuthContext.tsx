import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface DecodedToken {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    birthDate?: string;
    image?: string;
    phone?: string;
    gender?: string;
}

interface AuthContextProps {
    token: string | null;
    decodedToken: DecodedToken | null;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthContextProviderProps {
    children: ReactNode;
}

export default function AuthContextProvider(props: AuthContextProviderProps) {
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const saveUserData = () => {
        const storedToken = Cookies.get('authToken');
        if (storedToken) {
            try {
                const decoded = jwtDecode<DecodedToken>(storedToken);
                setDecodedToken(decoded);
                setToken(storedToken);
            } catch (error) {
                console.error("Invalid token", error);
            };
        };
    };

    useEffect(() => {
        saveUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ decodedToken, token }}>
            {props.children}
        </AuthContext.Provider>
    );
};
