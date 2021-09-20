import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaView,Text, View, Image, TouchableOpacity} from 'react-native';
import Estilo from '../Estilos/estilos'
import 'react-native-gesture-handler';
import HomeService from '../Services/HomeService';

export default function TelaHome({navigation}){
  
  
  const [saldoT, setSaldo] = useState(0);
  const [saldoCt, setSaldoCt] = useState(0);
  const [saldoCc, setSaldoCc] = useState(0);
  const [saldoR, setSaldoR] = useState(0);
  const [saldoD, setSaldoD] = useState(0);

  useEffect(()=>{
    setSaldo(somaT());
    setSaldoCt(somaCT());
    setSaldoCc(somaCc());
    setSaldoR(somaR());
    setSaldoD(somaD());
  },[]);  

  const somaCT = () =>{
    HomeService.somaCarteira((saldoCt)=>{ setSaldoCt(saldoCt)});
  }

  const somaCc = () =>{
    HomeService.somaConta((saldoCc)=>{setSaldoCc(saldoCc)});
  }

  const somaT = () =>{  
    HomeService.somaTotal(((saldoT)=>{setSaldo(saldoT)}));
  }
  const somaR = () =>{  
    HomeService.somaReceitas(((saldoR)=>{setSaldoR(saldoR)}));
  }
  const somaD = () =>{  
    HomeService.somaDespesas(((saldoD)=>{setSaldoD(saldoD)}));
  }


  return(
    <SafeAreaView style={Estilo.containerHome}>
      <StatusBar backgroundColor="#fff" StatusBarStyle="dark-content"/>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{paddingRight:10}}>          
          <Image source={require('../../assets/menu.png')} style={Estilo.iconeReg}/>
        </TouchableOpacity>
        <Text style={Estilo.exibirTotal}>Saldo total</Text>
        <Text style={Estilo.exibirSaldo}> R$ {saldoT} </Text>
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
                <Text style={Estilo.textoB1}>R$ {saldoCc}</Text>
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
                <Text style={Estilo.textoB1}>R$ {saldoCt}</Text>
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
                <Text style={[Estilo.textoB1, Estilo.texto2B1]}>R$ {saldoR}</Text>
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
                <Text style={[Estilo.textoB1, Estilo.texto2B1]}>R$ {saldoD}</Text>
              </View>
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
}