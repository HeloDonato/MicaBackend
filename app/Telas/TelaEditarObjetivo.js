import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaView,Text, View, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Estilo from '../Estilos/estilos'
import Radio3 from '../Componentes/radio3';
import 'react-native-gesture-handler';
import { Picker } from 'react-native';
import Salvar from '../Componentes/salvar';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import ObjetivoService from '../Services/ObjetivoServise';

const valoresIniciais = {
  valor: '',
  tipo: '1',
  descricao: '',
  dataInicial: new Date(),
  dataFinal: new Date(),
  categoria: 'moradia',
}

export default function TelaNovoObjetivo({route, navigation}){
  const {item, itemId} = route.params;
  const idObjetivo = itemId;  
  const [formValues, setFormValues] = useState(valoresIniciais);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  //debugger
  useEffect(()=>{
    setFormValues({...item, 
                      dataInicial: new Date(item.dataInicial), 
                      dataFinal: new Date(item.dataFinal)
                  });
  }, [item]);

  const setValue = (valor, name) => {
  setFormValues(prevState => ({
      ...prevState,
      [name]: valor
  }))
  }

  const onChangeDI = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShow1(Platform.OS === 'ios');
    setFormValues({...formValues, dataInicial:currentDate});
  };

  const onChangeDF = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShow2(Platform.OS === 'ios');
    setFormValues({...formValues, dataFinal:currentDate});
  };

  const showDatepicker1 = () => {
    setShow1(true);
  };

  const showDatepicker2 = () => {
    setShow2(true);
  };

  const atualizarRegistro = async() => {
    ObjetivoService.atualizar(idObjetivo, formValues)
      .then(()=>{
        navigation.navigate("Objetivos");
      });
  };

  const dataFormatada = (dataI)=>{
    let data = new Date(dataI);
    let dataFormatada = (((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()); 
    return <Text>{dataFormatada}</Text>
  }

  return (
    <SafeAreaView style={[Estilo.container, formValues.tipo == '2' ? {backgroundColor:'#4169E1'} : {backgroundColor: '#D03A31'}]}>
      
      <StatusBar backgroundColor='#fff' StatusBarStyle="dark-content"/> 
      
      <View style={{display: 'flex', flexDirection:'row', alignItems:'center', paddingBottom:30}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:10}}>          
          <Image source={require('../../assets/x-branco.png')} style={Estilo.iconeX}/>
        </TouchableOpacity>
        <Text style={Estilo.textoTitulo}>Alterar objetivo</Text>
      </View>
      
      <ScrollView style={{flex:1}}>        
        <View style={{paddingTop: 10}}>
          <TextInput
            style={Estilo.input2}
            placeholder="Descrição"
            value = {formValues.descricao}
            onChangeText ={(text)=> setFormValues({...formValues, descricao:text})}
          />
        </View>        
        <View style={Estilo.tipoOp}>
            <Text style={Estilo.texto2}>Selecione o tipo de objetivo:</Text>
            <Radio3 valor={formValues.tipo} onChange={(valor)=> setValue(valor, 'tipo')}></Radio3>
        </View>
        <View style={{width: '100%', alignSelf:'center'}}>
          <View style={{alignItems:'center', paddingBottom: 10}}>
            <TextInput
              style={Estilo.input}
              placeholder="Digite o valor..."
              keyboardType="numeric" 
              value = {formValues.valor}
              onChangeText={(text)=> setFormValues({...formValues, valor:text})}
            />
          </View>
          <Text style={[Estilo.texto2, {marginTop: 20, marginBottom:10}]}>Data Inicial:</Text>
          <View>
            <TouchableOpacity onPress={showDatepicker1}>
              <View style={Estilo.searchSection}>
                <Text style={{fontSize: 25}}>
                  {dataFormatada(formValues.dataInicial)}
                </Text>
                <SimpleLineIcons style={Estilo.searchIcon} name="calendar" size={24} color="gray"/>
              </View>
            </TouchableOpacity>
            {show1 && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={formValues.dataInicial}
                  mode='date'
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDI}
                />
              )}
          </View>
          <Text style={[Estilo.texto2, {marginTop: 20, marginBottom:10}]}>Data Final:</Text>
          <View>
            <TouchableOpacity onPress={showDatepicker2}>
              <View style={Estilo.searchSection}>
                <Text style={{fontSize: 25}}>
                  {dataFormatada(formValues.dataFinal)}
                </Text>
                <SimpleLineIcons style={Estilo.searchIcon} name="calendar" size={24} color="gray"/>
              </View>
            </TouchableOpacity>
            {show2 && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={formValues.dataFinal}
                  mode='date'
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDF}
                />
              )}
          </View>
        </View>
        <Text style={[Estilo.texto2, {marginTop:20}]}>Selecione a categoria do objetivo:</Text>
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
        <TouchableOpacity onPress={()=>atualizarRegistro(idObjetivo)}>
          <Salvar></Salvar>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}