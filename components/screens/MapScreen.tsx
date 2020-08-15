import React, { useState, useCallback } from 'react';
import { StyleSheet, Platform } from 'react-native';
import MapView, { MapEvent, Marker, LatLng } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	MapScreenRouteProp,
	MapScreenNavigationProp,
} from '../../navigation/RootStackParamList';
import MainButton from '../common/MainButton';
import { headerButtonDefaultProps } from '../../navigation/headerButtonsDefaultProps';

const MapScreen = () => {
	const mapRegion = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};
	const [selectedLocation, setSelectedLocation] = useState<LatLng>({
		latitude: mapRegion.latitude,
		longitude: mapRegion.longitude,
	});
	const navigation = useNavigation<MapScreenNavigationProp>();

	navigation.setOptions({
		headerRight: () => (
			<MainButton
				onPress={pickMarkedLocationHandler}
				iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
				style={styles.navBtn}
				{...headerButtonDefaultProps}
			/>
		),
	});

	const selectLocationHandler = (event: MapEvent<{}>) => {
		setSelectedLocation(event.nativeEvent.coordinate);
	};

	const pickMarkedLocationHandler = useCallback(() => {
		if (!selectedLocation) return;
		navigation.navigate('AddPlace', { pickedLocation: selectedLocation });
	}, [selectedLocation]);

	return (
		<MapView
			onPress={selectLocationHandler}
			style={styles.map}
			region={mapRegion}
		>
			<Marker title="Picked Location" coordinate={selectedLocation} />
		</MapView>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	navBtn: {
		elevation: 0,
		shadowOpacity: 0,
	},
});
