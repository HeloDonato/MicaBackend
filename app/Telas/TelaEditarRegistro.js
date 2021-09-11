import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { SafeAreaView,Text, View, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Estilo from '../Estilos/estilos'
import Radio from '../Componentes/radio';
import Radio2 from '../Componentes/radio2';
import Salvar from '../Componentes/salvar';
import 'react-native-gesture-handler';
import { Picker } from 'react-native';

export default function TelaDeRegistro({navigation}){
  const [formValues, setState] = useState({
    valor: '300,00',
    tipo: '3',
    descricao: 'Conta de luz',
    data: '30/05/2021',
    destino: '1'
  });

  const [selectedCategoria, setSelectedCategoria] = useState();

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
    <SafeAreaView style={[Estilo.container, formValues.tipo == '2' ? {backgroundColor:'#D03A31'} : {backgroundColor: '#4FC99A'}]}>
      
      <StatusBar backgroundColor='#fff' StatusBarStyle="dark-content"/> 
      
      <View style={{display: 'flex', flexDirection:'row', alignItems:'center', paddingBottom:30}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:10}}>          
          <Image source={require('../../assets/x-branco.png')} style={Estilo.iconeX}/>
        </TouchableOpacity>
        <Text style={Estilo.textoTitulo}>Nova operação</Text>
      </View>

      <ScrollView style={{flex:1}}>        
        <View style={{paddingTop: 20}}>
          <TextInput
            style={Estilo.input}
            placeholder="Digite o valor..."
            keyboardType="numeric" 
            value = {formValues.valor}
            onChange={(env)=> handleChange(env, 'valor') }
          />
        </View>        
        <View style={Estilo.tipoOp}>
          <Radio onChange={(valor)=> setValue(valor, 'tipo')}></Radio>
        </View>
        <View style={{width: '100%', alignSelf:'center'}}>
          <View style={{alignItems:'center', paddingBottom: 10}}>
            <TextInput
              style={Estilo.input2}
              placeholder="Descrição"
              onChange={(env)=> handleChange(env, 'descricao')}
              value={formValues.descricao}
            />
          </View>
          <View style={{alignItems:'center', paddingBottom: 10}}>
            <TextInput
              style={Estilo.input2}
              placeholder="Data"
              keyboardType="numeric"
              onChange={(env)=> handleChange(env, 'data')}
              value = {formValues.data}
            />
          </View>
          <View style={{paddingBottom: 20}}>
            <Text style={Estilo.texto2}>Selecione a categoria do objetivo:</Text>
            <View style={Estilo.seletor}>
              <Picker
                selectedValue={selectedCategoria}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategoria(itemValue)
                }>
                <Picker.Item label="Beleza" value="beleza" />
                <Picker.Item label="Academia" value="academia" />
                <Picker.Item label="Salário" value="salario" />
                <Picker.Item label="Saúde" value="saude" />
                <Picker.Item label="Lazer" value="lazer" />
                <Picker.Item label="Aluguel" value="aluguel" />
                <Picker.Item label="Despesas mensais" value="desMensal" />
              </Picker>
            </View>
          </View>
        </View>
        <View>
          <Text style={Estilo.texto2}> {formValues.tipo == '2' ? "Para onde vai o dinheiro?" : "De onde está vindo o dinheiro?"}</Text>
        </View>
        <View style={{ width: '100%'}}>
          <Radio2 onChange={(valor)=> setValue(valor, 'destino')}></Radio2>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Salvar></Salvar>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}