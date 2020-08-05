import { places } from './../../models/baseEntity/places';
import { RootState } from './../configureStore';
import { ThunkAction } from 'redux-thunk';
import { PlacesActions, ADD_PLACE } from '../types/placesTypes';
import * as fs from 'expo-file-system';
type AddPlaceActionCreator = (
	title: string,
	imageUri: string
) => ThunkAction<Promise<void>, RootState, {}, PlacesActions>;

export const addPlace: AddPlaceActionCreator = (title, imageUri) => {
	return async (dispatch) => {
		imageUri = !!imageUri ? imageUri : 'null';
		const fileName = imageUri.split('/').pop();
		const documentsPath = await fs.documentDirectory;
		const newPath = (!!documentsPath ? documentsPath : 'null') + fileName;
		try {
			await fs.moveAsync({ from: imageUri, to: newPath });
			const payload = {
				imageUri: newPath,
				title,
				address: 'sadfsad',
				lat: '564833',
				lng: '564654',
			};
			const result = await places.insertPlace(payload);

			dispatch({
				type: ADD_PLACE,
				payload: { ...payload, id: result.insertId.toString() },
			});
		} catch (error) {
			throw error;
		}
	};
};
