import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({} as AuthContextData);

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode;
}
interface AuthContextData {
    user: User;
    singInWithGoogle: () => Promise<void>
    singInWithApple: () => Promise<void>
    singOut: () => Promise<void>;
    userStorageLoading: boolean;
}
interface AuthorizationResponse {
    params: {
        access_token: string
    }
    type: string
}
interface UserDataResponse {
    id: string;
    email: string;
    given_name: string;
    picture: string;
}
interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}
export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>({} as User);
    const userStorageKey = '@gofinances:user';
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    useEffect(() => {
        async function loadUserStorageData() {
            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            if (userStoraged) {
                const userLogged = JSON.parse(userStoraged);
                setUser(userLogged);
            }
            setUserStorageLoading(false);
        }

        loadUserStorageData();
    }, []);

    async function singInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json() as UserDataResponse;

                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                };

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }

        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function singInWithApple() {
        try {
            console.log('Não tem como fazer o login');

        } catch (err) {

        }
    }

    async function singOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    }
    return (
        <AuthContext.Provider value={{ user, userStorageLoading, singInWithGoogle, singInWithApple, singOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context;
}

