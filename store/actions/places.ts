import { PlacesActions, ADD_PLACE } from '../types/placesTypes';

export const addPlace = (title: string, imageUri: string): PlacesActions => {
	return {
		type: ADD_PLACE,
		payload: { title, imageUri },
	};
};
