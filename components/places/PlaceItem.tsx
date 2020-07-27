import React from 'react';
import { StyleSheet, View, Image, ListRenderItem } from 'react-native';
import MainButton from '../common/MainButton';
import Place from '../../models/place';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BeText from '../common/BeText';

interface PlaceItem extends Place {
	onSelect: () => any;
	imageUri: string;
	address: string;
}

const PlaceItem: ListRenderItem<PlaceItem> = (itemData) => {
	return (
		<MainButton
			style={styles.placeItem}
			onPress={itemData.item.onSelect}
			feedbackType="ripple"
		>
			<Image
				style={styles.img}
				source={{ uri: itemData.item.imageUri }}
			/>
			<View style={styles.cardBody}>
				<BeText style={styles.title}>{itemData.item.title}</BeText>
				<BeText style={styles.address}>{itemData.item.address}</BeText>
			</View>
		</MainButton>
	);
};

export default PlaceItem;

const styles = StyleSheet.create({
	placeItem: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 30,
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
	},
	img: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: '#ccc',
		borderColor: Colors.primary,
		borderWidth: 1,
	},
	cardBody: {
		marginLeft: 25,
		width: 250,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	title: {
		color: 'black',
		marginBottom: 5,
	},
	address: {
		color: '#666',
		fontSize: 16,
	},
});
