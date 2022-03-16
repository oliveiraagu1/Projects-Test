import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

// Função para páginas que só podem ser acessadas por visitantes!
export function canSSRGuest<P>( fn: GetServerSideProps<P> ){
    return async ( context: GetServerSidePropsContext ): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(context);
        // Se tentar acessar a pagina com o login já salvo redirecionamos
        if(cookies['@nextauth.token']){
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return await fn(context);
    }
}
