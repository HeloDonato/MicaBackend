import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const MyComponent = ({valor, onChange}) => {
  const [checked, setChecked] = React.useState(valor);
  const handleChange = newValue => {
    setChecked(newValue);
    onChange(newValue);
  }
  
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'fff'}}>
      <View style={{flexDirection:'row'}}>
        <RadioButton
          value="1"
          status={ checked === '1' ? 'checked' : 'unchecked' }
          onPress={() => handleChange('1')}
          color='#fff'
          uncheckedColor='#fff'
        />
        <Text style={styles.texto}>Receita</Text>
      </View>
        <View style={{flexDirection:'row'}}>
          <RadioButton
            value="2"
            status={ checked === '2' ? 'checked' : 'unchecked' }
            onPress={() => handleChange('2')}
            color='#fff'
            uncheckedColor='#fff'
          />
          <Text style={styles.texto}>Despesas</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <RadioButton
            value="3"
            status={ checked === '3' ? 'checked' : 'unchecked' }
            onPress={() => handleChange('3')}
            color='#fff'
            uncheckedColor='#fff'
          />
          <Text style={styles.texto}>Transf.</Text>
        </View>
    </View>
  );
};
  
const styles = StyleSheet.create({
  texto:{
    color: '#fff',
    fontSize: 18,
    top: 4,
    fontWeight:'bold'
  }
});
  
export default MyComponent;