import {StatusBar} from 'expo-status-bar'
import React, {useState } from 'react'
import {StyleSheet, Text,Picker, View, Alert, Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView, ImageBackground} from 'react-native'
import {Camera} from 'expo-camera';
import Estilo from '../Estilos/estilos'
import Radio from '../Componentes/radio';
import Radio2 from '../Componentes/radio2';
import Salvar from '../Componentes/salvar';
import 'react-native-gesture-handler';
import RegistroService from '../Services/RegistroService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { useEffect } from 'react';

let camera = Camera
export default function TelaEditarRegistro({route, navigation}){
  const {item, itemId} = route.params;
  item.data = new Date(item.data);
  const idRegistro = itemId;

  const [formValues, setFormValues] = useState({
    valor: '',
    tipo: '1',
    descricao: '',
    data: new Date(),
    destino: '0',
    categoria: '',
  });
  debugger;
  const [dataFormatada, setDataFormatada] = useState('');
  //let data = formValues.data
  //let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 
  
  useEffect(()=>{
    setFormValues({...item});
    let data = item.data
    setDataFormatada(((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()); 
  }, [item]);
  

  const setValue = (valor, name) => {
    setFormValues(prevState => ({
      ...prevState,
      [name]: valor
    }))
  }

  const atualizarRegistro = () => {
    RegistroService.atualizar(idRegistro, formValues)
      .then(()=>{
        navigation.navigate("Historico");
      });
  };

  /*const adicionarTarefa = () => {
    RegistroService.adicionar(formValues).then(()=>{
      navigation.navigate("Historico");
    })
    setFormValues({...formValues, 
      valor:'', 
      tipo: '1', 
      descricao: '',
      data: new Date(),
      destino: '0',
      categoria: ''});
  };*/

  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setFormValues({...formValues, data:currentDate});
    setDataSelecionada(true);
    //console.log(selectedDate);
  };

  const [dataSelecionada, setDataSelecionada] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };
  
  const [startCamera, setStartCamera] = React.useState(false)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  
  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }
  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }
  const __savePhoto = () => {
    setStartCamera(false);
  }
  const __closePhoto = () =>{
    setStartCamera(false);
  }
  const __retakePicture = () => {   
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
              <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
            ) : (
              <Camera
                type={cameraType}
                style={{flex: 1}}
                ref={(r) => {
                  camera = r
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                  }}
                >
                  <View
                      style={{
                      position: 'absolute',
                      bottom: 0,
                      flexDirection: 'row',
                      flex: 1,
                      padding: 20,  
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <View style={{width: '10%'}}>
                    <TouchableOpacity
                      onPress={__switchCamera}
                      style={{
                      borderRadius: 20,
                      height: 25,
                      width: 25
                      }}
                    >
                        <Image source={require('../../assets/girar-camera.png')} style={{width:30, height:30, borderRadius:10}}/>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        alignSelf: 'center',
                        flex: 1,
                        alignItems: 'center',
                        width: '80%',
                        
                      }}
                    >
                      <TouchableOpacity
                        onPress={__takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          borderRadius: 50,
                          backgroundColor: '#fff'
                        }}
                      />
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={__closePhoto}
                        style={{
                          alignItems: 'center',
                          width: '100%'
                        }}
                      >
                          <Text style={{fontSize: 20, color: '#fff'}}>Sair</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Camera>
            )}
        </View>  
      ) : (
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
              <Radio valor={formValues.tipo} onChange={(valor)=> setValue(valor, 'tipo')}></Radio>
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
                      {dataFormatada}
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
              <Text style={Estilo.texto2}> {formValues.tipo == '2' ? "Para onde vai o dinheiro?" : "De onde está vindo o dinheiro?"}</Text>
            </View>
            <View style={{ width: '100%'}}>
              <Radio2 value={formValues.destino} onChange={(valor)=> setValue(valor, 'destino')}></Radio2>
              <TouchableOpacity
                onPress={__startCamera}
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
            </View>
            <TouchableOpacity onPress={() => {atualizarRegistro(idRegistro)}}>
              <Salvar/>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
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
const CameraPreview = ({photo, retakePicture, savePhoto}) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,
                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text style={{color: '#fff',fontSize: 20 }}>Nova</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,
                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text style={{color: '#fff',fontSize: 20 }}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

