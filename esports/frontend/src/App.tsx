import { useState, useEffect } from "react";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import LogoImg from "./assets/logo-esports.svg";
import "./styles/main.css";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

export interface Game {
  id: string;
  title: string;
  bannerrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:8080/games").then(response => setGames(response.data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={LogoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className=" text-transparent bg-gradient bg-clip-text">duo</span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((item) => (
          <GameBanner
            key={item.id}
            title={item.title}
            bannerUrl={item.bannerrl}
            adsCount={item._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  );
}

export default App;
