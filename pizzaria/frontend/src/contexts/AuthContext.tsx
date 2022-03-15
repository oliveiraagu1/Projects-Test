import { createContext, ReactNode, useState} from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { api } from '../services/apiClient';
import Router from 'next/router';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: ( credentials: SignProps) => Promise<void>;
  singOut: () => void;
}
type SignProps = {
    email: string;
    password: string;
}
type UserProps = {
    id: string;
    name: string;
    email: string;
}
type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function singOut(){
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch {
        console.log("Error ao deslogar!");
    }
}

export function AuthProvider({ children }: AuthProviderProps){

    const [ user, setUser ] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignProps){
        try {
            const response = await api.post('session', {
                email,
                password
            });
            const { id, name, token } = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mês
                path: "/" // Quais caminhos terão acesso ao cookie
            });
            setUser({
                id,
                name,
                email
            });
            // Passar para próximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            //Redirecionar para a página dashboard
            Router.push('/dashboard');
        } catch(err) {
            console.log("error: " + err )
        }
    }

    return(
        <AuthContext.Provider value={{
            user, isAuthenticated, signIn, singOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}
