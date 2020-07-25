import { PlacesState } from './../types/placesTypes';
import { PlacesActions, ADD_PLACE } from '../types/placesTypes';
import Place from '../../models/place';

const initialState = {
	places: [],
};

export const placesReducer = (
	state: PlacesState = initialState,
	action: PlacesActions
): PlacesState => {
	switch (action.type) {
		case ADD_PLACE:
			return {
				places: [
					...state.places,
					new Place(new Date().toString(), action.payload.title),
				],
			};

		default:
			return state;
	}
};
