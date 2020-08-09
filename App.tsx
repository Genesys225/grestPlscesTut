import React from 'react';
import { StyleSheet } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './store/configureStore';
export default function App() {
	const [loaded] = useFonts({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});

	if (!loaded) {
		return null;
	}
	return (
		<Provider store={store}>
			<PlacesNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
