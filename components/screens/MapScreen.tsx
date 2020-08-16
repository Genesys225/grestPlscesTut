import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
	const route = useRoute<MapScreenRouteProp>();

	const gpsPickedLocation = useMemo(
		() => (route.params ? route.params.pickedLocation : undefined),
		[]
	);

	const mapRegion = {
		latitude: gpsPickedLocation ? gpsPickedLocation.latitude : 37.78,
		longitude: gpsPickedLocation ? gpsPickedLocation.longitude : -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const [selectedLocation, setSelectedLocation] = useState<LatLng>({
		latitude: mapRegion.latitude,
		longitude: mapRegion.longitude,
	});

	const navigation = useNavigation<MapScreenNavigationProp>();

	const pickMarkedLocationHandler = useCallback(() => {
		if (!selectedLocation) return;
		navigation.navigate('AddPlace', { pickedLocation: selectedLocation });
	}, [selectedLocation]);

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

	useEffect(() => {
		if (gpsPickedLocation) setSelectedLocation(gpsPickedLocation);
	}, [gpsPickedLocation]);

	const selectLocationHandler = (event: MapEvent<{}>) => {
		setSelectedLocation(event.nativeEvent.coordinate);
	};

	return (
		<MapView
			style={styles.map}
			region={mapRegion}
			onPress={selectLocationHandler}
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
