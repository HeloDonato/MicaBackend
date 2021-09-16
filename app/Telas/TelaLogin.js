import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import { SafeAreaView, Image, View, TextInput, Text, TouchableWithoutFeedback} from 'react-native';
import Estilo from '../Estilos/estilos';
import 'react-native-gesture-handler';
import AuthContext from '../Providers/AuthProvider';

export default function TelaLogin({navigation}){

  const {entrar} = useContext(AuthContext);
    const [error, setError] = useState('');

    const [credenciaisDoUsuario, setCredenciaisDoUsuario] = useState({
        email: "",
        senha: ""
    });

    const handleEmailChange = (email) => {
        setCredenciaisDoUsuario({
            ...credenciaisDoUsuario,
            email: email
        });
    };

    const handleSenhaChange = (senha) => {
        setCredenciaisDoUsuario({
            ...credenciaisDoUsuario,
            senha: senha
        });
    }

    const handleEntrarPress = () => {
        entrar(
            credenciaisDoUsuario.email,
            credenciaisDoUsuario.senha
        ).catch(error => {
            console.log("error", error);
        });
    }

  return(
    <SafeAreaView style={Estilo.containerHome}>
      <StatusBar backgroundColor="#fff" StatusBarStyle="dark-content"/>
      <View style={Estilo.viewLogin}>
        <Image source={require('../../assets/LogoMica.png')} style={Estilo.logoLogin}/>
      </View>
      <View style={Estilo.containerLogin}>
        <TextInput
          style={Estilo.camposForm}
          placeholder="E-mail"
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={Estilo.camposForm}
          placeholder="Senha"
          onChangeText={handleSenhaChange}
          secureTextEntry={true}
        />
        <View>
          <TouchableWithoutFeedback onPress={handleEntrarPress}>
            <View style={Estilo.botaoLogin}>
              <Image 
                source={require('../../assets/login-verde.png')}
                style={Estilo.iconeLogin}
              />
              <Text style={Estilo.textoLogin}>Entrar</Text>
            </View>
          </TouchableWithoutFeedback>    
        </View>
        <View style={Estilo.opcCadastro}>
          <TouchableWithoutFeedback onPress={()=>navigation.navigate("Cadastro")}>
            <Text style={Estilo.txtOpcCadastro}>Cadastre-se</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  )
}