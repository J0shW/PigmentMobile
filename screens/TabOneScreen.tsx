import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState, useContext } from 'react';

import { ColorContext } from '../context/pigmentContext';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	const { currentColor, setRandomColor, colors } = useContext(ColorContext) as ColorContextType;
	useEffect(() => {
		setRandomColor();
	}, []);
  
	const handleRandomColorPress = () => {
		setRandomColor();
  	};

	return (
		<View style={styles.container}>
			<View style={[styles.currentColor, {backgroundColor: currentColor.hex}]}>
				<Text>{currentColor.name}</Text>
			</View>
			<View style={styles.colorMatches}>
				<View style={[styles.match, {backgroundColor: colors[3].hex}]}>
					<Text>{colors[3].name}</Text>
				</View>
				<View style={[styles.match, {backgroundColor: colors[4].hex}]}>
					<Text>{colors[4].name}</Text>
				</View>
				<View style={[styles.match, {backgroundColor: colors[5].hex}]}>
					<Text>{colors[5].name}</Text>
				</View>
				<View style={[styles.match, {backgroundColor: colors[6].hex}]}>
					<Text>{colors[6].name}</Text>
				</View>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleRandomColorPress}>
				<Text style={{color: 'black'}}>Click for random color</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
	height: '100%'
  },
  currentColor: {
	display: 'flex',
	flexGrow: 1,
	justifyContent: 'center',
	alignItems: 'center'
  },
  colorMatches: {
	display: 'flex',
	flexGrow: 2,
	flexDirection: 'row',
  },
  match: {
	display: 'flex',
	flexGrow: 1,
	height: '100%',
	justifyContent: 'center',
	alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
	  padding: 15,
	  backgroundColor: 'white',
  }
});
