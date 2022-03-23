import { StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState, useContext } from 'react';

import { ColorContext } from '../context/pigmentContext';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	const { currentColor, setRandomColor, getColorById } = useContext(ColorContext) as ColorContextType;
	useEffect(() => {
		setRandomColor();
	}, []);
  
	const handleRandomColorPress = () => {
		setRandomColor();
  	};

	const matches = (currentColor && currentColor.matches) ? currentColor.matches!.map(match => getColorById(match.id)) as Color[] : [];

	return (
		<View style={styles.container}>
			<View style={[styles.currentColor, {backgroundColor: currentColor.hex}]}>
				<Text>{currentColor.name}</Text>
			</View>
			
			<ScrollView
				style={styles.colorMatches}
				horizontal={true}
				snapToInterval={250}
				decelerationRate="fast"
			>
				{matches.map((item, index) => 
					<View key={index} style={[styles.match, {backgroundColor: item.hex}]}>
						<Text>{item.name}</Text>
					</View>
				)}
			</ScrollView>

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
	minWidth: 250,
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
