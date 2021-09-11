import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function(){
  return(
    <View style={estilos.botao}>
        <Text style={estilos.texto}>Salvar</Text>
    </View>
  )
}

const estilos=StyleSheet.create({
  botao:{
    alignItems:"center",
    padding:10,
    paddingTop: 40
  },
  texto:{
    color: '#fff',
    fontSize: 24,
    fontWeight:'bold'
  }
});