import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserData } from '../utils/InterFaces';


interface AuthContextProps {
    token: string | null;
    decodedToken: UserData | null;
    saveUserData: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthContextProviderProps {
    children: ReactNode;
}

export default function AuthContextProvider(props: AuthContextProviderProps) {
    const [decodedToken, setDecodedToken] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    console.log(decodedToken, token)

    const saveUserData = () => {
        const storedToken = Cookies.get('authToken');
        if (storedToken) {
            try {
                const decoded = jwtDecode<UserData>(storedToken);
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
        <AuthContext.Provider value={{ saveUserData, decodedToken, token }}>
            {props.children}
        </AuthContext.Provider>
    );
};
