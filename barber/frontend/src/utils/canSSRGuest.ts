import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext ): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context);

        if(cookies['@barber.token']){
            return {
                redirect: {
                    destination: '/home',
                    permanent: false,
                }
            }
        }

        return await fn(context);
    }
}