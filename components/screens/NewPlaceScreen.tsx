import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BeForm from '../common/BeForm';
import { useDispatch } from 'react-redux';
import { addPlace } from '../../store/actions/places';
import { useNavigation } from '@react-navigation/native';
import { AddPlaceScreenNavigationProp } from '../../navigation/RootStackParamList';
import BeImageInput from '../common/BeImageInput';
import LocationInput from '../common/LocationInput';

const NewPlaceScreen = () => {
	const [image, setImage] = useState<string>();
	const navigation = useNavigation<AddPlaceScreenNavigationProp>();
	const dispatch = useDispatch();
	const savePlaceHandler = (values: { [key: string]: string | number }) => {
		dispatch(addPlace(values.title as string, image as string));
		navigation.goBack();
	};
	return (
		<BeForm
			inputFields={['title']}
			onSubmit={savePlaceHandler}
			confirmText="NEW PLACE"
		>
			<BeImageInput onImagePicked={setImage} />
			<LocationInput onLocationPicked={() => {}} />
		</BeForm>
	);
};

export default NewPlaceScreen;

const styles = StyleSheet.create({});
