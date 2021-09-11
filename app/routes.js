import React, {useContext} from 'react';
import AuthContext from './Providers/AuthProvider';
import {Image} from 'react-native';
import TelaDeRegistro from './Telas/TelaDeRegistro';
import TelaHome from './Telas/TelaHome';
import TelaHistorico from './Telas/TelaHistorico';
import TelaObjetivo from './Telas/TelaObjetivos';
import TelaLogin from './Telas/TelaLogin';
import TelaCadastro from './Telas/TelaCadastro';
import NovoObjetivo from './Telas/TelaNovoObjetivo';
import EditarRegistro from './Telas/TelaEditarRegistro';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ConteudoMenu from './Componentes/conteudoMenu';
import { NavigationContainer } from '@react-navigation/native';

const Gavetas = createDrawerNavigator();

const AuthStack = () => {
    return(
        <Gavetas.Navigator screenOptions={{
            headerShown: false
            }}
            drawerStyle={{
            borderTopRightRadius: 70,
            }}
            drawerContent={(props) => <ConteudoMenu {...props} />}
        >
            <Gavetas.Screen
                name="Home"
                component={TelaHome}
                options={{
                    title: 'Home',
                    drawerIcon: ({ focused, size }) => (
                    <Image
                        source={require('../assets/home-menu.png')}
                        style = {{width: 30, height: 30}}
                    />
                    )
                }}
            />
            <Gavetas.Screen
                name="NovoRegistro"
                component={TelaDeRegistro}
                options={{
                    title: 'Novo Registro',
                    drawerIcon: ({ focused, size }) => (
                    <Image
                        source={require('../assets/icone-x-verde.png')}
                        style = {{width: 30, height: 30}}
                    />
                    )
                }}
            />
            <Gavetas.Screen
                name="Historico"
                component={TelaHistorico}
                options={{
                    title: 'Historico',
                    drawerIcon: ({ focused, size }) => (
                    <Image
                        source={require('../assets/historico-bolinha.png')}
                        style = {{width: 30, height: 30}}
                    />
                    )
                }}
            />
            <Gavetas.Screen
                name="Objetivos"
                component={TelaObjetivo}
                options={{
                    title: 'Objetivos',
                    drawerIcon: ({ focused, size }) => (
                    <Image
                        source={require('../assets/objetivos.png')}
                        style = {{width: 30, height: 30}}
                    />
                    )
                }}
            />
            <Gavetas.Screen name="NovoObjetivo" component={NovoObjetivo}/>
            <Gavetas.Screen name="EditarRegistro" component={EditarRegistro}/>
        </Gavetas.Navigator>
    )
}


const AppStack = () => {
    return(
        <Gavetas.Navigator>
            <Gavetas.Screen
                name="Login"
                component={TelaLogin}
                options={{
                    title: 'Sair',
                    drawerIcon: ({ focused, size }) => (
                    <Image
                        source={require('../assets/icone-logout-verde.png')}
                        style = {{width: 30, height: 30}}
                    />
                    )
                }}
            />
            <Gavetas.Screen name="Cadastro" component={TelaCadastro}/>
        </Gavetas.Navigator>
    )
}


export const Router = ()=> {

    const {usuario} = useContext(AuthContext);
    
    return (
        <NavigationContainer independent={true}>
            <Gavetas.Navigator> 
            {
                usuario 
                ?   <Gavetas.Screen 
                    name="AuthStack"
                    component={AuthStack}
                    options={{ headerShown: false}}
                    />
                :   <Gavetas.Screen 
                    name="AppStack"
                    component={AppStack}
                    options={{ headerShown: false}}
                    />
            }
            </Gavetas.Navigator>
        </NavigationContainer>
        
    )
}

export default Router;