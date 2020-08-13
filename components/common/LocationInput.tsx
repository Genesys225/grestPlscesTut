import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import BeText from './BeText';
import BeImg from './BeImg';
import MainButton from './MainButton';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { gMaps } from '../../config/http';

type LocationInputProps = {
	onLocationPicked: Function;
};

const LocationInput = (props: LocationInputProps) => {
	const [isFetching, setIsFetching] = useState(false);
	const [pickedLocation, setPickedLocation] = useState<{
		lat: number;
		lng: number;
	}>();
	const verifyPermission = async () => {
		const permit = await Permissions.askAsync(Permissions.LOCATION);
		if (permit.status !== 'granted') {
			Alert.alert(
				'Permissions error',
				'You must grant location services access to the app.',
				[{ text: 'Okay' }]
			);
			return false;
		}
		return true;
	};

	const pickLocationHandler = async () => {
		setIsFetching(true);
		const hasPermit = verifyPermission();
		if (!hasPermit) {
			return;
		}
		try {
			const location = await Location.getCurrentPositionAsync({
				timeout: 5000,
				enableHighAccuracy: true,
			});
			console.log(location);
			setPickedLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
			console.log(
				gMaps.urlHelper('', {
					center: `${location.coords.longitude},${location.coords.latitude}`,
					zoom: 14,
					size: '400x200',
				})
			);
		} catch (error) {
			console.log(error);
			Alert.alert(
				'Could not get your location',
				'Please try again later or pick a location on the map.',
				[{ text: 'Okay' }]
			);
		}
		setIsFetching(false);
	};

	const mapImageUrl = useMemo(
		() =>
			function() {
				const result = pickedLocation
					? gMaps.urlHelper('', {
							center: `${pickedLocation.lat},${pickedLocation.lng}`,
							zoom: 14,
							size: '400x200',
							mapType: 'roadmap',
							markers: `color:red|label:A|${pickedLocation.lat},${pickedLocation.lng}`,
					  })
					: '';
				console.log(result);
				return result;
			},
		[pickedLocation]
	);

	return (
		<View style={styles.imagePicker}>
			{!pickedLocation ? (
				<BeText containerStyle={styles.imagePreview}>
					No Location
				</BeText>
			) : (
				<BeImg
					style={styles.imagePreview}
					source={{
						uri: mapImageUrl(),
					}}
				/>
			)}
			<MainButton
				style={styles.button}
				title="Take Location"
				onPress={pickLocationHandler}
			/>
		</View>
	);
};

export default LocationInput;

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: 'center',
	},
	imagePreview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
	},
	button: {
		width: '100%',
		marginVertical: 10,
	},
});
