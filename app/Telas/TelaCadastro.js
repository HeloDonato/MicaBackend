import { StatusBar } from 'expo-status-bar';
import React, {useState,useContext} from 'react';
import { SafeAreaView, Image, View, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, ScrollView} from 'react-native';
import Estilo from '../Estilos/estilos';
import 'react-native-gesture-handler';
import AuthContext from '../Providers/AuthProvider';


export default function TelaLogin({navigation}){
  const{cadastrar} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const handleCadastrar = ()=>{
    cadastrar({
      email: email,
      senha: password,
      nome: username,
      sobrenome:lastname 
    });
  };

  return(
    <SafeAreaView style={Estilo.containerHome}>
      <StatusBar backgroundColor="#fff" StatusBarStyle="dark-content"/>
  
      <ScrollView>
        <View style={{paddingLeft: 10}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>          
            <Image source={require('../../assets/x-branco.png')} style={Estilo.iconeX}/>
          </TouchableOpacity>
        </View>
        <View style={Estilo.viewLogin}>
          <Image source={require('../../assets/LogoMica.png')} style={Estilo.logoCadastro}/>
        </View>
        <View style={Estilo.containerLogin}>
          <Text style={Estilo.cabecalho}>Informe seus dados</Text>
          <TextInput
            style={Estilo.camposForm}
            placeholder="Nome"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={Estilo.camposForm}
            placeholder="Sobrenome"
            value={lastname}
            onChangeText={(text) => setLastname(text)}
          />
          <TextInput
            style={Estilo.camposForm}
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={Estilo.camposForm}
            placeholder="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View>
            <TouchableWithoutFeedback onPress={()=>handleCadastrar()}>
              <View style={[Estilo.botaoLogin, {marginBottom: 20}]}>
                <Text style={Estilo.textoLogin}>Cadastrar</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}