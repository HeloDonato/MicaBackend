import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaView,Text, View, Image, TouchableOpacity, ScrollView, Modal} from 'react-native';
import Estilo from '../Estilos/estilos'
import 'react-native-gesture-handler';
import ObjetivoService from '../Services/ObjetivoServise'

export default function TelaHome({navigation}){
  const [shouldShow, setShouldShow] = useState({});
  const [listaObjetivos, setListaObjetivos] = useState({});
  const [somaRegistro, setSomaRegistro] = useState({});
  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(()=>{
    registrarObservador();
  },[]);
  
  const registrarObservador = () =>{
    ObjetivoService.listar(setListaObjetivos);
  }

  const exibir = (key)=>{
    let temp = {...shouldShow}
    temp[key] = !temp[key]
    setShouldShow(temp)
    ObjetivoService.resultado(listaObjetivos[key], setSomaRegistro)
    setmodalVisible(true);
  }

  const handleApagar = (id) => {  
    ObjetivoService.remover(id);
  };

  const limiteD = (id) => { 
    let meta = (somaRegistro/listaObjetivos[id].valor) * 100;
    console.log(meta);

    if(listaObjetivos[id].tipo == '1'){
      if(somaRegistro > listaObjetivos[id].valor){
        return <Text>Objetivo falhou!!</Text>
      }
      else if(meta < 80){
        return <Text>Objetivo concluido, continue assim!!</Text>
      }
      else if(meta >= 80 && meta <= 100){
        return <Text>Objetivo concluido, mas tome cuidado!</Text>
      }
    }

    else if(listaObjetivos[id].tipo == '2'){
      if(somaRegistro > listaObjetivos[id].valor){
        return <Text>Você conseguiu mais que o esperado!!</Text>
      }
      else if(meta >= 80){
        return <Text>Objetivo concluido, continue assim!!</Text>
      }
      else if(meta < 80){
        return <Text>Quase lá!!</Text>
      }
      else if (meta < 20){
        return <Text>Objetivo fracassado</Text>
      }
    }
  };
  
  const icones = {
    'receita': require('../../assets/seta-verde.png'),
    'despesa': require('../../assets/seta-vermelha.png'),
    'transfer': require('../../assets/transferencia-azul.png')
  }

  const teste = (visible) => {  
    setmodalVisible(visible)
    setShouldShow('')
  };

  const dataFormatada = (dataI)=>{
    let data = new Date(dataI);
    let dataFormatada = (((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()); 
    return <Text>{dataFormatada}</Text>
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
          <Text style={Estilo.tituloHistorico}>Objetivos</Text>
        </View>
      </View>

      <Text style={[Estilo.textoObjAtuais, {paddingLeft:10}]}>Objetivos Atuais</Text>
      
      <ScrollView style={{height:'100%'}}>
        <View style={Estilo.fundoObjeto}>
          {
            Object.keys(listaObjetivos).map(key => {
              return <View key={key}>
                <View>
                  <View style={Estilo.parte3}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                      <TouchableOpacity onPress={() => exibir(key)}>
                        <Text style={Estilo.textoB3}>{listaObjetivos[key].descricao}</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      {shouldShow[key] ? (
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {teste(false)}}
                      >
                        <TouchableOpacity  
                            activeOpacity={1} 
                            onPressOut={() => {teste(false)}}
                         >
                        <View style={Estilo.modalBody}>
                          <Text style={{marginBottom: 5, fontSize: 15, fontWeight:'bold'}}>{listaObjetivos[key].descricao} </Text>
                          <Text style={{marginBottom: 5, fontSize: 15}}>Periodo: </Text>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight: 'bold'}}>{dataFormatada(listaObjetivos[key].dataInicial)}</Text>
                            <Text> à </Text>
                            <Text style={{fontWeight: 'bold', marginBottom: 25 }}>{dataFormatada(listaObjetivos[key].dataFinal)}</Text>
                          </View>
                          <View style={{flexDirection:'column', alignItems: 'center'}}>
                            <Text style={{marginBottom: 5, fontWeight: 'bold'}}>{somaRegistro}/{listaObjetivos[key].valor}</Text>
            
                            <View style={{border: 1, height: 24, width: 297, marginBottom: 10, borderColor: '#000', flexDirection:'row', borderWidth: 3 }}>
                              <View style={{backgroundColor:'red', width:'90%'}}><Text></Text></View>
                              <View style={{backgroundColor:'white', width:'10%'}}><Text></Text></View>
                            </View>
                            <Text style={{marginBottom: 25}}> {limiteD(key)} </Text>
                          </View>
                          <View style={{flexDirection:'row', alignContent: 'space-around', alignItems: 'flex-start'}}>
                            <TouchableOpacity onPressOut={()=>teste(false)} onPress={()=>navigation.navigate('EditarObjetivo', {item:listaObjetivos[key], itemId:key})}>
                              <View style={{flexDirection:'row', alignItems: 'center', marginRight: 20}}>
                                <Image source={require('../../assets/pencil-amarelo.png')} style={Estilo.iconeObj}/>
                                <Text>Editar</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>handleApagar(key)} onPressOut={()=>teste(false)}>
                              <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/x-vermelho.png')} style={Estilo.iconeObj}/>
                                <Text>Excluir</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                        </TouchableOpacity>
                      </Modal>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>  
            })
          }  
        </View>
      </ScrollView>
      <View style={{width:'100%', alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('NovoObjetivo')}>
          <Image 
            source={require('../../assets/icone-x-branco.png')} 
            style={{width:60, height:60}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}