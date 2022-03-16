import {FormEvent, useState} from "react";
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import { setupAPIClient } from '../../services/api';
import {toast} from "react-toastify";

export default function Category(){

    const [name, setName] = useState("");

    async function handleRegister(event: FormEvent){
        event.preventDefault();
        if(name === '') return toast.warning("Preencha o campo categoria");

        const apiClient = setupAPIClient();
        await apiClient.post('category', {
            name,
        });
        toast.success("Categoria cadastrada com sucesso!");
        setName("");
    }

    return(
        <>
            <Head>
                <title>Nova categoria - Pizzaria</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Cadastrar categorias</h1>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            className={styles.input}
                            value={name}
                            onChange={ e => setName(e.target.value) }
                        />

                        <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
                    </form>
                </main>

            </div>
        </>
    )
}
