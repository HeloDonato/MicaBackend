import {StatusBar} from 'expo-status-bar'
import React, {useState } from 'react'
import {StyleSheet, Text,Picker, Modal, Pressable, View, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Estilo from '../Estilos/estilos'
import Radio from '../Componentes/radio';
import Radio2 from '../Componentes/radio2';
import Salvar from '../Componentes/salvar';
import 'react-native-gesture-handler';
import RegistroService from '../Services/RegistroService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';


const valoresIniciais = {
  valor: '',
  tipo: '1',
  descricao: '',
  dataInicial: new Date(),
  dataFinal: new Date(),
  categoria: 'moradia',
  urlImagem: ''
}

export default function TelaEditarRegistro({route, navigation}){
  const {item, itemId} = route.params;
  const idRegistro = itemId;
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formValues, setFormValues] = useState(valoresIniciais);

  useEffect(()=>{
    setFormValues({...item,
                  data: new Date(item.data),
                });
  }, [item]);
  
  const setValue = (valor, name) => {
    setFormValues(prevState => ({
      ...prevState,
      [name]: valor
    }))
  }

  const atualizarRegistro = async() => { 
    let url = null;
    if(image != null){
      url = await RegistroService.uploadImagem(image);
    }else{
     if (formValues.urlImagem != '' )
        url = formValues.urlImagem
      else  
        url = '';
    };
    RegistroService.atualizar(idRegistro, {...formValues, urlImagem: url})
      .then(()=>{
        setFormValues({...formValues, ...valoresIniciais});
        setImage(null);
        navigation.navigate("Historico");
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setFormValues({...formValues, data:currentDate});
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const showImagem = () => {
    if(formValues.urlImagem != '') {
      const url = selecionarImagem();
      return url;
    }else{
      return false;
    }
  };

  const selecionarImagem = ()=>{
    let url;
    if(image){
      url = image
    }else{
      url = formValues.urlImagem
    }
    return url;
  }

  const url = showImagem();

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

  const dataFormatada = (dataI)=>{
    let data = new Date(dataI);
    let dataFormatada = (((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()); 
    return <Text>{dataFormatada}</Text>
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={[Estilo.container, formValues.tipo == '2' ? {backgroundColor:'#D03A31'} : {backgroundColor: '#4FC99A'}]}>
        <StatusBar backgroundColor='#fff' StatusBarStyle="dark-content"/> 
        <View style={{display: 'flex', flexDirection:'row', alignItems:'center', paddingBottom:30}}>
          <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:10}}>          
            <Image source={require('../../assets/x-branco.png')} style={Estilo.iconeX}/>
          </TouchableOpacity>
          <Text style={Estilo.textoTitulo}>Nova opera????o</Text>
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
            <Radio valor={formValues.tipo} onChange={(valor)=> setValue(valor, 'tipo')}></Radio>
          </View>
          <View style={{width: '100%', alignSelf:'center'}}>
            <View style={{alignItems:'center', paddingBottom: 10}}>
              <TextInput
                style={Estilo.input2}
                placeholder="Descri????o"
                value = {formValues.descricao}
                onChangeText ={(text)=> setFormValues({...formValues, descricao:text})}
              />
            </View>
            <View>
              <TouchableOpacity onPress={showDatepicker}>
                <View style={Estilo.searchSection}>
                  <Text style={{fontSize: 25}}>
                    {dataFormatada(formValues.data)}
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
                  <Picker.Item label="Sal??rio" value="salario"/>
                  <Picker.Item label="Sa??de" value="saude"/>
                  <Picker.Item label="Lazer" value="lazer"/>
                  <Picker.Item label="Outro" value="outro"/>
                </Picker>
              </View>
            </View>
          </View>
          <View>
            <Text style={Estilo.texto2}> {formValues.tipo == '2' ? "De onde est?? saindo o dinheiro?" : "Para onde vai o dinheiro?"}</Text>
          </View>
          <View style={{ width: '100%'}}>
            <Radio2 valor={item.destino} onChange={(valor)=> setValue(valor, 'destino')}></Radio2>
            <TouchableOpacity
              onPress={()=>setModalVisible(!modalVisible)}
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
          </View>
          <View style={{alignItems:'center', width: '100%'}}>
              { url ? 
                <Image source={{ uri: url }} style={{ width: 200, height: 200 }} /> :
                <View></View>
              }
          </View>
          <TouchableOpacity onPress={() => {atualizarRegistro(idRegistro)}}>
            <Salvar/>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})