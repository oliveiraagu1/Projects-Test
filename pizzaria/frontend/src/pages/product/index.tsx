import {ChangeEvent, useState} from "react";
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { FiUpload } from 'react-icons/fi';
import { setupAPIClient } from '../../services/api';

type ItemProps = {
    id: string;
    name: string;
}
interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function handleFile(event: ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
            return;
        }
        const image = event.target.files[0];

        if(!image){
            return;
        }
        if(image.type === "image/jpeg" || image.type === "image/png"){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    // Quando você seleciona uma nova categoria
    function handleChangeCategory(event){
            setCategorySelected(event.target.value);
    }

    return(
        <>
            <Head>
                <title>Novo produto - Pizzaria</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#FFF"/>
                            </span>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleFile}
                            />
                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map( (item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input
                            type="text"
                            placeholder="Digite o nome do produto"
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Preço do produto"
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Descreva seu produto..."
                            className={styles.input}
                        />
                        <button className={styles.buttonAdd} type="submit">Cadastrar</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('category');

    return{
        props: {
            categoryList: response.data
        }
    }

})
