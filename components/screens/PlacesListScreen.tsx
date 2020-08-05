import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import PlaceItem from '../places/PlaceItem';
import { useNavigation } from '@react-navigation/native';
import { PlacesScreenNavigationProp } from '../../navigation/RootStackParamList';

const PlacesListScreen = () => {
	const navigation = useNavigation<PlacesScreenNavigationProp>();
	const places = useSelector((state: RootState) => state.places.places);
	return (
		<FlatList
			data={places}
			renderItem={(itemData) => (
				<PlaceItem
					{...itemData}
					item={{
						...itemData.item,
						address: 'null',
						onSelect: () =>
							navigation.navigate('PlaceDetails', {
								placeTitle: itemData.item.title,
								placeId: itemData.item.id,
							}),
					}}
				/>
			)}
		/>
	);
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
