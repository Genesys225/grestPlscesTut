import { PlacesState, HYDRATE_PLACE } from './../types/placesTypes';
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
					new Place(
						action.payload.id,
						action.payload.title,
						action.payload.imageUri,
						action.payload.address,
						action.payload.lng,
						action.payload.lat
					),
				],
			};
		case HYDRATE_PLACE:
			return {
				places: action.places.map(
					(place) =>
						new Place(
							place.id.toString(),
							place.title,
							place.imageUri,
							place.address,
							place.lat,
							place.lng
						)
				),
			};

		default:
			return state;
	}
};
