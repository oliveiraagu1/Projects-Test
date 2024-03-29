import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({

    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: 'read:user'
        }),
    ],
    callbacks: {
        async session(session, profile) {

            try{
                return {
                    ...session,
                    id: profile.sub
                }

            }catch(err){

                return false;return {
                    ...session,
                    id: null
                };

            }
        },
        async signIn(user, account, profile) {
            const { email } = user;
            
            try{
                return true;
            }catch(err){
                console.log('Deu error: ', err);
                return false;
            }
        }
    }
});