import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
export default function SignIn(){
    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Digite o seu e-mail"
                    placeholderTextColor='#F0F0F0'
                    style={styles.input}
                />
                <TextInput
                    placeholder="Digite sua senha"
                    placeholderTextColor='#F0F0F0'
                    style={styles.input}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D2E',
    },
    logo:{
        marginBottom: 18
    },
    inputContainer:{
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input:{
        width: '95%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 4,
        paddingHorizontal: 8,
        color: '#FFF',
    },
    button:{
        width: '95%',
        height: 40,
        backgroundColor: '#3FFFA3',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    }
})
