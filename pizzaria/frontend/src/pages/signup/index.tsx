import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/logo.svg';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';

export default function Signup() {
    return (
        <>
            <Head>
                <title>Faça seu cadastro agora</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo pizzaria" />
                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form>
                        <Input
                            placeholder="Digite o seu nome"
                            type="text"
                        />
                        <Input
                            placeholder="Digite o seu e-mail"
                            type="text"
                        />
                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                        />

                        <Button type="submit" loading={false}>Cadastrar</Button>
                    </form>
                    <Link href="/">
                        <a className={styles.text}>Já possui uma conta? Faça login</a>
                    </Link>

                </div>
            </div>
        </>
    )
}
