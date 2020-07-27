import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import BeText from './BeText';
import BeImg from './BeImg';
import MainButton from './MainButton';
import * as imagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

type BeImageInputProps = {
	onImagePicked: Function;
};

const BeImageInput = (props: BeImageInputProps) => {
	const [pickedImage, setPickedImage] = useState<string>();
	const verifyPermission = async () => {
		const permit = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (permit.status !== 'granted') {
			Alert.alert(
				'Permissions error',
				'You must grant camera access to use this feature.',
				[{ text: 'Okay' }]
			);
			return false;
		}
		return true;
	};

	const takeImageHandler = async () => {
		const hasPermit = verifyPermission();
		if (!hasPermit) {
			return;
		}
		const image = await imagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
		});
		if (!image.cancelled) {
			setPickedImage(image.uri);
			props.onImagePicked(image.uri);
		}
	};

	return (
		<View style={styles.imagePicker}>
			{!pickedImage ? (
				<BeText containerStyle={styles.imagePreview}>
					No image picked
				</BeText>
			) : (
				<BeImg
					style={styles.imagePreview}
					source={{ uri: pickedImage }}
				/>
			)}
			<MainButton
				style={styles.button}
				title="Take Image"
				onPress={takeImageHandler}
			/>
		</View>
	);
};

export default BeImageInput;

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
