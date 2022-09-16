import { useEffect, useState } from "react";
import { View, Image, FlatList } from "react-native";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native'

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerrl}: GameCardProps){
    navigation.navigate('game',{id, title, bannerrl});
  }

  useEffect(() => {
    fetch("http://192.168.0.14:8080/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
