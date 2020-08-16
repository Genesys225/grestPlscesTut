import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import BeForm from '../common/BeForm';
import { useDispatch } from 'react-redux';
import { addPlace } from '../../store/actions/places';
import { useNavigation } from '@react-navigation/native';
import { AddPlaceScreenNavigationProp } from '../../navigation/RootStackParamList';
import BeImageInput from '../common/BeImageInput';
import LocationInput from '../common/LocationInput';
import { LatLng } from 'react-native-maps';

const NewPlaceScreen = () => {
	const [image, setImage] = useState<string>();
	const [location, setLocation] = useState<LatLng>();
	const navigation = useNavigation<AddPlaceScreenNavigationProp>();
	const dispatch = useDispatch();
	const savePlaceHandler = (values: { [key: string]: string | number }) => {
		dispatch(
			addPlace(
				values.title as string,
				image as string,
				location?.latitude as number,
				location?.longitude as number
			)
		);
		navigation.goBack();
	};

	const setImageHandler = useCallback((image: string) => {
		setImage(image);
	}, []);
	const setLocationHandler = useCallback((location: LatLng) => {
		setLocation(location);
	}, []);

	return (
		<BeForm
			inputFields={['title']}
			onSubmit={savePlaceHandler}
			confirmText="NEW PLACE"
			actionsTextStyle={styles.submitTextStyle}
		>
			<BeImageInput onImagePicked={setImageHandler} />
			<LocationInput onLocationPicked={setLocationHandler} />
		</BeForm>
	);
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
	submitTextStyle: {
		fontSize: 16,
	},
});
