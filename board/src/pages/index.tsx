import Head from "next/head";
import { GetStaticProps } from 'next';

import styles from "../styles/styles.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="img/board-user.svg" alt="Ferramenta board" />
        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia escreva, planeja e organiza-se...
          </h1>
          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>
        <div className={styles.donaters}>
          <img src="img/logo.svg" alt="user1" />
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {

    },
    revalidate: 60 * 60 // Atualiza a cada 60 min
  }
}
