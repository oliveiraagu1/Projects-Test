import AsyncStorage from "@react-native-async-storage/async-storage";

// Buscar os favoritos
export async function getFavorites(key){
    const favorites = await AsyncStorage.getItem(key);
    return JSON.parse(favorites) || [];
}
// Salvar um novo favotiro
export async function saveFavorites(key, newItem){
    let myFavorites = await AsyncStorage.getItem(key);

    let hasItem = myFavorites.some((item) => item.id === newItem.id);

    if(hasItem){
        return false;
    }

    myFavorites.push(newItem);

    await AsyncStorage.setItem(key, JSON.stringify(myFavorites));
}
// Remover um favorito
export async function removeItem(id){
    let recipes = await AsyncStorage.getItem("@appreceitas");

    let myFavorites = recipes.filter( item => {
        return ( item.id !== id)
    });

    await AsyncStorage.setItem('@appreceitas', JSON.stringify(myFavorites))
    return myFavorites;
}

// Verificar se já está favoritado
export async function isFavorite(receipe){
    let myReceipes = await getFavorites("@appreceitas");
    const favorite = myReceipes.find(item => item.id === receipe.id);

    return !!favorite;
}