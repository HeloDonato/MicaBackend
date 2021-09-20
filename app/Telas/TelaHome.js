import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaView,Text, View, Image, TouchableOpacity} from 'react-native';
import Estilo from '../Estilos/estilos'
import 'react-native-gesture-handler';
import HomeService from '../Services/HomeService';

export default function TelaHome({navigation}){
  const [soma, setSoma] = useState(0);
  useEffect(()=>{
    setSoma(somaT());
    somaCT();
    somaCc();
  },[]);  
  const somaCT = () =>{
    HomeService.somaCarteira();
  }
  const somaCc = () =>{
    HomeService.somaConta();
  }
  const somaT = () =>{  
    console.log(soma)
   HomeService.somaTotal();
  }

  return(
    <SafeAreaView style={Estilo.containerHome}>
      <StatusBar backgroundColor="#fff" StatusBarStyle="dark-content"/>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{paddingRight:10}}>          
          <Image source={require('../../assets/menu.png')} style={Estilo.iconeReg}/>
        </TouchableOpacity>
        <Text style={Estilo.exibirTotal}>Saldo total</Text>
        <Text style={Estilo.exibirSaldo}> R$ 100 </Text>
      </View>
      <View style={Estilo.areaInfo}>
          <View style={Estilo.bloco1}>
            <View style={Estilo.parte1}>
              <View style={Estilo.Item1B1}>
                <Image source={require('../../assets/banco-amarelo.png')} style={Estilo.iconesB1}/>
                <View>
                  <Text style={Estilo.textoB1}>Saldo em conta</Text>
                </View>
              </View>
              <View>
                <Text style={Estilo.textoB1}>R$ 70,00</Text>
              </View>
            </View>

            <View style={Estilo.linha}/>

            <View style={Estilo.parte1}>
              <View style={Estilo.Item1B1}>
                <Image source={require('../../assets/carteira-marrom.png')} style={Estilo.iconesB1}/>
                <View>
                  <Text style={Estilo.textoB1}>Carteira</Text>
                </View>
              </View>
              <View>
                <Text style={Estilo.textoB1}>R$ 30,00</Text>
              </View>
            </View>
          </View>
          
          <View style={Estilo.bloco2}>
            <View>
              <Text style={Estilo.textoB2}>Transações do mês</Text>
            </View>
            <View style={Estilo.parte1}>
              <View style={Estilo.Item1B1}>
                <Image source={require('../../assets/seta-verde.png')} style={Estilo.iconesB1}/>
                <View>
                  <Text style={Estilo.textoB1}>Receitas</Text>
                </View>
              </View>
              <View>
                <Text style={[Estilo.textoB1, Estilo.texto2B1]}>R$ 140,00</Text>
              </View>
            </View>
            
            <View style={Estilo.linha}/>
            
            <View style={Estilo.parte1}>
              <View style={Estilo.Item1B1}>
                <Image source={require('../../assets/seta-vermelha.png')} style={Estilo.iconesB1}/>
                <View>
                  <Text style={Estilo.textoB1}>Despesas</Text>
                </View>
              </View>
              <View>
                <Text style={[Estilo.textoB1, Estilo.texto2B1]}>R$ 40,00</Text>
              </View>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}