import {ChangeEvent, FormEvent, useState} from "react";
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { FiUpload } from 'react-icons/fi';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';

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
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

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

    async function handleRegister(event: FormEvent){
        event.preventDefault();
        try{
            const data = new FormData();
            if(name === '' || price === '' || description === '' || imageAvatar === null){
               return toast.warning("Preencha todos os campos");
            }
            data.append("name",name);
            data.append("price", price);
            data.append("description", description);
            data.append("category_id", categories[categorySelected].id);
            data.append("file", imageAvatar);

            const apiClient = setupAPIClient();
            await apiClient.post("product", data);
            toast.success("Produto cadastrado com sucesso!");



        }catch(err){
            toast.error("Erro ao cadastrar categoria!");
        }

        setName("");
        setPrice("");
        setDescription("");
        setImageAvatar(null);
        setAvatarUrl("");
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

                    <form className={styles.form} onSubmit={handleRegister}>

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
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Preço do produto"
                            className={styles.input}
                            value={price}
                            onChange={event => setPrice(event.target.value)}
                        />
                        <textarea
                            placeholder="Descreva seu produto..."
                            className={styles.input}
                            value={description}
                            onChange={event => setDescription(event.target.value)}
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
