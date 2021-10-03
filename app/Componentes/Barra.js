import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const MyComponent = (props) => {

    const [progress, setProgress] = React.useState(0);
    let term = progress - 100;
    
	React.useEffect(()=>{
	},[props]);	

    const barraD = ()=>{
        let term = (props.valor/props.valor2) * 100
            if (term > 100)
                term = 100;
        let wid = JSON.stringify(term) + '%'
        console.log (term, wid)
    
        if (props.valor3 == '1'){
            if(term < 80)
                return <View style={{backgroundColor:'green', width:`${wid}`}}><Text></Text></View>        
            else if (term >= 80)
                return <View style={{backgroundColor:'red', width:`${wid}`}}><Text></Text></View>        
        }else if (props.valor3 == '2'){
            if(term < 80)
                return <View style={{backgroundColor:'red', width:`${wid}`}}><Text></Text></View>        
            else if (term >= 80)
                return <View style={{backgroundColor:'green', width:`${wid}`}}><Text></Text></View>        
        }
    
    }
    
      const barraF = ()=>{
        let term = (props.valor/props.valor2) * 100
            if(term > 100)
                term = 100;
        
        let aux = 100 - term;
        let wid = JSON.stringify(aux) + '%'
        console.log (term, wid)
        return <View style={{backgroundColor:'white', width:`${wid}`}}><Text></Text></View>
      }


	return (
        <View style={{border: 1, height: 24, width: 297, marginBottom: 10, borderColor: '#000', flexDirection:'row', borderWidth: 3 }}>
              {barraD()}
              {barraF()}
		</View>
  );
};


const estilos=StyleSheet.create({
  botao:{
    alignItems:"center",
    padding:10,
    paddingTop: 40
  },
  texto:{
    color: '#fff',
    fontSize: 24,
    fontWeight:'bold'
  }
});


export default MyComponent;