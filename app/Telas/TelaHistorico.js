import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { SafeAreaView,Text, View, Image, TouchableOpacity} from 'react-native';
import Estilo from '../Estilos/estilos'
import 'react-native-gesture-handler';
import HistoricoService from '../Services/HistoricoServise';


export default function TelaHome({navigation}){
  const [shouldShow, setShouldShow] = useState({});
  const [historico, setHistorico] = React
  .useState(HistoricoService.getHistorico());

  const exibir = (indice)=>{
    let temp = {...shouldShow}
    temp[indice] = !temp[indice]
    setShouldShow(temp)
  }
  const icones = {
    'receita': require('../../assets/seta-verde.png'),
    'despesa': require('../../assets/seta-vermelha.png'),
    'transfer': require('../../assets/transferencia-azul.png')
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
        <View style={Estilo.fundoHistorico}>
          {
            historico.map( (item, indice) => {
              return <View key={indice}>
                <View>
                  <View style={Estilo.parte2}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <TouchableOpacity onPress={() => exibir(indice)}>
                        <Image source={icones[item.tipo]} style={Estilo.iconeReg}/>
                      </TouchableOpacity>
                      <Text style={[Estilo.textoB1, {marginLeft:10}]}>{item.desc}</Text>
                    </View>
                    <View style={{width:'30%'}}>
                      <Text style={Estilo.textoB1}>R$ {item.valor}</Text>
                    </View>
                  </View>
                  <View>
                    {shouldShow[indice] ? (
                      <View style={Estilo.infoHistorico}>
                        <TouchableOpacity onPress={()=>navigation.navigate('NovoRegistro')}>
                          <View style={Estilo.partesInfoHistorico}>
                            <Image source={require('../../assets/pencil-amarelo.png')} style={Estilo.iconeReg}/>
                            <Text style={[Estilo.textoB1, {marginLeft:10}]}>Editar</Text>
                          </View>
                        </TouchableOpacity>
                        <View style={Estilo.partesInfoHistorico}>
                          <Image source={require('../../assets/x-vermelho.png')} style={Estilo.iconeReg}/>
                          <Text style={[Estilo.textoB1, {marginLeft:10}]}>Excluir</Text>
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
      </View>    
    </SafeAreaView>
  )
}
