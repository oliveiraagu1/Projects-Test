import { signIn, signOut, useSession } from 'next-auth/client';
import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export function SignInButton(){
    
    const [session] = useSession();

    return session ? (
        <button
            type='button'
            className={styles.signInButton}
            onClick={ () => signOut() }
        >
            <img src={session.user.image} alt="Foto perfil user" />
            Olá {session.user.name}
            <FiX color='#737380' className={styles.closeIcon} />
        </button>
    ) : (
        <button
        type='button'
        className={styles.signInButton}
        onClick={ () => signIn('github')}
    >
        <FaGithub color='#FFB800'/>
        Entrar com github
    </button>
    )
}