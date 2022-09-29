import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { signOut } from '../context/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

export function setupApiClient(context = undefined){
    let cookies = parseCookies(context);

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: `Bearer ${cookies['@barber.token']}`
        }

    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response?.status === 401){
            if( typeof window !== undefined){
                signOut();
            }else{
                return Promise.reject(new AuthTokenError());
            }
        }

        return Promise.reject(error);
    })

    return api;
}