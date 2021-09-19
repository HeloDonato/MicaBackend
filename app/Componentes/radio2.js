import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const MyComponent = ({valor, onChange}) => {
	const [checked, setChecked] = React.useState(valor);
	const handleChange = newValue => {
		setChecked(newValue);
		onChange(newValue);
	}	
	React.useEffect(()=>{
		setChecked(valor)
	},[valor]);

	return (
		<View> 
			<View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
				<View style={{flexDirection:'row'}}>
					<RadioButton
						value="1"
						status={ checked === '1' ? 'checked' : 'unchecked' }
						onPress={() => handleChange('1')}
						color='#fff'
						uncheckedColor='#fff'
					/>
					<Text style={styles.texto}>Conta</Text>
				</View>
				<View style={{flexDirection:'row'}}>
					<RadioButton
						value="2"
						status={ checked === '2' ? 'checked' : 'unchecked' }
						onPress={() => handleChange('2')}
						color='#fff'
						uncheckedColor='#fff'
					/>
					<Text style={styles.texto}>Carteira</Text>
				</View>
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
  },
  texto2:{
    color: '#fff',
    fontSize: 24,
    fontWeight:'bold',
    paddingLeft: 10,
  }
});

export default MyComponent;