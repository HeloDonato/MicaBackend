import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaView,Text, View, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Estilo from '../Estilos/estilos'
import Radio from '../Componentes/radio';
import Radio2 from '../Componentes/radio2';
import Salvar from '../Componentes/salvar';
import 'react-native-gesture-handler';
import { Picker } from 'react-native';
import RegistroService from '../Services/RegistroService';


export default function TelaDeRegistro({route,navigation}){
  const [formValues, setFormValues] = useState({
    valor: '',
    tipo: '',
    descricao: '',
    data: '',
    destino: '',
    categoria: ''
  });
  const [selectedCategoria, setSelectedCategoria] = useState();

  const {itemId} = route.params;

  const setValue = (valor, name) => {
    setFormValues(prevState => ({
      ...prevState,
      [name]: valor
    }))
  }
  
  const atualizarRegistro = () => {
    let id = itemId[0];
    console.log(id);
    RegistroService.atualizar(id, formValues);
  };

  return (
    <SafeAreaView style={[Estilo.container, formValues.tipo == '2' ? {backgroundColor:'#D03A31'} : {backgroundColor: '#4169E1'}]}>
      
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
            onChangeText={(text)=> setFormValues({...formValues, valor:text})}
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
              onChangeText={(text)=> setFormValues({...formValues, descricao:text})}
              value={formValues.descricao}
            />
          </View>
          <View style={{alignItems:'center', paddingBottom: 10}}>
            <TextInput
              style={Estilo.input2}
              placeholder="Data"
              keyboardType="numeric"
              value = {formValues.data}
            />
          </View>
          <View style={{paddingBottom: 20}}>
            <Text style={Estilo.texto2}>Selecione a categoria do objetivo:</Text>
            <View style={Estilo.seletor}>
              <Picker
                selectedValue={formValues.categoria}
                onValueChange={(itemValue, itemIndex) =>
                  setFormValues({...formValues, categoria:itemValue})
                }>
                <Picker.Item label="Moradia" value="moradia"/>
                    <Picker.Item label="Telefone" value="telefone"/>
                    <Picker.Item label="Internet" value="internet"/>
                    <Picker.Item label="Transporte" value="transporte"/>
                    <Picker.Item label="Beleza" value="beleza"/>
                    <Picker.Item label="Supermercado" value="supermercado"/>
                    <Picker.Item label="Lanches" value="lanches"/>
                    <Picker.Item label="Salário" value="salario"/>
                    <Picker.Item label="Saúde" value="saude"/>
                    <Picker.Item label="Lazer" value="lazer"/>
                    <Picker.Item label="Outro" value="outro"/>
              </Picker>
            </View>
          </View>
        </View>
        <View> <Text>{itemId} </Text> </View>

        <View>
          <Text style={Estilo.texto2}> {formValues.tipo == '2' ? "Para onde vai o dinheiro?" : "De onde está vindo o dinheiro?"}</Text>
        </View>
        <View style={{ width: '100%'}}>
          <Radio2 onChange={(valor)=> setValue(valor, 'destino')}></Radio2>
          <TouchableOpacity onPress={atualizarRegistro(itemId)}>
            <Salvar></Salvar>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}