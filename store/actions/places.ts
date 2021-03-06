import { gMaps } from './../../config/http';
import { LatLng } from 'react-native-maps';
import { places } from './../../models/baseEntity/places';
import { HYDRATE_PLACE } from './../types/placesTypes';
import { RootState } from './../configureStore';
import { ThunkAction } from 'redux-thunk';
import { PlacesActions, ADD_PLACE } from '../types/placesTypes';
import * as fs from 'expo-file-system';
import Place from '../../models/place';
type AddPlaceActionCreator = (
	title: string,
	imageUri: string,
	lat: number,
	lng: number
) => ThunkAction<Promise<void>, RootState, {}, PlacesActions>;

export const addPlace: AddPlaceActionCreator = (title, imageUri, lat, lng) => {
	return async (dispatch) => {
		imageUri = !!imageUri ? imageUri : 'null';
		const fileName = imageUri.split('/').pop();
		const documentsPath = await fs.documentDirectory;
		const newPath = (!!documentsPath ? documentsPath : 'null') + fileName;
		try {
			await fs.moveAsync({ from: imageUri, to: newPath });
			const addressObj = await gMaps.get('geocode/json', {
				latlng: `${lat},${lng}`,
			});
			const payload = {
				imageUri: newPath,
				title,
				address: addressObj.results[0].formatted_address,
				lat,
				lng,
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

type HydratePlacesActionCreator = () => ThunkAction<
	Promise<void>,
	RootState,
	{},
	PlacesActions
>;

export const hydratePlaces: HydratePlacesActionCreator = () => {
	return async (dispatch) => {
		const storedPlaces = await places.get();
		if (storedPlaces && storedPlaces.rows && storedPlaces.rows.length > 0)
			try {
				const storedPlacesArr: any[] = [];
				for (let i = 0; i < storedPlaces.rows.length; i++) {
					storedPlacesArr.push(storedPlaces.rows.item(i));
				}
				dispatch({
					type: HYDRATE_PLACE,
					places: storedPlacesArr as Place[],
				});
			} catch (error) {
				throw error;
			}
	};
};
