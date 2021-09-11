import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { SafeAreaView, Image, View, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, ScrollView} from 'react-native';
import Estilo from '../Estilos/estilos';
import 'react-native-gesture-handler';

import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('3Gn03P52SobkejDgGrNs4s6VGueB6hlQJWOSjfAp','h42wHjjwXs3ZHsccr0LKSMcUJdIiT77grGByAVvL');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function TelaLogin({navigation}){

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  async function saveNewUser() {

    //Create your Parse Object
    const Usuario = new Parse.Object('Usuario');
    //Define its attributes
    Usuario.set('FirstName', username);
    Usuario.set('LastName', lastname);
    Usuario.set('email', email);
    Usuario.set('password', password);
    try {
      //Save the Object
      const result = await Usuario.save();
      doUserLogIn();
    } catch (error) {
      alert('Failed to create new object: ' + error.message);
    }
  }

  const doUserLogIn = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    return await Parse.User.logIn(usernameValue, passwordValue)
      .then(async (loggedInUser) => {
        // logIn returns the corresponding ParseUser object
        alert(
          'Success!',
          `User ${loggedInUser.get('username')} has successfully signed in!`,
        );
        // To verify that this is in fact the current user, currentAsync can be used
        const currentUser = await Parse.User.currentAsync();
        console.log(loggedInUser === currentUser);
        return true;
      })
      .catch((error) => {
        // Error can be caused by wrong parameters or lack of Internet connection
        alert('Error!', error.message);
        return false;
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
            <TouchableWithoutFeedback onPress={()=>navigation.navigate("Home")}>
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