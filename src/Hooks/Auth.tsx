import { createContext, ReactNode, useContext } from "react";


export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}
interface AuthContextData {
    user: User;
}
interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}
export function AuthProvider({ children }: AuthProviderProps) {

    const user: User = {
        id: '000',
        name: 'user',
        email: 'user@email.com'
    }



    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context;
}

