import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import BeText from './BeText';
import BeImg from './BeImg';
import MainButton from './MainButton';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { gMaps } from '../../config/http';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';
import { AddPlaceScreenNavigationProp } from '../../navigation/RootStackParamList';
type LocationInputProps = {
	onLocationPicked: Function;
};

const LocationInput = (props: LocationInputProps) => {
	const navigation = useNavigation<AddPlaceScreenNavigationProp>();
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

	const pickOnMapHandler = () => {
		navigation.navigate('Map', {});
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
			{!pickedLocation && !isFetching ? (
				<BeText containerStyle={styles.imagePreview}>
					No Location
				</BeText>
			) : isFetching ? (
				<ActivityIndicator size="large" style={styles.imagePreview} />
			) : (
				<Ripple
					onPress={pickOnMapHandler}
					style={styles.imgFeedbackContainer}
				>
					<BeImg
						style={styles.imagePreview}
						source={{
							uri: mapImageUrl(),
						}}
					/>
				</Ripple>
			)}
			<View style={styles.buttonsContainer}>
				<MainButton
					style={styles.button}
					title="Take Location"
					textStyle={styles.buttonText}
					onPress={pickLocationHandler}
				/>
				<MainButton
					style={styles.button}
					title="Pick on  Map"
					onPress={pickOnMapHandler}
					textStyle={styles.buttonText}
				/>
			</View>
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
		height: 170,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
	},
	imgFeedbackContainer: { width: '100%' },
	button: {
		marginVertical: 10,
	},
	buttonText: {
		fontSize: 16,
	},
	buttonsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
		justifyContent: 'space-between',
	},
});
