import React, {useContext} from 'react';
import { View, Image, SafeAreaView, ScrollView, TouchableOpacity, Text} from 'react-native';
import Estilo from '../Estilos/estilos'
import { DrawerItemList } from '@react-navigation/drawer';
import AuthContext from '../Providers/AuthProvider';

function ConteudoMenu(props, {navigation}){

  const {sair, usuario} = useContext(AuthContext);
  const handleSair = () => {
    sair();
  }
  const { state, ...rest } = props;
  const itensMenu = { ...state}  
  itensMenu.routes = itensMenu.routes.filter(item => item.name !== 'Cadastro' && item.name !== 'NovoObjetivo' && item.name !== 'EditarRegistro' )
  
  return(
    <SafeAreaView style={Estilo.menuLateral}>
      <View style={Estilo.topMenu}>
        <Image style={Estilo.micaMenu} source={require('../../assets/Mica-menu.png')}/> 
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>   
          <Image source={require('../../assets/x-verde.png')} style={Estilo.xMenu}/>
        </TouchableOpacity>
      </View>
      <ScrollView {...props}>
        <DrawerItemList state={itensMenu} {...rest} activeTintColor={'#4FC99A'} inactiveTintColor={'#4FC99A'}></DrawerItemList>
        <TouchableOpacity onPress={() => handleSair()}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', paddingTop: 50}}>
              <Image source={require('../../assets/icone-logout-verde.png')} style = {{width: 30, height: 30}}/>
            </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ConteudoMenu;