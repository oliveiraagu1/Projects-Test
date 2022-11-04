import { useState, FormEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import appPreviewImg from "../assets/app_copa.png";
import logoImg from "../assets/logo.svg";
import avatar from "../assets/avatares.png";
import iconCheck from "../assets/icon.svg";
import { api } from "../lib/axios";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const resposne = await api.post("/pools", {
        title: poolTitle,
      });

      const { code } = resposne.data;

      await navigator.clipboard.writeText(code);

      alert('Bolão criado com sucesso, código já foi copiado!')

      setPoolTitle('');
      
    } catch (err) {
      alert("Falha ao criar o bolão");
    }
  }

  return (
    <div className="max-w-[1124px] mx-auto h-screen grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="Logo" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão dda copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={avatar} alt="avatar" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span>
            pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2 ">
          <input
            type="text"
            required
            placeholder="Qual nome do seu bolão"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            value={poolTitle}
            onChange={(event) => setPoolTitle(event.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="Logo" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="Logo" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image src={appPreviewImg} alt="celular" quality={100} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCount, guessCount, userCount] = await Promise.all([
    api.get("pools/count"),
    api.get("guesses/count"),
    api.get("users/count"),
  ]);
  return {
    props: {
      poolCount: poolCount.data.count,
      guessCount: guessCount.data.count,
      userCount: userCount.data.count,
    },
  };
};
