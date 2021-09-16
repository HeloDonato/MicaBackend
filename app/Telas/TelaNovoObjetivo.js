import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { SafeAreaView,Text, View, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Estilo from '../Estilos/estilos'
import Radio3 from '../Componentes/radio3';
import 'react-native-gesture-handler';
import { Picker } from 'react-native';
import Salvar from '../Componentes/salvar';

export default function TelaDeRegistro({navigation}){
  const [formValues, setState] = useState({
    valor: '0',
    tipo: '0',
    descricao: '',
    dataIni: '',
    dataFim: '',
  });

  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleChange = (env, name) => {
    const valor = env.target.value;
    setValue(valor, name)
  }

  const setValue = (valor, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: valor
    }))
  }
  
  return (
    <SafeAreaView style={[Estilo.container, formValues.tipo == '2' ? {backgroundColor:'#D03A31'} : {backgroundColor: '#4169E1'}]}>
      
      <StatusBar backgroundColor='#fff' StatusBarStyle="dark-content"/> 
      
      <View style={{display: 'flex', flexDirection:'row', alignItems:'center', paddingBottom:30}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:10}}>          
          <Image source={require('../../assets/x-branco.png')} style={Estilo.iconeX}/>
        </TouchableOpacity>
        <Text style={Estilo.textoTitulo}>Novo objetivo</Text>
      </View>

      <ScrollView style={{flex:1}}>        
        <View style={{paddingTop: 10}}>
          <TextInput
            style={[Estilo.input2, {fontSize:20}]}
            placeholder="Descrição"
            onChange={(env)=> handleChange(env, 'descricao') }
          />
        </View>        
        <View style={Estilo.tipoOp}>
            <Text style={Estilo.texto2}>Selecione o tipo de objetivo:</Text>
            <Radio3 onChange={(valor)=> setValue(valor, 'tipo')}></Radio3>
        </View>
        <View style={{width: '100%', alignSelf:'center'}}>
          <View style={{alignItems:'center', paddingBottom: 10}}>
            <TextInput
              style={[Estilo.input2, {fontSize:20}]}
              placeholder="Digite o valor"
              onChange={(env)=> handleChange(env, 'valor')}
              keyboardType='numeric'
            />
          </View>
          <Text style={[Estilo.texto2, {marginTop: 20, marginBottom:10}]}>Selecione o período:</Text>
          <View style={{alignItems:'center', paddingBottom: 20, flexDirection:'row', justifyContent:'space-between'}}>
            <TextInput
              style={Estilo.input3}
              placeholder="Data Inicial"
              keyboardType="numeric"
              onChange={(env)=> handleChange(env, 'dataIni')}
            />
            <Text style={Estilo.texto2}>à</Text>
            <TextInput
              style={Estilo.input3}
              placeholder="Data Final"
              keyboardType="numeric"
              onChange={(env)=> handleChange(env, 'dataFim')}
            />
          </View>
        </View>
        <Text style={Estilo.texto2}>Selecione a categoria do objetivo:</Text>
        <View style={Estilo.seletor}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Beleza" value="beleza" />
            <Picker.Item label="Academia" value="academia" />
            <Picker.Item label="Salário" value="salario" />
            <Picker.Item label="Saúde" value="saude" />
            <Picker.Item label="Lazer" value="lazer" />
            <Picker.Item label="Aluguel" value="aluguel" />
          </Picker>
        </View>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Salvar></Salvar>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}