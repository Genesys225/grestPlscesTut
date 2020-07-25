import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BeForm from '../common/BeForm';
import { useDispatch } from 'react-redux';
import { addPlace } from '../../store/actions/places';
import { useNavigation } from '@react-navigation/native';
import { AddPlaceScreenNavigationProp } from '../../navigation/RootStackParamList';

const NewPlaceScreen = () => {
	const navigation = useNavigation<AddPlaceScreenNavigationProp>();
	const dispatch = useDispatch();
	const savePlaceHandler = (values: { [key: string]: string | number }) => {
		dispatch(addPlace(values.title as string));
		navigation.goBack();
	};
	return (
		<BeForm
			inputFields={['title']}
			onSubmit={savePlaceHandler}
			confirmText="NEW PLACE"
		/>
	);
};

export default NewPlaceScreen;

const styles = StyleSheet.create({});