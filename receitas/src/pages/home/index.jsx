import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from '../../components/Logo';
import { api } from "../../service/api";
import {FoodList} from "../../components/FoodList";
export default function Home(){
    const [ inputValue, setInputValue ] = useState("");
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        async function fetchApi() {
            const response = await api.get('/foods');
            setFoods(response.data);

            console.log(response.data[0])
        }
        fetchApi();
    }, []);

    const handleSearch = () => {
        alert('teste')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Logo/>
            <Text style={styles.title}>Encontre a receita</Text>
            <Text style={styles.title}>que combina com você</Text>

            <View style={styles.form}>
                <TextInput
                    placeholder='Digite o nome da comida...'
                    style={styles.input}
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />

                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name='search' size={28} color='#4CB6C'/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={foods}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FoodList data={item}/>  }
                showsVerticalScrollIndicator={false}

            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F9FF',
        paddingTop: 36,
        paddingStart: 14,
        paddingEnd: 14,
    },
    title:{
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0E0E0E',
    },
    form: {
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ECECEC",
        paddingRight: 8,
        paddingLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        width: '90%',
        maxWidth: '90%',
        height: 54
    }
});