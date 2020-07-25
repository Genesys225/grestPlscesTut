import { PlacesActions, ADD_PLACE } from '../types/placesTypes';

export const addPlace = (title: string): PlacesActions => {
	return {
		type: ADD_PLACE,
		payload: { title },
	};
};
