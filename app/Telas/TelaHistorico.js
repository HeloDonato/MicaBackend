import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaView,Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Estilo from '../Estilos/estilos'
import 'react-native-gesture-handler';
import RegistroService from '../Services/RegistroService';

export default function TelaHome({navigation}){
  const [shouldShow, setShouldShow] = useState({});

  const [listaRegistros, setListaRegistros] = useState({});

  useEffect(()=>{
    registrarObservador();
  },[]);
  
  const registrarObservador = () =>{
    RegistroService.listar(setListaRegistros);
  }

  const handleApagar = (id) => {
    RegistroService.remover(id);
  };

  const exibir = (key)=>{
    let temp = {...shouldShow}
    temp[key] = !temp[key]
    setShouldShow(temp)
  }


  const icones = {
    '1': require('../../assets/seta-verde.png'),
    '2': require('../../assets/seta-vermelha.png'),
    '3': require('../../assets/transferencia-azul.png')
  }
 
  return(
    <SafeAreaView style={Estilo.containerHome}>
      <StatusBar backgroundColor="#fff" StatusBarStyle="dark-content"/>
      
      <View style={Estilo.cabecalhoHistorico}>
        <View style={Estilo.iconMenuHis}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{paddingRight:10}}>          
            <Image source={require('../../assets/menu.png')} style={Estilo.iconeReg}/>
          </TouchableOpacity>
        </View>
        <View style={Estilo.titHistorico}>
          <Text style={Estilo.tituloHistorico}>Histórico</Text>
        </View>
      </View>
      <View style={Estilo.areaInfo}>
        <ScrollView>
          <View style={Estilo.fundoHistorico}>
            {
              Object.keys(listaRegistros).map(key => {
                return <View key={key}>
                  <View>
                    <TouchableOpacity onPress={() => exibir(key)}>
                      <View style={Estilo.parte2}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={icones[listaRegistros[key].tipo]} style={Estilo.iconeReg}/>
                            <Text style={[Estilo.textoB1, {marginLeft:10}]}>{listaRegistros[key].descricao}</Text>
                        </View>
                        <View style={{width:'30%'}}>
                          <Text style={Estilo.textoB1}>R$ {listaRegistros[key].valor}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View>
                      {shouldShow[key] ? (
                        <View style={{flexDirection:'column'}}>
                          <View style={{alignItems:'center', paddingTop: 15}}>
                            { listaRegistros[key].urlImagem != '' ?
                              <Image style={Estilo.comprovanteImg} source={{uri:listaRegistros[key].urlImagem}}></Image>
                            : <View></View>}
                          </View>
                          <View style={Estilo.infoHistorico}>
                            <TouchableOpacity onPress={()=>navigation.navigate('EditarRegistro', {item:listaRegistros[key], itemId:key})}>
                              <View style={Estilo.partesInfoHistorico}>
                                <Image source={require('../../assets/pencil-amarelo.png')} style={Estilo.iconeReg}/>
                                <Text style={[Estilo.textoB1, {marginLeft:10}]}>Editar</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>handleApagar(key)}>
                              <View style={Estilo.partesInfoHistorico}>
                                <Text style={[Estilo.textoB1, {marginLeft:10}]}>Excluir</Text>
                                <Image source={require('../../assets/x-vermelho.png')} style={Estilo.iconeReg}/>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <View style={Estilo.linha2}/> 
                </View>
              })
            }     
          </View>
        </ScrollView>
      </View>    
    </SafeAreaView>
  )
}
