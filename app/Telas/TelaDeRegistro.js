import {StatusBar} from 'expo-status-bar'
import React, {useState } from 'react'
import {Text,Picker, View, Modal, Image, SafeAreaView, Pressable, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Estilo from '../Estilos/estilos'
import Radio from '../Componentes/radio';
import Radio2 from '../Componentes/radio2';
import Salvar from '../Componentes/salvar';
import 'react-native-gesture-handler';
import RegistroService from '../Services/RegistroService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

const valoresIniciais = {
  valor: '',
  tipo: '1',
  descricao: '',
  data: new Date(),
  destino: '0',
  categoria: 'moradia',
  urlImagem: ''
}


export default function TelaCamera({navigation}){

  const [formValues, setFormValues] = useState(valoresIniciais);
  const [show, setShow] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  let data = formValues.data
  let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 

  const setValue = (valor, name) => {
    setFormValues(prevState => ({
      ...prevState,
      [name]: valor
    }))
  }
  
  const adicionarTarefa = async() => {
    let url;
    if(image != null){
      url = await RegistroService.uploadImagem(image);
    }else{
      url = '';
    }
    
    RegistroService.adicionar({...formValues, urlImagem: url});
    setFormValues({...formValues, 
      ...valoresIniciais});
    setImage(null);
    navigation.navigate("Historico");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setFormValues({...formValues, data:currentDate});
    setDataSelecionada(true);
  };

  const showDatepicker = () => {
    setShow(true);
  };
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    setModalVisible(!modalVisible)
  }

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    setModalVisible(!modalVisible)
  }
  
  return (
    <View style={[Estilo.containerViewCamera]}>
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
              onChangeText={(text)=> setFormValues({...formValues, valor:text})}
            />
          </View>     
          <View style={Estilo.tipoOp}>
            <Radio valor="1" onChange={(valor)=> setValue(valor, 'tipo')}></Radio>
          </View>
          <View style={{width: '100%', alignSelf:'center'}}>
            <View style={{alignItems:'center', paddingBottom: 10}}>
              <TextInput
                style={Estilo.input2}
                placeholder="Descrição"
                value = {formValues.descricao}
                onChangeText ={(text)=> setFormValues({...formValues, descricao:text})}
              />
            </View>
            <View>
              <TouchableOpacity onPress={showDatepicker}>
                <View style={Estilo.searchSection}>
                  <Text style={{fontSize: 25}}>
                    {dataSelecionada ? dataFormatada : <Text style={{color: 'grey'}}>Data</Text>}
                  </Text>
                  <SimpleLineIcons style={Estilo.searchIcon} name="calendar" size={24} color="gray"/>
                </View>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={formValues.data}
                  mode='date'
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={{paddingBottom: 20}}>
              <Text style={Estilo.texto2}>Selecione a categoria do registro:</Text>
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
          <View>
            <Text style={Estilo.texto2}> {formValues.tipo == '2' ? "De onde está saindo o dinheiro?" : "Para onde vai o dinheiro?"}</Text>
          </View>
          <View style={{ width: '100%'}}>
            <Radio2 onChange={(valor)=> setValue(valor, 'destino')}></Radio2>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: 40,
                marginTop: 10
              }}
            >
              <Image source={require('../../assets/camera.png')} style={{width: 40, height:30}}/>
              <Text style={Estilo.texto2}> Anexar comprovante</Text>
            </TouchableOpacity>
            
            <View style={Estilo.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={Estilo.centeredView}>
                  <View style={Estilo.modalView}>
                    <View style={{alignItems:'flex-end'}}>
                      <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <AntDesign name="closecircle" size={24} color="black" />
                      </Pressable>
                    </View>
                    <View style={{alignItems: 'flex-start',}}>
                      <TouchableOpacity
                        style={Estilo.button}
                        onPress={pickImage}
                      >
                        <Text style={Estilo.modalTextStyle}>Escolher da galeria</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={Estilo.button}
                        onPress={takePicture}
                      >
                        <Text style={Estilo.modalTextStyle}>Tirar foto</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            
            <View style={{alignItems:'center', width: '100%'}}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
          </View>
          <TouchableOpacity onPress={() => adicionarTarefa()}>
            <Salvar/>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}